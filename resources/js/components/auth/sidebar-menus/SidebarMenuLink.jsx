import { NavLink } from "react-router-dom";

const SidebarMenuLink = ({ to, text, icon = "far fa-circle" }) => {
    return (
        <>
            <li className="nav-item">
                <NavLink className="nav-link sidebar-link" to={to} end>
                    <i className={`nav-icon ${icon}`} />
                    <p> {text} </p>
                </NavLink>
            </li>
        </>
    );
};

export default SidebarMenuLink;
