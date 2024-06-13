import React from "react";
import { useAuth } from "../context/AuthContext";
import { ROLE_FINANCE, ROLE_MANAGER } from "../constant";
import FormKeputusanManager from "../components/Pengajuan/Manager/Form";
import FormKeputusanFinance from "../components/Pengajuan/Finance/Form";

const KeputusanPage = () => {
    const { role } = useAuth();
    if (role === ROLE_MANAGER) {
        return <FormKeputusanManager />;
    } else if (role === ROLE_FINANCE) {
        return <FormKeputusanFinance />;
    } else {
        return <div></div>;
    }
};

export default KeputusanPage;
