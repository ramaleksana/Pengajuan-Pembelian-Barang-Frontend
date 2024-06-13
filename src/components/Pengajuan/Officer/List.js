import React, { Fragment } from "react";
import { Badge, Button, Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import {
    BASE_URL,
    STATUS_APPROVED,
    STATUS_PENDING,
    STATUS_REJECTED,
} from "../../../constant";
import DataTableServer from "../../DataTableServer";
import Swal from "sweetalert2";
import { deletePengajuan } from "../../../services/pengajuanService";

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
        cell: (row) => <Catatan row={row} />,
    },
    {
        name: "#",
        cell: (row) => <ActionButton row={row} />,
        center: 1,
    },
];

const Catatan = ({ row }) => {
    return (
        <Fragment>
            {row.status_on_manager === STATUS_REJECTED &&
            row.note_from_manager !== null
                ? row.note_from_manager
                : row.status_on_finance === STATUS_REJECTED &&
                  row.note_from_finance !== null
                ? row.note_from_finance
                : "-"}
        </Fragment>
    );
};

const StatusPengajuan = ({ row }) => {
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
    const handleDelete = (id) => {
        Swal.fire({
            title: "Kamu yakin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Batal",
            preConfirm: async () => {
                try {
                    const response = await deletePengajuan(id);
                    return response;
                } catch (error) {
                    Swal.showValidationMessage(error.message);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Sukses",
                    text: result.message,
                    icon: "success",
                });
                window.location.reload();
            }
        });
    };

    return (
        <Fragment>
            {row.status_on_manager === STATUS_PENDING &&
                row.status_on_finance === STATUS_PENDING && (
                    <Fragment>
                        <Link
                            to={`/pengajuan/edit/${row.id}`}
                            className="btn btn-success btn-sm me-1 text-nowrap"
                        >
                            Ubah
                        </Link>
                        <Button
                            className="me-1 text-nowrap"
                            color="danger"
                            size="sm"
                            onClick={() => handleDelete(row.id)}
                        >
                            Hapus
                        </Button>
                    </Fragment>
                )}
            <Link
                to={`/pengajuan/detail/${row.id}`}
                className="btn btn-warning btn-sm me-1 text-nowrap"
            >
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
                            <Link
                                to={"/pengajuan/add"}
                                className="btn btn-primary btn-sm"
                            >
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
