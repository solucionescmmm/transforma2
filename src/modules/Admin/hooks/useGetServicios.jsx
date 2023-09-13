import { useState, useEffect, useContext, useCallback } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * El hook devuelve los datos del listado de servicios
 *
 * @author Santiago Cardona Saldarriaga <scardonas@xelerica.com>
 **/
const useGetServicios = ({
    intId,
    autoLoad = true,
    intIdTipoTarifa = null,
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
        async ({ signalSubmitData, intIdTipoTarifa, intId }) => {
            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_SERVICIO_GET}`,
                    headers: {
                        token,
                    },
                    params: {
                        intIdTipoTarifa,
                        intId,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (res.data.data === null) {
                        setData({
                            error: true,
                            msg: "No existen servicios asociados al tipo de tarifa seleccionada",
                        });
                    } else {
                        setData(res.data.data);
                    }

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

    const refreshGetData = ({ intIdTipoTarifa = null, intId = null } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData, intIdTipoTarifa, intId });
    };

    const getUniqueData = async ({ intIdTipoTarifa = null, intId = null } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        let query = await getData({
            intIdTipoTarifa,
            signalSubmitData,
            intId
        });

        return query;
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (autoLoad) {
            getData({ signalSubmitData, intIdTipoTarifa });
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, autoLoad, intIdTipoTarifa]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData, getUniqueData };
};

export default useGetServicios;
