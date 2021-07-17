import React, { useState, useContext, useCallback, useEffect, useRef } from "react";

//Context
import { AuthContext } from "./Auth";

//librerias
import { Redirect, Route } from "react-router-dom";
import axios from "axios";

//Componentes
import Loader from "../components/Loader";
import PageError from "../components/Error";

const PrivateRoute = ({ children, ...props }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, handlerChangeData } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaración de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState({
        flag: false,
        msg: undefined,
    });

    //===============================================================================================================================================
    //========================================== Referencias ========================================================================================
    //===============================================================================================================================================
    const handlerChangeDataRef = useRef(handlerChangeData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const getDataToken = useCallback(async (signalGetDataToken, token) => {
        setLoading(true);

        await axios({
            method: "GET",
            baseURL: `${process.env.REACT_APP_API_BACK_PROT_DATALAKE}://${process.env.REACT_APP_API_BACK_HOST_DATALAKE}${process.env.REACT_APP_API_BACK_PORT_DATALAKE}`,
            url: `${process.env.REACT_APP_API_DATALAKE_LOGIN_GETDATA}`,
            headers: {
                token,
            },
            cancelToken: signalGetDataToken.token,
        })
            .then((res) => {
                if (res.data.error) {
                    throw new Error(res.data.msg);
                }

                handlerChangeDataRef.current("strData", {
                    ...res.data.data,
                    strIndicadorPais: res.data.data.strPaisNomina.substring(0, 2),
                });

                setLoading(false);
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    if (error.response) {
                        if (error.response.status === 401) {
                            handlerChangeDataRef.current("token", undefined);
                            return;
                        }
                    }

                    console.error(error);

                    setError({
                        flag: true,
                        msg: error.message,
                    });

                    setLoading(false);
                }
            });
    }, []);

    //===============================================================================================================================================
    //========================================== UseEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalGetDataToken = axios.CancelToken.source();

        if (token) {
            getDataToken(signalGetDataToken, token);
        }

        return () => {
            signalGetDataToken.cancel("Petición abortada.");
        };
    }, [token, getDataToken]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!token) {
        return <Redirect to="/" />;
    }

    if (error.flag) {
        return (
            <PageError
                severity="error"
                title={error.msg}
                msg="Ha ocurrido un error al obtener la información del token, si el error persiste por favor comunícate con el área de TI para más información."
            />
        );
    }

    if (loading) {
        return <Loader />;
    }

    return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
