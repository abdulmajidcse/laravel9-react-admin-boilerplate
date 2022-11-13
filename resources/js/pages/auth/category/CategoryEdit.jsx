import AuthPageLayout from "../../../components/layouts/AuthPageLayout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import Loading from "../../../components/Loading";
import { useRef, useEffect, useState } from "react";
import ErrorPage from "../../ErrorPage";

const CategoryEdit = () => {
    const [loading, setLoading] = useState(true);
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({});
    const [notFound, setNotFound] = useState(false);
    const imageRef = useRef(null);
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

    useEffect(() => {
        setLoading(true);

        axios
            .get(`/webapi/auth/categories/${categoryId}`)
            .then((response) => {
                setCategory(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setCategory({});
                setNotFound(true);
                setLoading(false);
            });
        return () => {
            setCategory({});
        };
    }, []);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: category.name ?? "",
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("The name field is required."),
            image: Yup.mixed()
                .nullable()
                .test(
                    "fileSize",
                    "Image is too large. Max size 5MB.",
                    (value) =>
                        value?.size ? value?.size <= 5 * 1024 * 1024 : true
                )
                .test(
                    "fileType",
                    "Not a valid image. Supported only jpg, jpeg and png format.",
                    (value) =>
                        value?.type
                            ? SUPPORTED_FORMATS.includes(value?.type)
                            : true
                ),
        }),
        onSubmit: async (values, formikHelpers) => {
            try {
                const response = await axios.post(
                    `/webapi/auth/categories/${categoryId}`,
                    { ...values, _method: "put" },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                formikHelpers.resetForm();
                imageRef.current.value = "";
                formikHelpers.setSubmitting(false);
                toast.success(response.data.statusMessage);
                // redirect to categories route
                navigate("/auth/categories");
            } catch (error) {
                formikHelpers.setErrors(error.response?.data?.errors);
                formikHelpers.setSubmitting(false);
            }
        },
    });

    if (notFound) {
        return <ErrorPage />;
    }

    return (
        <>
            <Loading loadingIs={loading || formik.isSubmitting} />
            <AuthPageLayout
                leftSection={<h1>Edit Category</h1>}
                rightSection={
                    <Link to="/auth/categories" className="btn btn-primary">
                        Category List
                    </Link>
                }
            >
                <Form onSubmit={formik.handleSubmit}>
                    <fieldset disabled={formik.isSubmitting}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-danger">
                                    {formik.errors.name}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                className="mb-2"
                                ref={imageRef}
                                onChange={(event) =>
                                    formik.setFieldValue(
                                        "image",
                                        event.target.files[0]
                                    )
                                }
                                onBlur={formik.handleBlur}
                            />

                            {SUPPORTED_FORMATS.includes(
                                formik.values.image?.type ?? "None"
                            ) && (
                                <img
                                    src={URL.createObjectURL(
                                        formik.values.image
                                    )}
                                    alt="Preview"
                                    height={100}
                                />
                            )}
                            {!formik.values.image && category.image && (
                                <img
                                    src={`${
                                        import.meta.env.VITE_APP_URL
                                    }/uploads/${category.image}`}
                                    alt="Preview"
                                    height={100}
                                />
                            )}
                            {formik.touched.image && formik.errors.image ? (
                                <div className="text-danger">
                                    {formik.errors.image}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                        >
                            Save
                        </Button>
                    </fieldset>
                </Form>
            </AuthPageLayout>
        </>
    );
};

export default CategoryEdit;
