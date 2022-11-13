import { Outlet } from "react-router-dom";
import useUserHasRoles from "../../hooks/authorization/useUserHasRoles";
import ErrorPage from "../../pages/ErrorPage";
import Loading from "../Loading";

const GroupLayout = ({ roles = [] }) => {
    if (roles.length > 0) {
        const aclByRoles = useUserHasRoles(...roles);

        if (!aclByRoles.isSuccess) {
            return <Loading />;
        } else if (aclByRoles.isSuccess && !aclByRoles.isAccess) {
            return <ErrorPage errorCode="403" errorMessage="Forbidden" />;
        }
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default GroupLayout;
