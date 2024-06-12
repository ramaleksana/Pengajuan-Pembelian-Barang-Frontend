import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import instance from "../services/axios";
import { Spinner } from "reactstrap";

const DataTableServer = ({ title = "", actions, columns, endPoint }) => {
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(
        async (page, per_page) => {
            setLoading(true);

            try {
                const response = await instance.get(endPoint, {
                    params: {
                        page,
                        limit: per_page,
                    },
                });
                if (response.status === 200) {
                    setData(response.data.data);
                    setTotalRows(response.data.total);
                }
            } catch (error) {
            } finally {
                setLoading(false);
            }
        },
        [endPoint]
    );

    useEffect(() => {
        fetchData(1, perPage);
    }, [fetchData, perPage]);

    const handlePageChange = (page) => {
        fetchData(page, perPage);
    };

    const handlePerRowsChange = (newPerPage, page) => {
        setPerPage(newPerPage);
        fetchData(page, newPerPage);
    };

    return (
        <DataTable
            title={title}
            actions={actions}
            columns={columns}
            data={data}
            progressPending={loading}
            progressComponent={<CustomSpinner />}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            striped
            highlightOnHover
            responsive
            persistTableHead
        />
    );
};

const CustomSpinner = () => {
    return (
        <div className="my-4">
            <Spinner />
        </div>
    );
};

export default DataTableServer;
