import React, { useState, useContext, useEffect, useRef, useCallback } from "react";

//Context
import { AuthContext } from "../../../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";

//Librerias
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format, parseISO } from "date-fns";

// Componentes de MUI
import {
    Grid,
    Button,
    Container,
    Paper,
    LinearProgress,
    Box,
    Typography,
    Alert,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos de Material UI
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material/";

//Componentes
import Loader from "../../../../../../common/components/Loader";
import PageError from "../../../../../../common/components/Error";
import InfoGeneral from "./infoGeneral";

//Estilos
import { makeStyles } from "@mui/styles";

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

const PageCUServicio = ({ intId, isEdit }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoGeneral: {},
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
                            ? process.env.REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_SETGENERAL
                            : process.env.REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_SETGENERAL
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                objInfoGeneral: {
                                    ...data.objInfoGeneral,
                                    dtmFechaSesion: data.objInfoGeneral.dtmFechaSesion
                                        ? format(
                                              data.objInfoGeneral.dtmFechaSesion,
                                              "yyyy-MM-dd hh:mm:ss"
                                          )
                                        : null,
                                    dtFechaExpedicionDocto: data.objInfoGeneral
                                        .dtFechaExpedicionDocto
                                        ? format(
                                              data.objInfoGeneral.dtFechaExpedicionDocto,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    dtFechaNacimiento: data.objInfoGeneral
                                        .dtFechaNacimiento
                                        ? format(
                                              data.objInfoGeneral.dtFechaNacimiento,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
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
        if (intId) {
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

                            setData({
                                objInfoGeneral: {
                                    intId: data.objEmpresario.intId || null,
                                    dtmFechaSesion:
                                        data.objEmpresario.dtmFechaSesion || null,
                                    strLugarSesion:
                                        data.objEmpresario.strLugarSesion || "",
                                    strUsuarioCreacion:
                                        data.objEmpresario.strUsuarioCreacion || "",
                                    dtActualizacion:
                                        data.objEmpresario.dtActualizacion || null,
                                    strUsuarioActualizacion:
                                        data.objEmpresario.strUsuarioActualizacion || "",
                                    strNombres: data.objEmpresario.strNombres || "",
                                    strApellidos: data.objEmpresario.strApellidos || "",
                                    strTipoDocto: data.objEmpresario.strTipoDocto || "",
                                    strNroDocto: data.objEmpresario.strNroDocto || "",
                                    strLugarExpedicionDocto:
                                        data.objEmpresario.strLugarExpedicionDocto || "",
                                    dtFechaExpedicionDocto: data.objEmpresario
                                        .dtFechaExpedicionDocto
                                        ? parseISO(
                                              data.objEmpresario.dtFechaExpedicionDocto
                                          )
                                        : null,
                                    dtFechaNacimiento: data.objEmpresario
                                        .dtFechaNacimiento
                                        ? parseISO(data.objEmpresario.dtFechaNacimiento)
                                        : null,
                                    strGenero: data.objEmpresario.strGenero || "",
                                    strNivelEducativo:
                                        data.objEmpresario.strNivelEducativo || "",
                                    strTitulos: data.objEmpresario.strTitulos || "",
                                    strEstrato: data.objEmpresario.strEstrato || "",
                                    arrDepartamento:
                                        data.objEmpresario.arrDepartamento || [],
                                    arrCiudad: data.objEmpresario.arrCiudad || [],
                                    strDireccionResidencia:
                                        data.objEmpresario.strDireccionResidencia || "",
                                    strBarrio: data.objEmpresario.strBarrio || "",
                                    strUbicacionVivienda:
                                        data.objEmpresario.strUbicacionVivienda || "",
                                    strCelular1: data.objEmpresario.strCelular1 || "",
                                    strCelular2: data.objEmpresario.strCelular2 || "",
                                    strCorreoElectronico1:
                                        data.objEmpresario.strCorreoElectronico1 || "",
                                    strCorreoElectronico2:
                                        data.objEmpresario.strCorreoElectronico2 || "",
                                },
                                objInfoEmprendimiento: {
                                    strUnidadProductiva:
                                        data.objInfoEmpresa.strNombreMarca,
                                    strLugarOperacion:
                                        data.objInfoEmpresa.strLugarOperacion,
                                    arrDepartamento: data.objInfoEmpresa.arrDepartamento,
                                    arrCiudad: data.objInfoEmpresa.arrCiudad,
                                    strBarrio: data.objInfoEmpresa.strBarrio,
                                    strDireccionResidencia:
                                        data.objInfoEmpresa.strDireccionResidencia,
                                    arrMediosDigitales:
                                        data.objInfoEmpresa.arrMediosDigitales || [],
                                    strTiempoDedicacion:
                                        data.objInfoEmpresa.strTiempoDedicacion || "",
                                    strSectorEconomico:
                                        data.objInfoEmpresa.strSectorEconomico || "",
                                    strCategoriaProducto:
                                        data.objInfoEmpresa.strCategoriaProducto || "",
                                    strCategoriaServicio:
                                        data.objInfoEmpresa.strCategoriaServicio || "",
                                    arrCategoriasSecundarias:
                                        data.objInfoEmpresa.arrCategoriasSecundarias ||
                                        [],
                                    strOtraCategoria:
                                        data.objInfoEmpresa.strOtraCategoria || "",
                                    btGeneraEmpleo:
                                        typeof data.objInfoEmpresa.btGeneraEmpleo ===
                                        "boolean"
                                            ? data.objInfoEmpresa.btGeneraEmpleo
                                            : "",
                                },
                                objInfoPerfilEco: {
                                    intNumeroEmpleados:
                                        data.objInfoEmpresa.intNumeroEmpleados || "",
                                    dblValorVentasMes:
                                        data.objInfoEmpresa.valorVentasMes || "",
                                },
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
    }, [intId]);

    useEffect(() => {
        if (intId) {
            reset(data);
        }
    }, [data, reset, intId]);

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
        return <Redirect to="/diagnosticos/diagEmpresarial" />;
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
                <Button
                    component={RouterLink}
                    to={`/diagnosticos/diagDesign/`}
                    startIcon={<ChevronLeftIcon />}
                    size="small"
                    color="inherit"
                >
                    Regresar
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Container className={classes.containerPR}>
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
                                <Grid
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
                                            style={{
                                                fontWeight: "bold",
                                                textTransform: "uppercase",
                                            }}
                                            color="primary"
                                            variant="body1"
                                        >
                                            {isEdit
                                                ? "editar diagnóstico de producto"
                                                : "registrar diagnóstico de producto"}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    Todos los campos marcados con (*) son obligatorios.
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <InfoGeneral
                                    control={control}
                                    disabled={loading}
                                    values={data.objInfoGeneral}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

                            {errors.objInfoGeneral && (
                                <Grid item xs={12}>
                                    <Alert severity="error">
                                        Lo sentimos, tienes campos pendientes por
                                        diligenciar en el formulario, revisa e intentalo
                                        nuevamente.
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

export default PageCUServicio;
