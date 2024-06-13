import React from "react";
import { Col, Container, Row } from "reactstrap";
import DataTableServer from "../../DataTableServer";
import { BASE_URL } from "../../../constant";

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
        name: "Tanggal Disetujui",
        selector: (row) => row.update_status_on_manager,
    },
];

const HistoryPengajuanManager = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <DataTableServer
                        title="List Pengajuan disetujui"
                        columns={columns}
                        endPoint={BASE_URL + "/pengajuan-manager/history"}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default HistoryPengajuanManager;
