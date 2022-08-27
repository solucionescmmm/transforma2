import React, {
    useState,
    useCallback,
    useEffect,
    useContext,
    useRef,
} from "react";

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";
import { useHistory } from "react-router-dom";

//Librerias
import { Link as RouterLink, Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format, parseISO } from "date-fns";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    LinearProgress,
    Container,
    Alert,
    Button,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos
import {
    Home as HomeIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

//Estilos
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Componentes
import InfoPrincipal from "./infoPrincipal";
import InfoEmpresarioPr from "./infoEmpresarioPr";
import InfoEmpresa from "./infoEmpresa";
import InfoAdicional from "./infoAdicional";
import Loader from "../../../../common/components/Loader";
import PageError from "../../../../common/components/Error";

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

const CUEmpresario = ({ isEdit }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {},
        objInfoEmpresarioPr: {},
        arrInfoEmpresarioSec: [],
        objInfoEmpresa: {},
        objInfoAdicional: {},
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

    const { goBack } = useHistory();

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
                            ? process.env
                                  .REACT_APP_API_TRANSFORMA_INTERESADOS_UPDATEREGISTRO
                            : process.env
                                  .REACT_APP_API_TRANSFORMA_INTERESADOS_SETREGISTRO
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                intIdIdea: data.intId,
                                objIdeaEmpresario: data.objIdeaEmpresario,
                                objEmpresario: {
                                    intId: data.objInfoEmpresarioPr.intId,
                                    strSede: data.objInfoPrincipal.strSede,
                                    strModalidadIngreso:
                                        data.objInfoPrincipal
                                            .strModalidadIngreso,
                                    dtFechaVinculacion: data.objInfoPrincipal
                                        .dtFechaVinculacion
                                        ? format(
                                              data.objInfoPrincipal
                                                  .dtFechaVinculacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strEstadoVinculacion:
                                        data.objInfoPrincipal
                                            .strEstadoVinculacion,
                                    strTipoVinculacion:
                                        data.objInfoPrincipal
                                            .strTipoVinculacion,
                                    strNombres:
                                        data.objInfoEmpresarioPr.strNombres,
                                    strApellidos:
                                        data.objInfoEmpresarioPr.strApellidos,
                                    strTipoDocto:
                                        data.objInfoEmpresarioPr.strTipoDocto,
                                    strNroDocto:
                                        data.objInfoEmpresarioPr.strNroDocto,
                                    strLugarExpedicionDocto:
                                        data.objInfoEmpresarioPr
                                            .strLugarExpedicionDocto,
                                    dtFechaExpedicionDocto: data
                                        .objInfoEmpresarioPr
                                        .dtFechaExpedicionDocto
                                        ? format(
                                              data.objInfoEmpresarioPr
                                                  .dtFechaExpedicionDocto,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    dtFechaNacimiento: data.objInfoEmpresarioPr
                                        .dtFechaNacimiento
                                        ? format(
                                              data.objInfoEmpresarioPr
                                                  .dtFechaNacimiento,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strGenero:
                                        data.objInfoEmpresarioPr.strGenero,
                                    strCelular1:
                                        data.objInfoEmpresarioPr.strCelular1,
                                    strCelular2:
                                        data.objInfoEmpresarioPr.strCelular2,
                                    strCorreoElectronico1:
                                        data.objInfoEmpresarioPr
                                            .strCorreoElectronico1,
                                    strCorreoElectronico2:
                                        data.objInfoEmpresarioPr
                                            .strCorreoElectronico2,
                                    strNivelEducativo:
                                        data.objInfoEmpresarioPr
                                            .strNivelEducativo,
                                    strTitulos:
                                        data.objInfoEmpresarioPr.strTitulos,
                                    strCondicionDiscapacidad:
                                        data.objInfoEmpresarioPr
                                            .strCondicionDiscapacidad,
                                    strEstrato:
                                        data.objInfoEmpresarioPr.strEstrato,
                                    arrDepartamento:
                                        data.objInfoEmpresarioPr
                                            .arrDepartamento,
                                    arrCiudad:
                                        data.objInfoEmpresarioPr.arrCiudad,
                                    strBarrio:
                                        data.objInfoEmpresarioPr.strBarrio,
                                    strDireccionResidencia:
                                        data.objInfoEmpresarioPr
                                            .strDireccionResidencia,
                                    strURLFileFoto:
                                        data.objInfoEmpresarioPr.strURLFileFoto,
                                },

                                arrEmpresarioSecundario:
                                    data.arrInfoEmpresarioSec,

                                objInfoEmpresa: {
                                    strURLFileLogoEmpresa:
                                        data.objInfoEmpresa
                                            .strURLFileLogoEmpresa,
                                    strEstadoNegocio:
                                        data.objInfoEmpresa.strEstadoNegocio,
                                    strCuandoComienzaEmpresa:
                                        data.objInfoEmpresa
                                            .strCuandoComienzaEmpresa,
                                    strNombreMarca:
                                        data.objInfoEmpresa.strNombreMarca,
                                    dtFechaFundacion: data.objInfoEmpresa
                                        .dtFechaFundacion
                                        ? format(
                                              data.objInfoEmpresa
                                                  .dtFechaFundacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strLugarOperacion:
                                        data.objInfoEmpresa.strLugarOperacion,
                                    strDireccionResidencia:
                                        data.objInfoEmpresa
                                            .strDireccionResidencia,
                                    arrDepartamento:
                                        data.objInfoEmpresa.arrDepartamento,
                                    arrCiudad: data.objInfoEmpresa.arrCiudad,
                                    strBarrio: data.objInfoEmpresa.strBarrio,
                                    strSectorEconomico:
                                        data.objInfoEmpresa.strSectorEconomico,
                                    strCategoriaProducto:
                                        data.objInfoEmpresa
                                            .strCategoriaProducto,
                                    strCategoriaServicio:
                                        data.objInfoEmpresa
                                            .strCategoriaServicio,
                                    arrCategoriasSecundarias:
                                        data.objInfoEmpresa
                                            .arrCategoriasSecundarias,
                                    strOtraCategoria:
                                        data.objInfoEmpresa.strOtraCategoria,
                                    strDescProductosServicios:
                                        data.objInfoEmpresa
                                            .strDescProductosServicios,
                                    strMateriaPrima:
                                        data.objInfoEmpresa.strMateriaPrima,
                                    strNombreTecnica:
                                        data.objInfoEmpresa.strNombreTecnica,
                                    strTiempoDedicacion:
                                        data.objInfoEmpresa.strTiempoDedicacion,
                                    btGeneraEmpleo:
                                        data.objInfoEmpresa.btGeneraEmpleo,
                                    intNumeroEmpleados:
                                        data.objInfoEmpresa.intNumeroEmpleados,
                                    dblValorVentasMes:
                                        data.objInfoEmpresa.dblValorVentasMes,
                                    arrRequisitosLey:
                                        data.objInfoEmpresa.arrRequisitosLey,
                                    strOtrosRequisitosLey:
                                        data.objInfoEmpresa
                                            .strOtrosRequisitosLey,
                                    arrFormasComercializacion:
                                        data.objInfoEmpresa
                                            .arrFormasComercializacion,
                                    arrMediosDigitales:
                                        data.objInfoEmpresa.arrMediosDigitales,
                                    btGrupoAsociativo:
                                        data.objInfoEmpresa.btGrupoAsociativo,
                                    strAsociacionUnidadProdIndividual:
                                        data.objInfoEmpresa
                                            .strAsociacionUnidadProdIndividual,
                                },

                                objInfoAdicional: {
                                    strPrincipalesNecesidades:
                                        data.objInfoAdicional
                                            .strPrincipalesNecesidades,
                                    btInteresadoProcesoCMM:
                                        data.objInfoAdicional
                                            .btInteresadoProcesoCMM,
                                    arrTemasCapacitacion:
                                        data.objInfoAdicional
                                            .arrTemasCapacitacion,
                                    arrComoSeEntero:
                                        data.objInfoAdicional.arrComoSeEntero,
                                    strOtroComoSeEntero:
                                        data.objInfoAdicional
                                            .strOtroComoSeEntero,
                                    arrMediosDeComunicacion:
                                        data.objInfoAdicional
                                            .arrMediosDeComunicacion,
                                    strOtrosMediosComunicacion:
                                        data.objInfoAdicional
                                            .strOtrosMediosComunicacion,
                                    btRecibirInfoCMM:
                                        data.objInfoAdicional.btRecibirInfoCMM,
                                    strURLDocumento:
                                        data.objInfoAdicional.strURLDocumento,
                                    strRecomendaciones:
                                        data.objInfoAdicional
                                            .strRecomendaciones,
                                },
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
    useEffect(() => {
        if (isEdit) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData
                    .current({ intId })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data) {
                            let data = res.data.data[0];
                            const objEmprPrincipal = data.objEmpresario.find(
                                (p) => p.strTipoEmpresario === "Principal"
                            );

                            setData({
                                intIdIdea: data.intId,
                                objIdeaEmpresario: data.objIdeaEmpresario,
                                objInfoPrincipal: {
                                    strSede: objEmprPrincipal.strSede || "",
                                    strModalidadIngreso:
                                        objEmprPrincipal.strModalidadIngreso ||
                                        "",
                                    dtFechaVinculacion:
                                        objEmprPrincipal.dtFechaVinculacion
                                            ? parseISO(
                                                  objEmprPrincipal.dtFechaVinculacion
                                              )
                                            : null,
                                    strEstadoVinculacion:
                                        objEmprPrincipal.strEstadoVinculacion ||
                                        "",
                                    strTipoVinculacion:
                                        objEmprPrincipal.strTipoVinculacion ||
                                        "",
                                },

                                objInfoEmpresarioPr: {
                                    intId: objEmprPrincipal.intId,
                                    strNombres:
                                        objEmprPrincipal.strNombres || "",
                                    strApellidos:
                                        objEmprPrincipal.strApellidos || "",
                                    strTipoDocto:
                                        objEmprPrincipal.strTipoDocto || "",
                                    strNroDocto:
                                        objEmprPrincipal.strNroDocto || "",
                                    strLugarExpedicionDocto:
                                        objEmprPrincipal.strLugarExpedicionDocto ||
                                        "",
                                    dtFechaExpedicionDocto:
                                        objEmprPrincipal.dtFechaExpedicionDocto
                                            ? parseISO(
                                                  objEmprPrincipal.dtFechaExpedicionDocto
                                              )
                                            : null,
                                    dtFechaNacimiento:
                                        objEmprPrincipal.dtFechaNacimiento
                                            ? parseISO(
                                                  objEmprPrincipal.dtFechaNacimiento
                                              )
                                            : null,
                                    strGenero: objEmprPrincipal.strGenero || "",
                                    strCelular1:
                                        objEmprPrincipal.strCelular1 || "",
                                    strCelular2:
                                        objEmprPrincipal.strCelular2 || "",
                                    strCorreoElectronico1:
                                        objEmprPrincipal.strCorreoElectronico1 ||
                                        "",
                                    strCorreoElectronico2:
                                        objEmprPrincipal.strCorreoElectronico2 ||
                                        "",
                                    strNivelEducativo:
                                        objEmprPrincipal.strNivelEducativo ||
                                        "",
                                    strTitulos:
                                        objEmprPrincipal.strTitulos || "",
                                    strCondicionDiscapacidad:
                                        objEmprPrincipal.strCondicionDiscapacidad ||
                                        "",
                                    strEstrato:
                                        objEmprPrincipal.strEstrato || "",
                                    arrDepartamento:
                                        objEmprPrincipal.arrDepartamento || [],
                                    arrCiudad: objEmprPrincipal.arrCiudad || [],
                                    strBarrio: objEmprPrincipal.strBarrio || "",
                                    strDireccionResidencia:
                                        objEmprPrincipal.strDireccionResidencia ||
                                        "",
                                    strURLFileFoto:
                                        objEmprPrincipal.strURLFileFoto || "",
                                },

                                objInfoEmpresa: {
                                    strURLFileLogoEmpresa:
                                        data.objInfoEmpresa
                                            .strURLFileLogoEmpresa || null,
                                    strEstadoNegocio:
                                        data.objInfoEmpresa.strEstadoNegocio ||
                                        "",
                                    strCuandoComienzaEmpresa:
                                        data.objInfoEmpresa
                                            .strCuandoComienzaEmpresa || "",
                                    strNombreMarca:
                                        data.objInfoEmpresa.strNombreMarca ||
                                        "",
                                    dtFechaFundacion: data.objInfoEmpresa
                                        .dtFechaFundacion
                                        ? parseISO(
                                              data.objInfoEmpresa
                                                  .dtFechaFundacion
                                          )
                                        : null,
                                    strLugarOperacion:
                                        data.objInfoEmpresa.strLugarOperacion ||
                                        "",
                                    strDireccionResidencia:
                                        data.objInfoEmpresa
                                            .strDireccionResidencia || "",
                                    arrDepartamento:
                                        data.objInfoEmpresa.arrDepartamento ||
                                        [],
                                    arrCiudad:
                                        data.objInfoEmpresa.arrCiudad || [],
                                    strBarrio:
                                        data.objInfoEmpresa.strBarrio || "",
                                    strSectorEconomico:
                                        data.objInfoEmpresa
                                            .strSectorEconomico || "",
                                    strCategoriaProducto:
                                        data.objInfoEmpresa
                                            .strCategoriaProducto || "",
                                    strCategoriaServicio:
                                        data.objInfoEmpresa
                                            .strCategoriaServicio || "",
                                    arrCategoriasSecundarias:
                                        data.objInfoEmpresa
                                            .arrCategoriasSecundarias || [],
                                    strOtraCategoria:
                                        data.objInfoEmpresa.strOtraCategoria ||
                                        "",
                                    strDescProductosServicios:
                                        data.objInfoEmpresa
                                            .strDescProductosServicios || "",
                                    strMateriaPrima:
                                        data.objInfoEmpresa.strMateriaPrima ||
                                        "",
                                    strNombreTecnica:
                                        data.objInfoEmpresa.strNombreTecnica ||
                                        "",
                                    strTiempoDedicacion:
                                        data.objInfoEmpresa
                                            .strTiempoDedicacion || "",
                                    btGeneraEmpleo:
                                        typeof data.objInfoEmpresa
                                            .btGeneraEmpleo === "boolean"
                                            ? data.objInfoEmpresa.btGeneraEmpleo
                                            : "",
                                    intNumeroEmpleados:
                                        data.objInfoEmpresa
                                            .intNumeroEmpleados || "",
                                    dblValorVentasMes:
                                        data.objInfoEmpresa.valorVentasMes ||
                                        "",
                                    arrRequisitosLey:
                                        data.objInfoEmpresa.arrRequisitosLey ||
                                        [],
                                    strOtrosRequisitosLey:
                                        data.objInfoEmpresa
                                            .strOtrosRequisitosLey || "",
                                    arrFormasComercializacion:
                                        data.objInfoEmpresa
                                            .arrFormasComercializacion || [],
                                    arrMediosDigitales:
                                        data.objInfoEmpresa
                                            .arrMediosDigitales || [],
                                    btGrupoAsociativo:
                                        typeof data.objInfoEmpresa
                                            .btGrupoAsociativo === "boolean"
                                            ? data.objInfoEmpresa
                                                  .btGrupoAsociativo
                                            : "",
                                    strAsociacionUnidadProdIndividual:
                                        data.objInfoEmpresa
                                            .strAsociacionUnidadProdIndividual ||
                                        "",
                                },

                                objInfoAdicional: {
                                    ...data.objInfoAdicional,
                                },

                                arrInfoEmpresarioSec:
                                    data.arrEmpresarioSecundario || [],
                            });
                        }

                        setLoadingGetData(false);
                        setErrorGetData({ flag: false, msg: "" });
                    })
                    .catch((error) => {
                        setErrorGetData({ flag: true, msg: error.message });
                        setLoadingGetData(false);
                    });
            }

            getData();
        }
    }, [isEdit, intId]);

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
        >
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        color="inherit"
                        component={RouterLink}
                        to="/transforma"
                        className={classes.link}
                    >
                        <HomeIcon className={classes.icon} />
                        Inicio
                    </Link>

                    <Link
                        color="inherit"
                        component={RouterLink}
                        to="/transforma/asesor/empresario/read/all"
                        className={classes.link}
                    >
                        Empresarios
                    </Link>

                    <Typography color="textPrimary" className={classes.link}>
                        {isEdit ? "Edición" : "Registro"}
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Button
                    onClick={() => goBack()}
                    startIcon={<ChevronLeftIcon />}
                    size="small"
                    color="inherit"
                >
                    regresar
                </Button>
            </Grid>

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
                                                ? "EDITAR PERSONA INICIATIVA"
                                                : "REGISTRAR PERSONA INICIATIVA"}
                                        </Typography>
                                    </Box>

                                    {/* <Box>
                                        <IconButton color="secondary" size="large">
                                            <Tooltip title="Importar información">
                                                <SvgIcon>
                                                    <path
                                                        id="icons8_microsoft_excel"
                                                        d="M14.5,3,2,5.556V23.444L14.5,26ZM17,5.556V8.111h2.5v2.556H17v2.556h2.5v2.556H17v2.556h2.5v2.556H17v2.556h8.75A1.265,1.265,0,0,0,27,22.167V6.833a1.265,1.265,0,0,0-1.25-1.278Zm5,2.556h2.5v2.556H22ZM4.72,9.768H6.941L8.1,12.6a5.7,5.7,0,0,1,.237.8h.032a8.475,8.475,0,0,1,.251-.826L9.9,9.768h2.026L9.51,14.458,12,19.232H9.839L8.448,16.147a2.67,2.67,0,0,1-.166-.631h-.02c-.031.146-.094.364-.188.656l-1.4,3.06H4.5L7.076,14.5ZM22,13.222h2.5v2.556H22Zm0,5.111h2.5v2.556H22Z"
                                                        transform="translate(-2 -3)"
                                                    />
                                                </SvgIcon>
                                            </Tooltip>
                                        </IconButton>
                                    </Box> */}
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
                                <InfoEmpresarioPr
                                    control={control}
                                    values={data.objInfoEmpresarioPr}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    isEdit={isEdit}
                                />
                            </Grid>
                            {/* 
                            <Grid item xs={12}>
                                <InfoEmpresarioSec
                                    control={control}
                                    disabled={loading}
                                    values={data.arrInfoEmpresarioSec}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid> */}

                            <Grid item xs={12}>
                                <InfoEmpresa
                                    control={control}
                                    disabled={loading}
                                    values={data.objInfoEmpresa}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    isEdit={isEdit}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoAdicional
                                    control={control}
                                    disabled={loading}
                                    values={data.objInfoAdicional}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    isEdit={isEdit}
                                />
                            </Grid>

                            {(errors.objInfoPrincipal ||
                                errors.objInfoEmpresarioPr ||
                                errors.arrInfoEmpresarioSec ||
                                errors.objInfoEmpresa ||
                                errors.objInfoAdicional) && (
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

export default CUEmpresario;
