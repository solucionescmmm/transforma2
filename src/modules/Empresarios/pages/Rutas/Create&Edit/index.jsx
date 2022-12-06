/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useCallback,
    useEffect,
    useContext,
    useRef,
} from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../../hooks/useGetEmpresarios";

//Librerias
import { Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format, parseISO } from "date-fns";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    LinearProgress,
    Container,
    Alert,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Componentes
import InfoPrincipal from "./infoPrincipal";
import InfoFases from "./infoFases";
import Loader from "../../../../../common/components/Loader";
import PageError from "../../../../../common/components/Error";

const styles = makeStyles((theme) => ({
    containerPR: {
        [theme.breakpoints.down("sm")]: {
            paddingRigth: "0px",
            paddingLeft: "0px",
        },
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: 0,
    },
    container: {
        position: "relative",
        display: "flex",
        width: "inherit",
        height: "70vh",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const CURuta = ({ isEdit, values, isRep, resetSearch }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {},
        arrInfoFases: [],
    });

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
        setValue,
        clearErrors,
    } = useForm({ mode: "onChange" });

    const { intId } = useParams();

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onSubmit = (data) => {
        setData((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: isEdit ? "PUT" : "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${
                        isEdit
                            ? process.env.REACT_APP_API_TRANSFORMA_RUTAS_PUT
                            : process.env.REACT_APP_API_TRANSFORMA_RUTAS_SET
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            const newData = {
                                ...data,
                            };

                            return JSON.stringify(newData);
                        },
                    ],
                    headers: {
                        token,
                        "Content-Type": "application/json;charset=UTF-8",
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    toast.success(res.data.msg);

                    setLoading(false);
                    setSucces(true);
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

                        console.error(error);
                        setLoading(false);

                        toast.error(msg);
                    }
                });
        },
        [token, data, isEdit]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    // useEffect(() => {
    //     if (isEdit) {
    //         setLoadingGetData(true);

    //         async function getData() {
    //             await refFntGetData
    //                 .current({ intId })
    //                 .then((res) => {
    //                     if (res.data.error) {
    //                         throw new Error(res.data.msg);
    //                     }

    //                     if (res.data) {
    //                         let data = res.data.data[0];
    //                         const objEmprPrincipal = data.objEmpresario.find(
    //                             (p) => p.strTipoEmpresario === "Principal"
    //                         );

    //                         setData({
    //                             intIdIdea: data.intId,
    //                             objIdeaEmpresario: data.objIdeaEmpresario,
    //                             objInfoPrincipal: {
    //                                 strSede: objEmprPrincipal.strSede || "",
    //                                 strModalidadIngreso:
    //                                     objEmprPrincipal.strModalidadIngreso ||
    //                                     "",
    //                                 dtFechaVinculacion:
    //                                     objEmprPrincipal.dtFechaVinculacion
    //                                         ? parseISO(
    //                                               objEmprPrincipal.dtFechaVinculacion
    //                                           )
    //                                         : null,
    //                                 strEstadoVinculacion:
    //                                     objEmprPrincipal.strEstadoVinculacion ||
    //                                     "",
    //                                 strTipoVinculacion:
    //                                     objEmprPrincipal.strTipoVinculacion ||
    //                                     "",
    //                             },

    //                             objInfoEmpresarioPr: {
    //                                 intId: objEmprPrincipal.intId,
    //                                 strNombres:
    //                                     objEmprPrincipal.strNombres || "",
    //                                 strApellidos:
    //                                     objEmprPrincipal.strApellidos || "",
    //                                 strTipoDocto:
    //                                     objEmprPrincipal.strTipoDocto || "",
    //                                 strNroDocto:
    //                                     objEmprPrincipal.strNroDocto || "",
    //                                 strLugarExpedicionDocto:
    //                                     objEmprPrincipal.strLugarExpedicionDocto ||
    //                                     "",
    //                                 dtFechaExpedicionDocto:
    //                                     objEmprPrincipal.dtFechaExpedicionDocto
    //                                         ? parseISO(
    //                                               objEmprPrincipal.dtFechaExpedicionDocto
    //                                           )
    //                                         : null,
    //                                 dtFechaNacimiento:
    //                                     objEmprPrincipal.dtFechaNacimiento
    //                                         ? parseISO(
    //                                               objEmprPrincipal.dtFechaNacimiento
    //                                           )
    //                                         : null,
    //                                 strGenero: objEmprPrincipal.strGenero || "",
    //                                 strCelular1:
    //                                     objEmprPrincipal.strCelular1 || "",
    //                                 strCelular2:
    //                                     objEmprPrincipal.strCelular2 || "",
    //                                 strCorreoElectronico1:
    //                                     objEmprPrincipal.strCorreoElectronico1 ||
    //                                     "",
    //                                 strCorreoElectronico2:
    //                                     objEmprPrincipal.strCorreoElectronico2 ||
    //                                     "",
    //                                 strNivelEducativo:
    //                                     objEmprPrincipal.strNivelEducativo ||
    //                                     "",
    //                                 strTitulos:
    //                                     objEmprPrincipal.strTitulos || "",
    //                                 strCondicionDiscapacidad:
    //                                     objEmprPrincipal.strCondicionDiscapacidad ||
    //                                     "",
    //                                 strEstrato:
    //                                     objEmprPrincipal.strEstrato || "",
    //                                 arrDepartamento:
    //                                     objEmprPrincipal.arrDepartamento || [],
    //                                 arrCiudad: objEmprPrincipal.arrCiudad || [],
    //                                 strBarrio: objEmprPrincipal.strBarrio || "",
    //                                 strDireccionResidencia:
    //                                     objEmprPrincipal.strDireccionResidencia ||
    //                                     "",
    //                                 strURLFileFoto:
    //                                     objEmprPrincipal.strUrlFileFoto || "",
    //                             },

    //                             objInfoEmpresa: {
    //                                 intId: data.objInfoEmpresa.intId,
    //                                 strURLFileLogoEmpresa:
    //                                     data.objInfoEmpresa
    //                                         .strURLFileLogoEmpresa || null,
    //                                 strEstadoNegocio:
    //                                     data.objInfoEmpresa.strEstadoNegocio ||
    //                                     "",
    //                                 strCuandoComienzaEmpresa:
    //                                     data.objInfoEmpresa
    //                                         .strCuandoComienzaEmpresa || "",
    //                                 strNombreMarca:
    //                                     data.objInfoEmpresa.strNombreMarca ||
    //                                     "",
    //                                 dtFechaFundacion: data.objInfoEmpresa
    //                                     .dtFechaFundacion
    //                                     ? parseISO(
    //                                           data.objInfoEmpresa
    //                                               .dtFechaFundacion
    //                                       )
    //                                     : null,
    //                                 strLugarOperacion:
    //                                     data.objInfoEmpresa.strLugarOperacion ||
    //                                     "",
    //                                 strDireccionResidencia:
    //                                     data.objInfoEmpresa
    //                                         .strDireccionResidencia || "",
    //                                 arrDepartamento:
    //                                     data.objInfoEmpresa.arrDepartamento ||
    //                                     [],
    //                                 arrCiudad:
    //                                     data.objInfoEmpresa.arrCiudad || [],
    //                                 strBarrio:
    //                                     data.objInfoEmpresa.strBarrio || "",
    //                                 strSectorEconomico:
    //                                     data.objInfoEmpresa
    //                                         .strSectorEconomico || "",
    //                                 strCategoriaProducto:
    //                                     data.objInfoEmpresa
    //                                         .strCategoriaProducto || "",
    //                                 strCategoriaServicio:
    //                                     data.objInfoEmpresa
    //                                         .strCategoriaServicio || "",
    //                                 arrCategoriasSecundarias:
    //                                     data.objInfoEmpresa
    //                                         .arrCategoriasSecundarias || [],
    //                                 strOtraCategoria:
    //                                     data.objInfoEmpresa.strOtraCategoria ||
    //                                     "",
    //                                 strDescProductosServicios:
    //                                     data.objInfoEmpresa
    //                                         .strDescProductosServicios || "",
    //                                 strMateriaPrima:
    //                                     data.objInfoEmpresa.strMateriaPrima ||
    //                                     "",
    //                                 strNombreTecnica:
    //                                     data.objInfoEmpresa.strNombreTecnica ||
    //                                     "",
    //                                 strTiempoDedicacion:
    //                                     data.objInfoEmpresa
    //                                         .strTiempoDedicacion || "",
    //                                 btGeneraEmpleo:
    //                                     typeof data.objInfoEmpresa
    //                                         .btGeneraEmpleo === "boolean"
    //                                         ? data.objInfoEmpresa.btGeneraEmpleo
    //                                         : "",
    //                                 intNumeroEmpleados:
    //                                     data.objInfoEmpresa
    //                                         .intNumeroEmpleados || "",
    //                                 dblValorVentasMes:
    //                                     data.objInfoEmpresa.valorVentasMes ||
    //                                     "",
    //                                 arrRequisitosLey:
    //                                     data.objInfoEmpresa.arrRequisitosLey ||
    //                                     [],
    //                                 strOtrosRequisitosLey:
    //                                     data.objInfoEmpresa
    //                                         .strOtrosRequisitosLey || "",
    //                                 arrFormasComercializacion:
    //                                     data.objInfoEmpresa
    //                                         .arrFormasComercializacion || [],
    //                                 arrMediosDigitales:
    //                                     data.objInfoEmpresa
    //                                         .arrMediosDigitales || [],
    //                                 btGrupoAsociativo:
    //                                     typeof data.objInfoEmpresa
    //                                         .btGrupoAsociativo === "boolean"
    //                                         ? data.objInfoEmpresa
    //                                               .btGrupoAsociativo
    //                                         : "",
    //                                 strAsociacionUnidadProdIndividual:
    //                                     data.objInfoEmpresa
    //                                         .strAsociacionUnidadProdIndividual ||
    //                                     "",
    //                             },

    //                             objInfoAdicional: {
    //                                 ...data.objInfoAdicional,
    //                                 strURLDocumento:
    //                                     data.objInfoAdicional.strUrlDocumento,
    //                             },

    //                             arrInfoEmpresarioSec:
    //                                 data.arrEmpresarioSecundario || [],
    //                         });
    //                     }

    //                     setLoadingGetData(false);
    //                     setErrorGetData({ flag: false, msg: "" });
    //                 })
    //                 .catch((error) => {
    //                     setErrorGetData({ flag: true, msg: error.message });
    //                     setLoadingGetData(false);
    //                 });
    //         }

    //         getData();
    //     }
    // }, [isEdit, intId]);

    useEffect(() => {
        if (values) {
            setData(values);
            reset(values);
        }
    }, [values]);

    useEffect(() => {
        if (isEdit) {
            reset(data);
        }
    }, [data, reset, isEdit]);

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            submitData(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, submitData]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (success) {
        return <Redirect to="/transforma/asesor/empresario/read/all" />;
    }

    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    if (data?.error) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={data.msg}
            />
        );
    }

    return (
        <Grid
            container
            direction="row"
            spacing={3}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                marginTop: "10px",
            }}
        >
            <Grid item xs={12}>
                <Container className={classes.containerPR}>
                    <Paper className={classes.paper}>
                        {loading ? (
                            <LinearProgress
                                className={classes.linearProgress}
                            />
                        ) : null}

                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            style={{ padding: "25px" }}
                        >
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            align="center"
                                            style={{ fontWeight: "bold" }}
                                            color="primary"
                                            variant="h6"
                                        >
                                            {isEdit
                                                ? "EDITAR RUTA"
                                                : "REGISTRAR RUTA"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    Todos los campos marcados con (*) son
                                    obligatorios.
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <InfoPrincipal
                                    control={control}
                                    values={data.objInfoPrincipal}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    isEdit={isEdit}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoFases
                                    control={control}
                                    values={data.arrInfoFases}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    isEdit={isEdit}
                                />
                            </Grid>

                            {(errors.objInfoPrincipal ||
                                errors.arrInfoFases) && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        Lo sentimos, tienes campos pendientes
                                        por diligenciar en el formulario, revisa
                                        e intentalo nuevamente.
                                    </Alert>
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row-reverse",
                                        gap: 1,
                                    }}
                                >
                                    <LoadingButton
                                        variant="contained"
                                        type="submit"
                                        loading={loading}
                                    >
                                        {isEdit ? "guardar" : "registrar"}
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

export default CURuta;
