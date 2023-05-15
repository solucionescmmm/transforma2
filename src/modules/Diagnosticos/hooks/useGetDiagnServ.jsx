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
 * @param {{intId: number, intIdEmpresario: number, autoLoad: Boolean}} - Parametros de búsqueda:
 * - `intId` Utilice el parámetro en caso de buscar la información por un grupo en específico.
 * - `intIdEmpresario` Utilice el parámetro en caso de buscar la información por un codigo en específico.
 * - `autoLoad` Utilice el parámetro en caso de que el hook haga la llamada a la API de forma automatica.
 * @returns {{data: Object, refreshGetData: Function, getUniqueData: Function}} Devuelve un objeto con las información de los motivos de no reemplazo y una función para llamar nuevamente a la API
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
    function refreshGetData({intId, intIdEmpresario})
 *
 */
const useGetDiagnServ = ({
    intId = null,
    intIdEmpresario = null,
    intIdDiagnostico,
    intIdIdea,
    autoLoad = true,
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
        async ({
            signalSubmitData,
            intId,
            intIdEmpresario,
            intIdDiagnostico,
            intIdIdea,
        }) => {
            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_GETSERVICIO}`,
                    headers: {
                        token,
                    },
                    params: {
                        intIdEmpresario,
                        intId,
                        intIdDiagnostico,
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

    const refreshGetData = ({
        intId = null,
        intIdEmpresario = null,
        intIdDiagnostico,
        intIdIdea,
    } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({
            signalSubmitData,
            intId,
            intIdEmpresario,
            intIdDiagnostico,
            intIdIdea,
        });
    };

    const getUniqueData = async ({
        intId = null,
        intIdEmpresario = null,
        intIdDiagnostico,
        intIdIdea,
    } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        let query = await getData({
            signalSubmitData,
            intId,
            intIdEmpresario,
            intIdDiagnostico,
            intIdIdea,
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
                intId,
                intIdEmpresario,
                intIdDiagnostico,
                intIdIdea,
            });
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [
        getData,
        intIdEmpresario,
        intId,
        autoLoad,
        intIdDiagnostico,
        intIdIdea,
    ]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData, getUniqueData };
};

export default useGetDiagnServ;
