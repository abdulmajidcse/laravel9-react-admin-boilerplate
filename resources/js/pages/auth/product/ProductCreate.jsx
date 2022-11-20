import AuthPageLayout from "../../../components/layouts/AuthPageLayout";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import Loading from "../../../components/Loading";
import { useRef, useEffect, useState } from "react";
import Select from "react-select";
import {
    useGetAllCategoriesQuery,
    useAuthStoreProductMutation,
    useGetAuthUserQuery,
} from "../../../features/api/apiSlice";
import createFormData from "../../../utils/createFormdata";

const ProductCreate = () => {
    const [loading, setLoading] = useState(true);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const imageRef = useRef(null);

    const { data: authUser } = useGetAuthUserQuery();
    const { data: allCategories, isLoading: isLoadingToGetAllCategories } =
        useGetAllCategoriesQuery();

    const [authStoreProduct] = useAuthStoreProductMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            image: null,
            short_description: "",
            full_description: "",
            price: "",
            category_ids: [],
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("The name field is required.")
                .max(180, "Name must be at most 180 characters"),
            image: Yup.mixed()
                .required("The image field is required.")
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
                const response = await authStoreProduct({
                    data: createFormData(values),
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
    }, [allCategories]);

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
                leftSection={<h1>New Product</h1>}
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
                            {formik.values.image &&
                                !formik.values.image.type.search("image") && (
                                    <img
                                        src={URL.createObjectURL(
                                            formik.values.image
                                        )}
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

export default ProductCreate;
