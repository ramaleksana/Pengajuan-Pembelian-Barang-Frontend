import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navbar as RSNavbar, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import NavLinkCustom from "./NavLinkCustom";

const Navbar = () => {
    const { isLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <RSNavbar color="light" light expand="md">
            <Link className="navbar-brand" to={"/"}>
                Pengajuan Pembelian Barang
            </Link>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLinkCustom to={"/"}>Home</NavLinkCustom>
                </NavItem>
                <NavItem>
                    <NavLinkCustom to="/pengajuan">Pengajuan</NavLinkCustom>
                </NavItem>
            </Nav>
            {isLoggedIn ? (
                <Button color="danger" onClick={handleLogout}>
                    Logout
                </Button>
            ) : (
                <Button color="primary" href="/login">
                    Login
                </Button>
            )}
        </RSNavbar>
    );
};

export default Navbar;