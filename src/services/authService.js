import axios from "./axios";

const login = async (username, password) => {
    try {
        const response = await axios.post("/auth/login", {
            username,
            password,
        });

        if (response.status === 200) {
            const { token, role, username } = response.data.data;
            localStorage.setItem("username", username);
            localStorage.setItem("role", role);
            localStorage.setItem("token", token);
            return true;
        }
    } catch (error) {
        console.error("Login gagal", error);
        return false;
    }
};

const logout = async () => {
    try {
        const response = await axios.post("/auth/logout");
        // return response.status === 200;
        if (response.status === 200) {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.removeItem("token");
            return true;
        }
    } catch (error) {
        console.error("Logout gagal:", error);
        return false;
    }
};

const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

export { login, logout, isAuthenticated };
