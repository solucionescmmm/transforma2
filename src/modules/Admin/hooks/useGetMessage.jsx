import { useState, useEffect, useContext, useCallback } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * El hook devuelve los datos de las areas
 *
 * @author Santiago Cardona Saldarriaga <scardonas@xelerica.com>
 **/
const useGetMessage = ({
    autoLoad = true,
    strNombreMaestro = "",
    intIdMaestro = "",
} = {}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState();

    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Funciones  =========================================================================================
    //===============================================================================================================================================
    const getData = useCallback(
        async ({ signalSubmitData, strNombreMaestro, intIdMaestro }) => {
            await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_SERVICIO_MESSAGE}`,
                    params: { strNombreMaestro, intIdMaestro },
                    headers: {
                        token,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    const strMsg = res.data.data?.at(0).strMensaje;

                    setData(strMsg || "");
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data.msg;
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        toast.error(msg);

                        setData({
                            error: true,
                            msg,
                        });
                    }
                });
        },
        [token]
    );

    const refreshGetData = ({ strNombreMaestro, intIdMaestro }) => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData, strNombreMaestro, intIdMaestro });
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (autoLoad) {
            getData({ signalSubmitData, strNombreMaestro, intIdMaestro });
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, autoLoad, strNombreMaestro, intIdMaestro]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData };
};

export default useGetMessage;
