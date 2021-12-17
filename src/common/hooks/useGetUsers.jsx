import { useState, useEffect, useContext, useCallback } from "react";

//Context
import { AuthContext } from "../middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

/**
 * El hook devuelve los usuarios del sistema
 *
 * @author Santiago Cardona Saldarriaga <scardonas@xelerica.com>
 * @param {{autoLoad: Boolean}} - Parametros de búsqueda:
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
    function refreshGetData()
 *
 */
const useGetUsers = ({ autoLoad = true } = {}) => {
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
            await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_USUARIOS_GETUSUARIOS}`,
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

                    console.log(res.data.data);
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

    const refreshGetData = () => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData });
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
    return { data, refreshGetData };
};

export default useGetUsers;
