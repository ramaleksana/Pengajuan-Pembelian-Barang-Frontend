import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
    Table,
} from "reactstrap";
import { showPengajuanOfficer } from "../../../services/pengajuanService";
import {
    STATUS_APPROVED,
    STATUS_PENDING,
    STATUS_REJECTED,
} from "../../../constant";

const DetailPengajuanOfficer = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    const fetchData = useCallback(async () => {
        const response = await showPengajuanOfficer(id);
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
                    <h3 className="text-center">Status History</h3>
                    <ListGroup>
                        <ListGroupItem>
                            <h6 className="my-0">Pengajuan</h6>
                            <small className="text-body-secondary">
                                {item?.date_of_filing}
                            </small>
                        </ListGroupItem>
                        <ListGroupItem>
                            {item?.status_on_manager === STATUS_PENDING ? (
                                <Fragment>
                                    <h6 className="my-0">
                                        Menunggu Persetujuan Manager
                                    </h6>
                                </Fragment>
                            ) : item?.status_on_manager === STATUS_APPROVED ? (
                                <Fragment>
                                    <h6 className="my-0">Disetujui Manager</h6>
                                    <small className="text-body-secondary">
                                        {item?.update_status_on_manager}
                                    </small>
                                </Fragment>
                            ) : item?.status_on_manager === STATUS_REJECTED ? (
                                <Fragment>
                                    <h6 className="my-0">Ditolak Manager</h6>
                                    <small className="text-body-secondary">
                                        {item?.update_status_on_manager}
                                    </small>
                                    <p className="text-body-secondary my-0">
                                        {item?.note_from_manager}
                                    </p>
                                </Fragment>
                            ) : (
                                ""
                            )}
                        </ListGroupItem>
                        <ListGroupItem>
                            {item?.status_on_finance === STATUS_PENDING ? (
                                <Fragment>
                                    <h6 className="my-0">
                                        Menunggu Persetujuan Finance
                                    </h6>
                                </Fragment>
                            ) : item?.status_on_finance === STATUS_APPROVED ? (
                                <Fragment>
                                    <h6 className="my-0">Disetujui Finance</h6>
                                    <small className="text-body-secondary">
                                        {item?.update_status_on_finance}
                                    </small>
                                </Fragment>
                            ) : item?.status_on_finance === STATUS_REJECTED ? (
                                <Fragment>
                                    <h6 className="my-0">Ditolak Finance</h6>
                                    <small className="text-body-secondary">
                                        {item?.update_status_on_finance}
                                    </small>
                                    <p className="text-body-secondary my-0">
                                        {item?.note_from_finance}
                                    </p>
                                </Fragment>
                            ) : (
                                ""
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default DetailPengajuanOfficer;
