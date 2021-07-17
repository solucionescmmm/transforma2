import React, { useState, useEffect, createContext, memo } from "react";

//Librerias
import Cookies from "js-cookie";

//Context
export const AuthContext = createContext();

const Auth = ({ children }) => {
    const [data, setData] = useState({
        token: undefined,
        strData: undefined,
    });

    const handlerChangeData = (type, value) => {
        setData((prevState) => ({
            ...prevState,
            [type]: value,
        }));
    };

    const cerrarSesion = () => {
        setData({
            token: undefined,
            strData: undefined,
        });
        localStorage.removeItem("token");
        Cookies.remove("token");
    };

    useEffect(() => {
        if (localStorage.getItem("token") && !Cookies.get("token")) {
            Cookies.set("token", localStorage.getItem("token"));
        }

        setData((prevState) => ({
            ...prevState,
            token: localStorage.getItem("token") || Cookies.get("token"),
        }));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token: data.token,
                strInfoUser: data.strData,
                handlerChangeData,
                cerrarSesion,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default memo(Auth);
