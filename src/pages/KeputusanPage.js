import React from "react";
import { useAuth } from "../context/AuthContext";
import { ROLE_MANAGER } from "../constant";
import FormKeputusanManager from "../components/Pengajuan/Manager/Form";

const KeputusanPage = () => {
    const { role } = useAuth();
    if (role === ROLE_MANAGER) {
        return <FormKeputusanManager />;
    } else {
        return <div></div>;
    }
};

export default KeputusanPage;
