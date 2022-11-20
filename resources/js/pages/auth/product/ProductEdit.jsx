import AuthPageLayout from "../../../components/layouts/AuthPageLayout";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import Loading from "../../../components/Loading";
import { useRef, useEffect, useState } from "react";
import ErrorPage from "../../ErrorPage";
import Select from "react-select";
import {
    useGetAuthUserQuery,
    useAuthGetProductQuery,
    useAuthUpdateProductMutation,
    useGetAllCategoriesQuery,
} from "../../../features/api/apiSlice";
import imageFormats from "../../../utils/imageFormats";
import createFormdata from "../../../utils/createFormdata";

const ProductEdit = () => {
    const [loading, setLoading] = useState(true);
    const { productId } = useParams();
    const [notFound, setNotFound] = useState(false);
    const [noAccess, setNoAccess] = useState(false);
    const imageRef = useRef(null);
    const [categoryOptions, setCategoryOptions] = useState([]);

    const { data: authUser } = useGetAuthUserQuery();

    const { data: allCategories, isLoading: isLoadingToGetAllCategories } =
        useGetAllCategoriesQuery();

    const {
        data: product,
        isSuccess: isSuccessToGetProduct,
        isError: isErrorToGetProduct,
        error: errorToGetProduct,
    } = useAuthGetProductQuery({
        token: authUser?.data?.token,
        id: productId,
    });

    const [authUpdateProduct] = useAuthUpdateProductMutation();

    useEffect(() => {
        setLoading(true);

        if (allCategories) {
            setCategoryOptions(
                allCategories.data?.map((category) => {
                    return { value: category.id, label: category.name };
                })
            );
            setLoading(false);
        }

        if (isSuccessToGetProduct) {
            setLoading(false);
        } else if (isErrorToGetProduct) {
            errorToGetProduct.status == 404
                ? setNotFound(true)
                : setNoAccess(true);
            setLoading(false);
        }
    }, [allCategories, isSuccessToGetProduct, isErrorToGetProduct]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: product?.data.name ?? "",
            image: null,
            short_description: product?.data.short_description ?? "",
            full_description: product?.data.full_description ?? "",
            price: product?.data.price ?? "",
            category_ids:
                product?.data.categories.map((category) => category.id) ?? [],
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("The name field is required.")
                .max(180, "Name must be at most 180 characters"),
            image: Yup.mixed()
                .nullable()
                .test(
                    "fileType",
                    "Not a valid image. Supported only jpg, jpeg and png format.",
                    (value) =>
                        value?.type ? !value.type.search("image") : true
                )
                .test(
                    "fileSize",
                    "Image is too large. Max size 5MB.",
                    (value) =>
                        value?.size ? value?.size <= 5 * 1024 * 1024 : true
                ),
            short_description: Yup.string()
                .required("The short description field is required.")
                .max(190, "Short description must be at most 190 characters"),
            full_description: Yup.string().required(
                "The full description field is required."
            ),
            price: Yup.number()
                .required("The price field is required.")
                .positive(),
            category_ids: Yup.array()
                .required("The category field is required.")
                .min(1, "The category field is required")
                .of(Yup.number().label("Category"))
                .label("Category"),
        }),
        onSubmit: async (values, formikHelpers) => {
            try {
                const response = await authUpdateProduct({
                    id: productId,
                    data: createFormdata(values, "put"),
                    token: authUser?.data?.token,
                }).unwrap();
                formikHelpers.resetForm();
                imageRef.current.value = "";
                formikHelpers.setSubmitting(false);
                toast.success(response.statusMessage);
            } catch (error) {
                formikHelpers.setErrors(error.data?.errors ?? {});
                formikHelpers.setSubmitting(false);
            }
        },
    });

    if (notFound) {
        return <ErrorPage />;
    } else if (noAccess) {
        return (
            <ErrorPage errorCode="403" errorMessage="You don't have access!" />
        );
    }

    return (
        <>
            <Loading
                loadingIs={
                    loading ||
                    formik.isSubmitting ||
                    isLoadingToGetAllCategories
                }
            />
            <AuthPageLayout
                leftSection={<h1>Edit Product</h1>}
                rightSection={
                    <Link to="/auth/products" className="btn btn-primary">
                        Product List
                    </Link>
                }
            >
                <Form onSubmit={formik.handleSubmit}>
                    <fieldset disabled={formik.isSubmitting}>
                        <Form.Group className="mb-3" controlId="category_ids">
                            <Form.Label>Category</Form.Label>
                            <Select
                                isMulti
                                options={categoryOptions}
                                name="category_ids"
                                onChange={(options) => {
                                    formik.setFieldValue(
                                        "category_ids",
                                        options.map((option) => option.value)
                                    );
                                }}
                                onBlur={() => {
                                    formik.setFieldTouched(
                                        "category_ids",
                                        true
                                    );
                                }}
                                value={categoryOptions.map(
                                    (option) =>
                                        formik.values.category_ids.includes(
                                            option.value
                                        ) && option
                                )}
                            />

                            {formik.touched.category_ids &&
                            formik.errors.category_ids ? (
                                <div className="text-danger">
                                    {formik.errors.category_ids}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>

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
                            {imageFormats().includes(
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
                            {!formik.values.image && product?.data.image && (
                                <img
                                    src={`${
                                        import.meta.env.VITE_APP_URL
                                    }/uploads/${product?.data.image}`}
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

                        <Form.Group
                            className="mb-3"
                            controlId="short_description"
                        >
                            <Form.Label>Short Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="short_description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.short_description}
                            />
                            {formik.touched.short_description &&
                            formik.errors.short_description ? (
                                <div className="text-danger">
                                    {formik.errors.short_description}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="full_description"
                        >
                            <Form.Label>Full Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="full_description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.full_description}
                            />
                            {formik.touched.full_description &&
                            formik.errors.full_description ? (
                                <div className="text-danger">
                                    {formik.errors.full_description}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price (BDT)</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                            {formik.touched.price && formik.errors.price ? (
                                <div className="text-danger">
                                    {formik.errors.price}
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

export default ProductEdit;
