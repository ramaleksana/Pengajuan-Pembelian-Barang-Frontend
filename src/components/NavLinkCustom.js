import { NavLink } from "react-router-dom";

const NavLinkCustom = ({ to, children, ...rest }) => (
    <NavLink
        to={to}
        {...rest}
        className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
        }
    >
        {children}
    </NavLink>
);

export default NavLinkCustom;
