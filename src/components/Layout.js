import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { Link, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import PengajuanPage from "../pages/PengajuanPage";
import AddPengajuanPage from "../pages/AddPengajuanPage";
import EditPengajuanPage from "../pages/EditPengajuanPage";
import { useAuth } from "../context/AuthContext";
import { ROLE_FINANCE, ROLE_MANAGER, ROLE_OFFICER } from "../constant";
import { Col, Container, Row } from "reactstrap";
import DetailPengajuanPage from "../pages/DetailPengajuanPage";
import KeputusanPage from "../pages/KeputusanPage";
import HistoryPengajuanPage from "../pages/HistoryPengajuanPage";
const Layout = () => {
    const { role } = useAuth();

    return (
        <Fragment>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="pengajuan" element={<PengajuanPage />} />
                    <Route
                        path="pengajuan/detail/:id"
                        element={<DetailPengajuanPage />}
                    />
                    {role === ROLE_OFFICER && (
                        <Fragment>
                            <Route
                                path="pengajuan/add"
                                element={<AddPengajuanPage />}
                            />
                            <Route
                                path="pengajuan/edit/:id"
                                element={<EditPengajuanPage />}
                            />
                        </Fragment>
                    )}
                    {role === ROLE_MANAGER && (
                        <Fragment>
                            <Route
                                path="pengajuan/decision/:id"
                                element={<KeputusanPage />}
                            />
                            <Route
                                path="pengajuan/history"
                                element={<HistoryPengajuanPage />}
                            />
                        </Fragment>
                    )}
                    {role === ROLE_FINANCE && (
                        <Fragment>
                            <Route
                                path="pengajuan/decision/:id"
                                element={<KeputusanPage />}
                            />
                        </Fragment>
                    )}
                </Route>
                <Route path="*" element={<Layout404 />} />
            </Routes>
        </Fragment>
    );
};

const Layout404 = () => {
    return (
        <Container>
            <Row className="justify-content-center mt-1">
                <Col>
                    <h3 className="text-center">
                        Halaman tidak ditemukan, kembali ke{" "}
                        <Link to={"/"}>Home</Link>
                    </h3>
                </Col>
            </Row>
        </Container>
    );
};

export default Layout;
