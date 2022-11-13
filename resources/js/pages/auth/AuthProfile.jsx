import AuthPageLayout from "../../components/layouts/AuthPageLayout";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Form, Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import {
    useGetAuthUserQuery,
    useUpdateAuthProfileMutation,
} from "./../../features/api/apiSlice";

const AuthProfile = () => {
    const [loading, setLoading] = useState(true);
    const [isProfileModalShow, setIsProfileModalShow] = useState(false);

    const profileModalClose = () => setIsProfileModalShow(false);
    const profileModalShow = () => setIsProfileModalShow(true);

    const {
        data: authUser,
        isLoading: isGetAuthUserLoading,
        isError: isGetAuthUserError,
    } = useGetAuthUserQuery();

    const [updateAuthProfile, { isLoading }] = useUpdateAuthProfileMutation();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: authUser?.data?.name ?? "",
            email: authUser?.data?.email ?? "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("The name field is required."),
            email: Yup.string().required("The email field is required."),
        }),
        onSubmit: async (values, formikHelpers) => {
            try {
                const response = await updateAuthProfile({
                    ...values,
                    token: authUser?.data?.token,
                }).unwrap();

                formikHelpers.resetForm();
                formikHelpers.setSubmitting(false);
                toast.success(response.data.statusMessage);
                profileModalClose();
            } catch (error) {
                formikHelpers.setErrors(error.response?.data?.errors);
                formikHelpers.setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    isGetAuthUserError && toast.error("Something went wrong!");

    return (
        <>
            <Loading
                loadingIs={
                    loading || formik.isSubmitting || isGetAuthUserLoading
                }
            />
            <AuthPageLayout
                leftSection={<h1>My Profile</h1>}
                rightSection={
                    <Button
                        variant="primary"
                        type="button"
                        onClick={profileModalShow}
                    >
                        Edit Profile
                    </Button>
                }
            >
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-primary card-outline">
                            <div className="card-body box-profile">
                                <h3 className="profile-username text-center">
                                    {authUser?.data?.name}
                                </h3>
                                <hr />
                                <strong>
                                    <i className="fas fa-envelope-open-text mr-1" />{" "}
                                    Email Address
                                </strong>
                                <p className="text-muted">
                                    {authUser?.data?.email}
                                </p>
                            </div>
                            {/* /.card-body */}
                        </div>
                    </div>
                </div>

                <Modal
                    show={isProfileModalShow}
                    onHide={profileModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>Edit Profile</Modal.Title>
                        <button
                            type="button"
                            className="close"
                            onClick={profileModalClose}
                        >
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                        <fieldset disabled={formik.isSubmitting}>
                            <Modal.Body>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                    />
                                    {formik.touched.name &&
                                    formik.errors.name ? (
                                        <div className="text-danger">
                                            {formik.errors.name}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                    />
                                    {formik.touched.email &&
                                    formik.errors.email ? (
                                        <div className="text-danger">
                                            {formik.errors.email}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="danger"
                                    type="button"
                                    onClick={profileModalClose}
                                >
                                    Cancel
                                </Button>
                                <Button variant="info" type="submit">
                                    <i className="fa fa-save mr-1"></i>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </fieldset>
                    </Form>
                </Modal>
            </AuthPageLayout>
        </>
    );
};

export default AuthProfile;
