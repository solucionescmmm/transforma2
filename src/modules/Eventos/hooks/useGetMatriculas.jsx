import { useState, useEffect, useContext, useCallback } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * El hook devuelve los datos de los eventos registrados
 *
 * @author Santiago Cardona Saldarriaga <scardonas@xelerica.com>
 * @param {{autoLoad: Boolean}} - Parametros de búsqueda:
 * - `autoLoad` Utilice el parámetro en caso de que el hook haga la llamada a la API de forma automatica.
 * @returns {{data: Object, refreshGetData: Function, alterData: Function}} Devuelve un objeto con las información de los motivos de no reemplazo y una función para llamar nuevamente a la API
 * @example
 * Objeto con los datos
 * {
    "error": false,
    "data": [
      
    ]
    }
 * @example
    Función que permite realizar el llamada a la API
    function refreshGetData()
 *
 */
const useGetMatriculas = ({ autoLoad = true, intIdEvento } = {}) => {
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
        async ({ signalSubmitData, intIdEvento }) => {
            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_MATRICULAS_GET}`,
                    headers: {
                        token,
                    },
                    params: {
                        intIdEvento,
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

    const alterData = (data) => {
        setData(data);
    };

    const refreshGetData = (intIdEvento) => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData, intIdEvento });
    };

    const getUniqueData = async ({ intIdEvento }) => {
        let signalSubmitData = axios.CancelToken.source();

        let query = await getData({
            signalSubmitData,
            intIdEvento,
        });

        return query;
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (autoLoad) {
            getData({
                signalSubmitData,
                intIdEvento,
            });
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, autoLoad, intIdEvento]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData, getUniqueData, alterData };
};

export default useGetMatriculas;
