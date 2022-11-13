import { Outlet } from "react-router-dom";
import { useGetAuthUserQuery } from "../../features/api/apiSlice";
import Loading from "../Loading";
import { useState, useEffect } from "react";
import Navbar from "../auth/Navbar";
import Aside from "../auth/Aside";
import Footer from "../auth/Footer";

export default () => {
    const [isAuth, setIsAuth] = useState(false);
    const { isLoading, isSuccess, isError } = useGetAuthUserQuery();

    useEffect(() => {
        if (isLoading) {
            setIsAuth(false);
        } else if (!isLoading && !isSuccess && isError) {
            location.href = "/auth/login";
        } else {
            setIsAuth(true);
        }
    }, [isLoading, isSuccess, isError]);

    return (
        <>
            <Navbar />
            <Aside />
            {isAuth ? (
                <>
                    <Outlet />
                    <Footer />
                </>
            ) : (
                <Loading bgColor="white" />
            )}
        </>
    );
};
