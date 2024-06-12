import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import FormMultiple from "./FormMultiple";
import Swal from "sweetalert2";
import {
    editPengajuan,
    showPengajuanOfficer,
} from "../../../services/pengajuanService";
import { useNavigate, useParams } from "react-router-dom";

const EditFormPengajuan = () => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (items = []) => {
        setLoading(true);
        const response = await editPengajuan(items, id);
        if (response.status) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: response.message,
            });
            navigate("/pengajuan");
        } else {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: response.message,
            });
        }
        setLoading(false);
    };

    const fetchData = useCallback(async () => {
        const response = await showPengajuanOfficer(id);
        let dataItems = response.data ? JSON.parse(response.data.items) : [];
        setItems(dataItems);
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <FormMultiple
                        loading={loading}
                        handleSubmit={handleSubmit}
                        data={items}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default EditFormPengajuan;
