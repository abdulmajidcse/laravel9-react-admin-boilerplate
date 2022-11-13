import Loading from "../Loading";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    useGetAuthUserQuery,
    useAuthLogoutMutation,
} from "../../features/api/apiSlice";

export default () => {
    const [loading, setLoading] = useState(false);
    const { data: authUser } = useGetAuthUserQuery();
    const [authLogout] = useAuthLogoutMutation();

    const logout = async () => {
        setLoading(true);
        try {
            await authLogout(authUser?.data?.token);
            await axios.post("/auth/logout");
            location.href = "/auth/login";
        } catch (error) {
            location.href = "/auth/login";
        }
    };

    return (
        <>
            <Loading loadingIs={loading} />
            {/* Navbar */}
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            data-widget="pushmenu"
                            href="#"
                            role="button"
                        >
                            <i className="fas fa-bars" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            Visit Site
                        </a>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* User Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="fas fa-user mr-1" /> Profile
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link to="/auth/profile" className="dropdown-item">
                                <div className="media">
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            <i className="fas fa-user mr-1" />{" "}
                                            Profile
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <div className="dropdown-divider" />
                            <Link
                                to="/auth/update-password"
                                className="dropdown-item"
                            >
                                <div className="media">
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            <i className="fas fa-lock mr-1" />{" "}
                                            Change Password{" "}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                            <div className="dropdown-divider" />
                            <a
                                href="#"
                                className="dropdown-item"
                                onClick={logout}
                            >
                                {/* Logout */}
                                <div className="media">
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            <i className="fas fa-sign-out-alt mr-1" />{" "}
                                            Logout
                                        </h3>
                                    </div>
                                </div>
                                {/* Logout End */}
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            {/* /.navbar */}
        </>
    );
};
