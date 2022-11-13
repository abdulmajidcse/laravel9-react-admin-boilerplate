import AuthPageLayout from "../../components/layouts/AuthPageLayout";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";

const UpdatePassword = () => {
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            old_password: "",
            new_password: "",
            new_password_confirmation: "",
        },
        validationSchema: Yup.object({
            old_password: Yup.string().required(
                "The old password field is required."
            ),
            new_password: Yup.string().required(
                "The new password field is required."
            ),
            new_password_confirmation: Yup.string().required(
                "The confirm password field is required."
            ),
        }),
        onSubmit: async (values, formikHelpers) => {
            try {
                const response = await axios.post(
                    "/webapi/auth/update-password",
                    { ...values, _method: "put" }
                );
                formikHelpers.resetForm();
                formikHelpers.setSubmitting(false);
                toast.success(response.data.statusMessage);
            } catch (error) {
                formikHelpers.setErrors(error.response?.data?.errors);
                formikHelpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Loading loadingIs={loading || formik.isSubmitting} />
            <AuthPageLayout leftSection={<h1>Change Password</h1>}>
                <Form onSubmit={formik.handleSubmit}>
                    <fieldset disabled={formik.isSubmitting}>
                        <Form.Group className="mb-3" controlId="old_password">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="old_password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.old_password}
                            />
                            {formik.touched.old_password &&
                            formik.errors.old_password ? (
                                <div className="text-danger">
                                    {formik.errors.old_password}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="new_password">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="new_password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.new_password}
                            />
                            {formik.touched.new_password &&
                            formik.errors.new_password ? (
                                <div className="text-danger">
                                    {formik.errors.new_password}
                                </div>
                            ) : (
                                ""
                            )}
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="new_password_confirmation"
                        >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="new_password_confirmation"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.new_password_confirmation}
                            />
                            {formik.touched.new_password_confirmation &&
                            formik.errors.new_password_confirmation ? (
                                <div className="text-danger">
                                    {formik.errors.new_password_confirmation}
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

export default UpdatePassword;
