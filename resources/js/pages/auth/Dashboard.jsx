import AuthPageLayout from "../../components/layouts/AuthPageLayout";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { useGetAuthUserQuery } from "../../features/api/apiSlice";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const { data: authUser } = useGetAuthUserQuery();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Loading loadingIs={loading} />
            <AuthPageLayout leftSection={<h1>Dashboard</h1>}>
                <p> Welcome {authUser?.data?.name}! </p>
            </AuthPageLayout>
        </>
    );
};

export default Dashboard;
