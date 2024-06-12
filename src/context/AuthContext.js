import { createContext, useContext, useEffect, useState } from "react";
import {
    login as authLogin,
    logout as authLogout,
    isAuthenticated,
} from "../services/authService";

const AuthContext = createContext();

const getUsername = localStorage.getItem("username") || null;
const getRole = localStorage.getItem("role") || null;

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
    const [role, setRole] = useState(getRole);
    const [username, setUsername] = useState(getUsername);

    const login = async (username, password) => {
        const result = await authLogin(username, password);
        if (result) {
            setIsLoggedIn(true);
        }
        return result;
    };

    const logout = async () => {
        const result = await authLogout();
        if (result) {
            setIsLoggedIn(false);
        }
        return result;
    };

    useEffect(() => {
        setUsername(getUsername);
        setRole(getRole);
        setIsLoggedIn(isAuthenticated());
    }, []);

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, username, role, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
