import { useGetAuthUserQuery } from "../../features/api/apiSlice";

export default (...roles) => {
    const { data: authUser, isSuccess, isError } = useGetAuthUserQuery();

    let status = { isSuccess: false, isAccess: false };

    if (isSuccess) {
        let matchRoles = [];
        matchRoles = authUser?.data?.roles?.filter((role) =>
            roles.includes(role.name)
        );

        if (matchRoles?.length > 0) {
            status = { isSuccess: true, isAccess: true };
        } else {
            status = { isSuccess: true, isAccess: false };
        }
    } else if (isError) {
        status = { isSuccess: true, isAccess: false };
    }

    return status;
};
