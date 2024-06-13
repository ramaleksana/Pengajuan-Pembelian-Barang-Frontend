import axios from "./axios";

const URL_PENGAJUAN_OFFICER = "/pengajuan-officer";
const URL_PENGAJUAN_MANAGER = "/pengajuan-manager";
const URL_PENGAJUAN_FINANCE = "/pengajuan-finance";

export const addPengajuan = async (items) => {
    try {
        const response = await axios.post(URL_PENGAJUAN_OFFICER, {
            items,
        });

        return {
            message: response.data.message,
            status: true,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
        };
    }
};

export const editPengajuan = async (items, id) => {
    try {
        const response = await axios.put(URL_PENGAJUAN_OFFICER + "/" + id, {
            items,
        });

        return {
            message: response.data.message,
            status: true,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
        };
    }
};

export const showPengajuanOfficer = async (id) => {
    try {
        const response = await axios.get(URL_PENGAJUAN_OFFICER + "/" + id);

        return {
            message: response.data.message,
            status: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
            data: null,
        };
    }
};

export const deletePengajuan = async (id) => {
    try {
        const response = await axios.delete(URL_PENGAJUAN_OFFICER + "/" + id);

        return {
            message: response.data.message,
            status: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
            data: null,
        };
    }
};

export const showPengajuanManager = async (id) => {
    try {
        const response = await axios.get(URL_PENGAJUAN_MANAGER + "/" + id);

        return {
            message: response.data.message,
            status: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
            data: null,
        };
    }
};

export const keputusanPengajuanManager = async (id, status, note) => {
    try {
        const response = await axios.post(URL_PENGAJUAN_MANAGER + "/" + id, {
            status,
            note,
        });

        return {
            message: response.data.message,
            status: true,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
        };
    }
};

export const showPengajuanFinance = async (id) => {
    try {
        const response = await axios.get(URL_PENGAJUAN_FINANCE + "/" + id);

        return {
            message: response.data.message,
            status: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
            data: null,
        };
    }
};

export const keputusanPengajuanFinance = async (id, data) => {
    try {
        const response = await axios.post(
            URL_PENGAJUAN_FINANCE + "/" + id,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return {
            message: response.data.message,
            status: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            message: error.message,
            status: false,
            data: null,
        };
    }
};
