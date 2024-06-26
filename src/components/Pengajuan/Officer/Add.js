import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import FormMultiple from "./FormMultiple";
import Swal from "sweetalert2";
import { addPengajuan } from "../../../services/pengajuanService";
import { useNavigate } from "react-router-dom";

const AddFormPengajuan = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (items = []) => {
        setLoading(true);
        const response = await addPengajuan(items);
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

    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <FormMultiple
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default AddFormPengajuan;
