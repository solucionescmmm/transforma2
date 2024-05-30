import { useState, useEffect, useContext, useCallback } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth"; 

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

const useGetMotivosCancelacion = ({ autoLoad = true } = {}) => {
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
        async ({ signalSubmitData }) => {
            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_RUTAS_GET_MOTIVOS_CANCELACION}`,
                    headers: {
                        token,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    setData(res.data.data);

                    return res;
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

                        return error;
                    }
                });
        },
        [token]
    );

    const refreshGetData = () => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData });
    };

    const getUniqueData = async () => {
        let signalSubmitData = axios.CancelToken.source();

        let query = await getData({
            signalSubmitData,
        });

        return query;
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (autoLoad) {
            getData({ signalSubmitData });
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, autoLoad]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData, getUniqueData };
};

export default useGetMotivosCancelacion;