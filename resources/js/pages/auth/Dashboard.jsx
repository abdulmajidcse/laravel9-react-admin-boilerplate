import AuthPageLayout from "../../components/layouts/AuthPageLayout";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Loading loadingIs={loading} />
            <AuthPageLayout leftSection={<h1>Dashboard</h1>}>
                <p> Welcome Administrator! </p>
            </AuthPageLayout>
        </>
    );
};

export default Dashboard;
