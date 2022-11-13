import { Link, NavLink, useLocation } from "react-router-dom";
import useUserHasRoles from "../../hooks/authorization/useUserHasRoles";
import SidebarMenuDropdown from "./sidebar-menus/SidebarMenuDropdown";
import SidebarMenuLink from "./sidebar-menus/SidebarMenuLink";

const Aside = () => {
    const { pathname } = useLocation();
    const isSellerRole = useUserHasRoles("Seller");

    const categoryMenuActive = !pathname.search("/auth/categories");
    const productMenuActive = !pathname.search("/auth/products");

    return (
        <>
            {/* Main Sidebar Container */}
            <aside
                className="main-sidebar sidebar-dark-primary elevation-4"
                style={{ background: "#1f386b" }}
            >
                {/* Brand Logo */}
                <Link
                    to="/auth"
                    className="brand-link text-center sidebar-link"
                >
                    <span className="brand-text font-weight-light">
                        {import.meta.env.VITE_APP_NAME}
                    </span>
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul
                            className="nav nav-pills nav-sidebar flex-column"
                            data-widget="treeview"
                            role="menu"
                            data-accordion="false"
                        >
                            <SidebarMenuLink
                                to="/auth"
                                text="Dashboard"
                                icon="fas fa-tachometer-alt"
                            />

                            <SidebarMenuDropdown
                                icon="fas fa-list-alt"
                                text="Category"
                                isActive={categoryMenuActive}
                            >
                                <SidebarMenuLink
                                    to="/auth/categories/create"
                                    text="New Category"
                                />

                                <SidebarMenuLink
                                    to="/auth/categories"
                                    text="Category List"
                                />
                            </SidebarMenuDropdown>

                            {isSellerRole.isAccess && (
                                <li
                                    className={`nav-item ${
                                        productMenuActive &&
                                        "menu-is-opening menu-open"
                                    }`}
                                >
                                    <a
                                        className={`nav-link ${
                                            productMenuActive && "active"
                                        }`}
                                        href="#"
                                    >
                                        <i className="nav-icon fas fa-list-alt" />
                                        <p>
                                            Product
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul
                                        className="nav nav-treeview"
                                        style={{
                                            display: productMenuActive
                                                ? "block"
                                                : "none",
                                        }}
                                    >
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link sidebar-link"
                                                to="/auth/products/create"
                                                end
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p> New Product </p>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link sidebar-link"
                                                to="/auth/products"
                                                end
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p> Product List </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </>
    );
};

export default Aside;
