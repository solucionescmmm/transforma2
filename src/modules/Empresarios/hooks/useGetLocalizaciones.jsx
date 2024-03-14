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
 * @param {{strGrupo: string, strCodigo: string, autoLoad: Boolean}} - Parametros de búsqueda:
 * - `strGrupo` Utilice el parámetro en caso de buscar la información por un grupo en específico.
 * - `strCodigo` Utilice el parámetro en caso de buscar la información por un codigo en específico.
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
const useGetLocalidades = ({
    strCodigo = "paises",
    strPais = null,
    strDepartamento = null,
    strCiudad = null,
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
        async ({ signalSubmitData, strPais, strDepartamento, strCiudad, strCodigo }) => {
            await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url:
                        strCodigo === "paises"
                            ? `${process.env.REACT_APP_API_TRANSFORMA_LOCALIZACIONES_GETPAISES}`
                            : strCodigo === "departamentos"
                            ? `${process.env.REACT_APP_API_TRANSFORMA_LOCALIZACIONES_GETDEPARTAMENTOS}`
                            : strCodigo === "municipios"
                            ? `${process.env.REACT_APP_API_TRANSFORMA_LOCALIZACIONES_GETMUNICIPIOS}`
                            : strCodigo === "localidades"
                            ? `${process.env.REACT_APP_API_TRANSFORMA_LOCALIZACIONES_GETLOCALIDADES}`
                            : null,
                    headers: {
                        token,
                    },
                    params: {
                        strPais,
                        strDepartamento,
                        strCiudad,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    setData(res.data.data);
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

    const refreshGetData = ({
        strCodigo = "departamentos",
        strDepartamento = null,
        strCiudad = null,
    } = {}) => {
        let signalSubmitData = axios.CancelToken.source();

        setData();

        getData({ signalSubmitData, strDepartamento, strCiudad, strCodigo });
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (autoLoad) {
            if (strCodigo === "paises") {
                getData({ signalSubmitData, strCodigo });
            }

            if (strCodigo === "departamentos" && !strPais) {
                setData([]);
            }

            if (strCodigo === "departamentos" && strPais) {
                getData({ signalSubmitData, strPais, strDepartamento, strCiudad, strCodigo });
            }

            if (strCodigo === "municipios" && !strDepartamento) {
                setData([]);
            }

            if (strCodigo === "municipios" && strDepartamento) {
                getData({ signalSubmitData, strDepartamento, strCiudad, strCodigo });
            }

            if (strCodigo === "localidades" && !strDepartamento && !strCiudad) {
                setData([]);
            }

            if (strCodigo === "localidades" && strDepartamento && strCiudad) {
                getData({ signalSubmitData, strDepartamento, strCiudad, strCodigo });
            }
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, strPais, strDepartamento, strCiudad, strCodigo, autoLoad]);

    //===============================================================================================================================================
    //========================================== Returns ============================================================================================
    //===============================================================================================================================================
    return { data, refreshGetData };
};

export default useGetLocalidades;
