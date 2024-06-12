import axios from "./axios";

const URL_PENGAJUAN_OFFICER = "/pengajuan-officer";

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
