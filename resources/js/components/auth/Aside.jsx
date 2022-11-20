import { Link, useLocation } from "react-router-dom";
import useUserHasRoles from "../../hooks/authorization/useUserHasRoles";
import SidebarMenuDropdown from "./sidebar-menus/SidebarMenuDropdown";
import SidebarMenuLink from "./sidebar-menus/SidebarMenuLink";
import $ from "jquery";

const Aside = () => {
    // when sidebar menu click, automatically hide sidebar for overlay display
    $(".sidebar-link").click(function () {
        $("#sidebar-overlay:visible").click();
    });

    const { pathname } = useLocation();
    const isSellerRole = useUserHasRoles("Seller");
    const isSuperAdminRole = useUserHasRoles("Super Admin");

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

                            {isSuperAdminRole.isAccess && (
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
                            )}

                            {isSellerRole.isAccess && (
                                <SidebarMenuDropdown
                                    icon="fas fa-shopping-basket"
                                    text="Product"
                                    isActive={productMenuActive}
                                >
                                    <SidebarMenuLink
                                        to="/auth/products/create"
                                        text="New Product"
                                    />

                                    <SidebarMenuLink
                                        to="/auth/products"
                                        text="Product List"
                                    />
                                </SidebarMenuDropdown>
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
