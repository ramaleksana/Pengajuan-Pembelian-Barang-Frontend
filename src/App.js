import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PengajuanPage from "./pages/PengajuanPage";
import AddPengajuanPage from "./pages/AddPengajuanPage";
import EditPengajuanPage from "./pages/EditPengajuanPage";

const AppContent = () => {
    return (
        <Fragment>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="pengajuan" element={<PengajuanPage />} />
                    <Route
                        path="pengajuan/add"
                        element={<AddPengajuanPage />}
                    />
                    <Route
                        path="pengajuan/edit/:id"
                        element={<EditPengajuanPage />}
                    />
                </Route>
            </Routes>
        </Fragment>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
};

export default App;
