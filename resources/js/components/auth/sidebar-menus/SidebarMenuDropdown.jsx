const SidebarMenuDropdown = ({ icon, text, isActive, children }) => {
    return (
        <>
            <li
                className={`nav-item ${
                    isActive && "menu-is-opening menu-open"
                }`}
            >
                <a className={`nav-link ${isActive && "active"}`} href="#">
                    <i className={`nav-icon ${icon}`} />
                    <p>
                        {text}
                        <i className="fas fa-angle-left right" />
                    </p>
                </a>
                <ul
                    className="nav nav-treeview"
                    style={{
                        display: isActive ? "block" : "none",
                    }}
                >
                    {children}
                </ul>
            </li>
        </>
    );
};

export default SidebarMenuDropdown;
