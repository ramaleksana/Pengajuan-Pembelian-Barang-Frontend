import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Col,
    Container,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
} from "reactstrap";
import {
    keputusanPengajuanManager,
    showPengajuanManager,
} from "../../../services/pengajuanService";
import { STATUS_APPROVED, STATUS_REJECTED } from "../../../constant";
import Swal from "sweetalert2";

const FormKeputusanManager = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(null);
    const [params, setParams] = useState({
        status: "",
        note: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newParams = { ...params };
        newParams[name] = value;

        const newErrors = { ...errors };
        setParams(newParams);
        if (name === "status" && !value) {
            newErrors[name] = "Keputusan is required";
            if (value !== STATUS_REJECTED && newErrors.note) {
                delete newErrors["note"];
            }
        } else if (
            newParams["status"] === STATUS_REJECTED &&
            name === "note" &&
            !value
        ) {
            newErrors[name] = "Catatan is required";
        } else {
            delete newErrors[name];
        }
        setErrors(newErrors);
    };

    const handleSubmit = async () => {
        let formValid = true;
        let newErrors = {};

        if (!params.status) {
            formValid = false;
            newErrors["status"] = "Keputusan is required";
        } else if (params.status === STATUS_REJECTED && !params.note) {
            formValid = false;
            newErrors["note"] = "Catatan is required";
        }

        setErrors(newErrors);

        if (formValid) {
            setLoading(true);
            const response = await keputusanPengajuanManager(
                id,
                params.status,
                params.note
            );
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
        }
    };

    const fetchData = useCallback(async () => {
        const response = await showPengajuanManager(id);
        let dataItems = response.data ? response.data : null;
        if (dataItems) {
            dataItems["items"] = JSON.parse(dataItems.items);
        }
        setItem(dataItems);
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Container>
            <h3 className="text-center my-4">Detail Pengajuan</h3>
            <Row>
                <Col xs="7">
                    <Table>
                        <tbody>
                            <tr>
                                <th>Tanggal Pengajuan</th>
                                <td>:</td>
                                <td>{item?.date_of_filing}</td>
                            </tr>
                            <tr>
                                <th>Jumlah Barang</th>
                                <td>:</td>
                                <td>{item?.items.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <hr className="my-4" />
                    <h4 className="text-center">List Barang</h4>
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th className="text-center">No</th>
                                <th>Nama Barang</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item?.items.map((i, k) => {
                                return (
                                    <tr key={k}>
                                        <td className="text-center">{k + 1}</td>
                                        <td>{i.item_name}</td>
                                        <td>{i.quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Link to="/pengajuan" className="btn btn-warning">
                        Kembali
                    </Link>
                </Col>
                <Col xs="5">
                    <h3 className="text-center">Form Keputusan</h3>
                    <FormGroup>
                        <Label for="status">Keputusan</Label>
                        <Input
                            id="status"
                            type="select"
                            name="status"
                            value={params.status}
                            onChange={(e) => handleChange(e)}
                            invalid={errors?.status ? true : false}
                            disabled={loading}
                        >
                            <option value={""}>-- Pilih Keputusan --</option>
                            <option value={STATUS_APPROVED}>Setujui</option>
                            <option value={STATUS_REJECTED}>Tolak</option>
                        </Input>
                        <FormFeedback>{errors?.status}</FormFeedback>
                    </FormGroup>
                    {params.status === STATUS_REJECTED && (
                        <FormGroup>
                            <Label for="note">Catatan</Label>
                            <Input
                                id="note"
                                name="note"
                                value={params.note}
                                onChange={(e) => handleChange(e)}
                                type="textarea"
                                invalid={errors?.note ? true : false}
                                disabled={loading}
                            />
                            <FormFeedback>{errors?.note}</FormFeedback>
                        </FormGroup>
                    )}
                    <Button
                        onClick={() => handleSubmit()}
                        disabled={loading}
                        color="primary"
                    >
                        Submit
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default FormKeputusanManager;
