import React from "react";
import { Col, Container, Row } from "reactstrap";
import DataTableServer from "../../DataTableServer";
import { BASE_URL } from "../../../constant";
import { Link } from "react-router-dom";

const columns = [
    {
        name: "No",
        selector: (_, index) => index + 1,
        width: "10%",
        center: 1,
    },
    {
        name: "Tanggal Pengajuan",
        selector: (row) => row.date_of_filing,
    },
    {
        name: "Jumlah Barang",
        selector: (row) => JSON.parse(row.items).length,
        center: 1,
    },
    {
        name: "#",
        cell: (row) => (
            <Link
                to={`/pengajuan/decision/${row.id}`}
                className="btn btn-success btn-sm me-1 text-nowrap"
            >
                Putuskan
            </Link>
        ),
        center: 1,
    },
];

const ListPengajuanFinance = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <DataTableServer
                        title="List Pengajuan Barang"
                        columns={columns}
                        endPoint={BASE_URL + "/pengajuan-finance"}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ListPengajuanFinance;
