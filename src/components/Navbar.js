import React, { Fragment } from "react";
import { useAuth } from "../context/AuthContext";
import { Navbar as RSNavbar, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavLinkCustom from "./NavLinkCustom";
import { ROLE_MANAGER } from "../constant";

const Navbar = () => {
    const { isLoggedIn, logout, role } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <RSNavbar color="light" light expand="md">
            <Link className="navbar-brand" to={"/"}>
                Dashboard
            </Link>
            <Nav className="mr-auto" navbar>
                {isLoggedIn && (
                    <Fragment>
                        <NavItem>
                            <NavLinkCustom to={"/"}>Home</NavLinkCustom>
                        </NavItem>
                        <NavItem>
                            <NavLinkCustom to="/pengajuan">
                                Pengajuan
                            </NavLinkCustom>
                        </NavItem>
                        {role === ROLE_MANAGER && (
                            <NavItem>
                                <NavLinkCustom to="/pengajuan/history">
                                    Pengajuan Disetujui
                                </NavLinkCustom>
                            </NavItem>
                        )}
                    </Fragment>
                )}
            </Nav>
            {isLoggedIn ? (
                <Button color="danger" size="sm" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <Link className="btn btn-primary btn-sm" to="/login">
                    Login
                </Link>
            )}
        </RSNavbar>
    );
};

export default Navbar;
