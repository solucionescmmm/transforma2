

import { useState, useEffect, useContext, useCallback } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * El hook devuelve el los motivos de cancelación de una solicitud
 *
 * @author Santiago Cardona Saldarriaga <scardonas@xelerica.com>
 * @param {{intIdIdea: number, autoLoad: Boolean}} - Parametros de búsqueda:
 * - `intIdIdea`
 * - `autoLoad` Utilice el parámetro en caso de que el hook haga la llamada a la API de forma automatica.
 * @returns {{data: Object, refreshGetData: Function}} Devuelve un objeto con las información de los motivos de no reemplazo y una función para llamar nuevamente a la API
 * @example
 * Objeto con los datos
 * {
    "error": false,
    "data": [
        {
            "intId": 1,
            "strNombre": "Motivos propios",
            "intIdTipoSolicitud": 1,
            "strTipoSolicitud": "Vacaciones"
        }
    ]
    }
 * @example
    Función que permite realizar el llamada a la API
    function refreshGetData({strGrupo, strCodigo})
 *
 */
const useGetRutas = ({ intIdIdea = null, autoLoad = true, intId = null } = {}) => {
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
        async ({ signalSubmitData, intIdIdea, intId }) => {
            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_RUTAS_GET}`,
                    headers: {
                        token,
                    },
                    params: {
                        intId,
                        intIdIdea,
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

    const refreshGetData = ({ intIdIdea = null, intId = null } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData, intIdIdea, intId });
    };

    const getUniqueData = async ({ intIdIdea = null, intId = null } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        let query = await getData({
            intIdIdea,
            intId,
            signalSubmitData
        });

        return query;
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (autoLoad) {
            getData({ signalSubmitData, intIdIdea, intId });
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, intIdIdea, autoLoad, intId]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData, getUniqueData };
};

export default useGetRutas;
