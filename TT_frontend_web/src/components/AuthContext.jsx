import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Cargar datos de autenticación desde localStorage
        const accountData = localStorage.getItem("accountDetails");
        if (accountData) {
            const { email } = JSON.parse(accountData);
            setEmail(email);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (accountData) => {
        // Actualizar el estado e ingresar los datos al localStorage
        localStorage.setItem("accountDetails", JSON.stringify(accountData));
        setEmail(accountData.email);
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Eliminar datos de autenticación
        localStorage.removeItem("accountDetails");
        setIsAuthenticated(false);
        setEmail("");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
