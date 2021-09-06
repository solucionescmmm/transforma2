import React, { useState, useCallback, useEffect, useContext } from "react";

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";

//Librerias
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    IconButton,
    Tooltip,
    SvgIcon,
    LinearProgress,
} from "@material-ui/core";

import { LoadingButton } from "@material-ui/lab";

//Iconos
import { Home as HomeIcon } from "@material-ui/icons";

//Estilos
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/system";

//Componentes
import InfoPrincipal from "./infoPrincipal";
import InfoEmpresarioPr from "./infoEmpresarioPr";
import InfoEmpresarioSec from "./infoEmpresarioSec";
import InfoEmprendimiento from "./infoEmprendimiento";
import InfoEmpresa from "./infoEmpresa";
import InfoAdicional from "./infoAdicional";

const styles = makeStyles((theme) => ({
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

    //TODO: Se tiene que construir 4 objetos que tengan relacion con las siguientes tablas >
    /**
     * 1. tbl_Empresario
     * 2. tbl_EmpresarioSecundario
     * 3. tbl_InfoEmprendimiento
     * 4. tbl_InfoEmpresa
     */
    const [data, setData] = useState({
        objInfoPrincipal: {},
        objInfoEmpresarioPr: {},
        arrInfoEmpresarioSec: [],
        objInfoEmprendimiento: {},
        objInfoEmpresa: {},
        objInfoAdicional: {},
    });

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

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
                            : process.env.REACT_APP_API_TRANSFORMA_INTERESADOS_SETREGISTRO
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            //TODO: Realizar transformacion de datos.

                            /**
                             * El objeto seria el siguiente
                             *
                             * {
                             *    "objEmpresario",
                             *    "objEmpresarioSecundario",
                             *    "objInfoEmprendimiento",
                             *    "objInfoEmpresa"
                             * }
                             */

                            let newData = {
                                objEmpresario: {
                                    strNombres: data.objInfoEmpresarioPr.strNombres,
                                    strApellidos: data.objInfoEmpresarioPr.strApellidos,
                                    dtFechaNacimiento: data.objInfoEmpresarioPr
                                        .dtFechaNacimiento
                                        ? format(
                                              data.objInfoEmpresarioPr.dtFechaNacimiento,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strTipoDocto: data.objInfoEmpresarioPr.strTipoDocto,
                                    strNroDocto: data.objInfoEmpresarioPr.strNroDocto,
                                    strLugarExpedicionDocto:
                                        data.objInfoEmpresarioPr.strLugarExpedicionDocto,
                                    dtFechaExpedicionDocto: data.objInfoEmpresarioPr
                                        .dtFechaExpedicionDocto
                                        ? format(
                                              data.objInfoEmpresarioPr
                                                  .dtFechaExpedicionDocto,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strSexo: data.objInfoEmpresarioPr.strSexo,
                                    strCelular1: data.objInfoEmpresarioPr.strCelular1,
                                    strCelular2: data.objInfoEmpresarioPr.strCelular2,
                                    strCorreoElectronico1:
                                        data.objInfoEmpresarioPr.strCorreoElectronico1,
                                    strCorreoElectronico2:
                                        data.objInfoEmpresarioPr.strCorreoElectronico2,
                                    strNivelEducativo:
                                        data.objInfoEmpresarioPr.strNivelEducativo,
                                    strTitulos: data.objInfoEmpresarioPr.strTitulos,
                                    strCondicionDiscapacidad:
                                        data.objInfoEmpresarioPr.strCondicionDiscapacidad,
                                    strSede: data.objInfoPrincipal.strSede,
                                    strTipoEmpresario:
                                        data.objInfoPrincipal.strTipoEmpresario,
                                    dtFechaVinculacion: data.objInfoPrincipal
                                        .dtFechaVinculacion
                                        ? format(
                                              data.objInfoPrincipal.dtFechaVinculacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strEstado: data.objInfoPrincipal.strEstado,
                                    strUrlFoto: data.objInfoEmpresarioPr.strURLFileFoto,
                                    strEspacioJornada:
                                        data.objInfoPrincipal.strEspacioJornada,
                                },
                                arrEmpresarioSecundario: data.arrInfoEmpresarioSec,
                                objInfoEmprendimiento: {
                                    btTieneSoloIdea:
                                        data.objInfoEmprendimiento.btTieneSoloIdea,
                                    strPlaneaComenzar:
                                        data.objInfoEmprendimiento
                                            .strCuandoComienzaEmpresa,
                                    strTiempoDedicacion:
                                        data.objInfoEmprendimiento.strTiempoDedicacion,
                                    btGrupoAsociativo:
                                        data.objInfoEmprendimiento.btGrupoAsociativo,
                                    btAsociacionUnidadProdIndividual:
                                        data.objInfoEmprendimiento
                                            .btAsociacionUnidadProdIndividual,
                                    strProductosServicios:
                                        data.objInfoEmprendimiento.strProductosServicios,
                                    strMateriaPrima:
                                        data.objInfoEmprendimiento.strMateriaPrima,
                                    strNombreTecnica:
                                        data.objInfoEmprendimiento.strNombreTecnica,
                                },
                                objInfoEmpresa: {
                                    strUrlLogo: data.objInfoEmpresa.strURLFileLogoEmpresa,
                                    dtFechaFundacion: data.objInfoEmpresa.dtFechaFundacion
                                        ? format(
                                              data.objInfoEmpresa.dtFechaFundacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strUnidadProdOperacion:
                                        data.objInfoEmpresa.strUnidadProdOperacion,
                                    strDireccion: data.objInfoEmpresa.strDireccion,
                                    strMunicipio: data.objInfoEmpresa.strMunicipio,
                                    strBarrio: data.objInfoEmpresa.strBarrio,
                                    intEstrato: data.objInfoEmpresa.intEstrato,
                                    strCategoriaProducto:
                                        data.objInfoEmpresa.strCategoriaProducto,
                                    strOtraCategoriaProducto:
                                        data.objInfoEmpresa.strOtraCategoriaProducto,
                                    arrCategoriaServicio:
                                        data.objInfoEmpresa.arrCategoriaServicio,
                                    btGeneraEmpleo: data.objInfoEmpresa.btGeneraEmpleo,
                                    intNumeroEmpleados:
                                        data.objInfoEmpresa.intNumeroEmpleados,
                                    valorVentasMes: data.objInfoEmpresa.valorVentasMes,
                                    strMediosUtilizadosVentas:
                                        data.objInfoEmpresa.arrMediosUtilizadosVentas,
                                    btNombreMarca: data.objInfoAdicional.btNombreMarca,
                                    btLogotipo: data.objInfoAdicional.btLogotipo,
                                    btEtiquetaEmpaque:
                                        data.objInfoAdicional.btEtiquetaEmpaque,
                                    btMejorarEtiquetaEmpaque:
                                        data.objInfoAdicional.btMejorarEtiquetaEmpaque,
                                    strPrincipalesNecesidades:
                                        data.objInfoAdicional.strPrincipalesNecesidades,
                                    strRequisitoLey:
                                        data.objInfoAdicional.arrRequisitoLey,
                                    strOtrosRequisitos:
                                        data.objInfoAdicional.strOtrosRequisitos,
                                    btInteresadoProcesoCMM:
                                        data.objInfoAdicional.btInteresadoProcesoCMM,
                                    strTemasCapacitacion:
                                        data.objInfoAdicional.strTemasCapacitacion,
                                    strComoSeEntero:
                                        data.objInfoAdicional.arrComoSeEntero,
                                    strOtrosMediosEntero:
                                        data.objInfoAdicional.strOtrosMediosEntero,
                                    strMedioDeComunicacion:
                                        data.objInfoAdicional.arrMediosDeComunicacion,
                                    strOtroMedioComunicacion:
                                        data.objInfoAdicional.strOtroMedioComunicacion,
                                    btRecibirInfoCMM:
                                        data.objInfoAdicional.btRecibirInfoCMM,
                                    strRecomendaciones:
                                        data.objInfoAdicional.strRecomendaciones,
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
                <Paper className={classes.paper}>
                    {loading ? (
                        <LinearProgress className={classes.linearProgress} />
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
                                    >
                                        {isEdit
                                            ? "Editar Empresario"
                                            : "Registrar Empresario"}
                                    </Typography>
                                </Box>

                                <Box>
                                    <IconButton color="secondary">
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
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="caption">
                                Todos los campos marcados con (*) son obligatorios.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <InfoPrincipal
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmpresarioPr
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmpresarioSec
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmprendimiento
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmpresa
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoAdicional
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                                clearErrors={clearErrors}
                            />
                        </Grid>

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
            </Grid>
        </Grid>
    );
};

export default CUEmpresario;
