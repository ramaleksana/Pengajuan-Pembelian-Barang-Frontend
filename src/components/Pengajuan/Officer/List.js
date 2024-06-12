import React, { Fragment } from "react";
import { Badge, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import {
    BASE_URL,
    STATUS_APPROVED,
    STATUS_PENDING,
    STATUS_REJECTED,
} from "../../../constant";
import DataTableServer from "../../DataTableServer";

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
        name: "Status Keputusan",
        selector: (row) => <StatusPengajuan row={row} />,
        grow: 2,
    },
    {
        name: "Catatan",
        selector: null,
    },
    {
        name: "#",
        cell: (row) => <ActionButton row={row} />,
        center: 1,
    },
];

const StatusPengajuan = ({ row }) => {
    // const status = "";
    return (
        <Fragment>
            <div>
                <span style={{ fontWeight: "bold" }}>Manager :</span>{" "}
                <BadgeStatusPengajuan status={row.status_on_manager} />
            </div>
            <div>
                <span style={{ fontWeight: "bold" }}>Finance :</span>{" "}
                <BadgeStatusPengajuan status={row.status_on_finance} />
            </div>
        </Fragment>
    );
};

const BadgeStatusPengajuan = ({ status }) => {
    if (status === STATUS_PENDING) {
        return <Badge color="primary">Menunggu</Badge>;
    } else if (status === STATUS_APPROVED) {
        return <Badge color="success">Disetujui</Badge>;
    } else if (status === STATUS_REJECTED) {
        return <Badge color="danger">Ditolak</Badge>;
    } else {
        return <Badge>-</Badge>;
    }
};

const ActionButton = ({ row }) => {
    return (
        <Fragment>
            {row.status_on_manager === STATUS_PENDING &&
                row.status_on_finance === STATUS_PENDING && (
                    <Fragment>
                        <Link
                            to={"/"}
                            className="btn btn-success btn-sm me-1 text-nowrap"
                        >
                            Ubah
                        </Link>
                        <Link
                            to={"/"}
                            className="btn btn-danger btn-sm me-1 text-nowrap"
                        >
                            Hapus
                        </Link>
                    </Fragment>
                )}
            <Link to={"/"} className="btn btn-warning btn-sm me-1 text-nowrap">
                Detail
            </Link>
        </Fragment>
    );
};

const ListPengajuanOfficer = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col xs={12}>
                    <DataTableServer
                        title="List Pengajuan Barang"
                        actions={
                            <Link to={"/"} className="btn btn-primary btn-sm">
                                Tambah
                            </Link>
                        }
                        columns={columns}
                        endPoint={BASE_URL + "/pengajuan-officer"}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default ListPengajuanOfficer;
