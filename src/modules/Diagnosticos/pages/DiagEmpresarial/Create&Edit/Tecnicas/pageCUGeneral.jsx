import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    useCallback,
} from "react";

//Context
import { AuthContext } from "../../../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";

//Librerias
import { Link as RouterLink } from "react-router-dom";
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    useMediaQuery,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Componentes
import Loader from "../../../../../../common/components/Loader";
import PageError from "../../../../../../common/components/Error";
import InfoGeneral from "./infoGeneral";
import InfoComMercadeo from "./infoComMercadeo";
import InfoComProductivo from "./infoComProductivo";
import InfoComFinanciero from "./infoComFinanciero";
import InfoComAdministrativo from "./infoComAdministrativo";
import InfoComAsociativo from "./infoComAsociativo";

//Estilos
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";
import useGetDiagnTecn from "../../../../hooks/useGetDiagnTecnico";

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

const PageCUGeneral = ({
    intId,
    isEdit,
    intIdIdea,
    intIdDiagnostico,
    onChangeRoute,
}) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoGeneral: {},
        objInfoComMercadeo: {},
        objInfoComProductivo: {},
        objInfoComFinanciero: {},
        objInfoComAdministrativo: {},
        objInfoComAsociativo: {},
    });

    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

    const { getUniqueData: getUniqueDataTecn } = useGetDiagnTecn({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    const refFntGetData = useRef(getUniqueData);
    const refFntGetDataTecn = useRef(getUniqueDataTecn);

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
                                  .REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_UPDATETECNICO
                            : process.env
                                  .REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_SETTECNICO
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                objInfoGeneral: {
                                    ...data.objInfoGeneral,
                                    intIdIdea,
                                    intIdDiagnostico,
                                    dtmFechaSesion: data.objInfoGeneral
                                        .dtmFechaSesion
                                        ? format(
                                              data.objInfoGeneral
                                                  .dtmFechaSesion,
                                              "yyyy-MM-dd hh:mm:ss"
                                          )
                                        : null,
                                    dtFechaExpedicionDocto: data.objInfoGeneral
                                        .dtFechaExpedicionDocto
                                        ? format(
                                              data.objInfoGeneral
                                                  .dtFechaExpedicionDocto,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    dtFechaNacimiento: data.objInfoGeneral
                                        .dtFechaNacimiento
                                        ? format(
                                              data.objInfoGeneral
                                                  .dtFechaNacimiento,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                },
                                objInfoComMercadeo: {
                                    ...data.objInfoComMercadeo,
                                },
                                objInfoComProductivo: {
                                    ...data.objInfoComProductivo,
                                },
                                objInfoComFinanciero: {
                                    ...data.objInfoComFinanciero,
                                },
                                objInfoComAdministrativo: {
                                    ...data.objInfoComAdministrativo,
                                },
                                objInfoComAsociativo: {
                                    ...data.objInfoComAsociativo,
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
                    onChangeRoute("DiagEmpresarial", {
                        intIdIdea,
                        intIdDiagnostico,
                    });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token, data, isEdit, intIdIdea, intIdDiagnostico]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (intId) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData
                    .current({ intId, intIdIdea })
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
                                        data.objEmpresario.dtmFechaSesion ||
                                        null,
                                    strLugarSesion:
                                        data.objEmpresario.strLugarSesion || "",
                                    strUsuarioCreacion:
                                        data.objEmpresario.strUsuarioCreacion ||
                                        "",
                                    dtActualizacion:
                                        data.objEmpresario.dtActualizacion ||
                                        null,
                                    strUsuarioActualizacion:
                                        data.objEmpresario
                                            .strUsuarioActualizacion || "",
                                    strNombres:
                                        data.objEmpresario.strNombres || "",
                                    strApellidos:
                                        data.objEmpresario.strApellidos || "",
                                    strTipoDocto:
                                        data.objEmpresario.strTipoDocto || "",
                                    strNroDocto:
                                        data.objEmpresario.strNroDocto || "",
                                    strLugarExpedicionDocto:
                                        data.objEmpresario
                                            .strLugarExpedicionDocto || "",
                                    dtFechaExpedicionDocto: data.objEmpresario
                                        .dtFechaExpedicionDocto
                                        ? parseISO(
                                              data.objEmpresario
                                                  .dtFechaExpedicionDocto
                                          )
                                        : null,
                                    dtFechaNacimiento: data.objEmpresario
                                        .dtFechaNacimiento
                                        ? parseISO(
                                              data.objEmpresario
                                                  .dtFechaNacimiento
                                          )
                                        : null,
                                    strGenero:
                                        data.objEmpresario.strGenero || "",
                                    strNivelEducativo:
                                        data.objEmpresario.strNivelEducativo ||
                                        "",
                                    strTitulos:
                                        data.objEmpresario.strTitulos || "",
                                    strEstrato:
                                        data.objEmpresario.strEstrato || "",
                                    arrDepartamento:
                                        data.objEmpresario.arrDepartamento ||
                                        [],
                                    arrCiudad:
                                        data.objEmpresario.arrCiudad || [],
                                    strDireccionResidencia:
                                        data.objEmpresario
                                            .strDireccionResidencia || "",
                                    strBarrio:
                                        data.objEmpresario.strBarrio || "",
                                    strUbicacionVivienda:
                                        data.objEmpresario
                                            .strUbicacionVivienda || "",
                                    strCelular1:
                                        data.objEmpresario.strCelular1 || "",
                                    strCelular2:
                                        data.objEmpresario.strCelular2 || "",
                                    strCorreoElectronico1:
                                        data.objEmpresario
                                            .strCorreoElectronico1 || "",
                                    strCorreoElectronico2:
                                        data.objEmpresario
                                            .strCorreoElectronico2 || "",
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

                await refFntGetDataTecn
                    .current({
                        intIdEmpresario: intId,
                        intIdIdea,
                        intIdDiagnostico,
                    })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data?.data) {
                            let data = res.data.data[0];

                            setData((prevState) => ({
                                ...prevState,
                                ...data,
                            }));

                            if (!isEdit) {
                                setOpenModal(true);
                            }
                        }

                        setErrorGetData({ flag: false, msg: "" });

                        setLoadingGetData(false);
                    })
                    .catch((error) => {
                        setErrorGetData({
                            flag: true,
                            msg: error.message,
                        });

                        setLoadingGetData(false);
                    });
            }

            getData();
        }
    }, [intId, intIdIdea, intIdDiagnostico, isEdit]);

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
        <div style={{ marginTop: "25px", width: "100%" }}>
            <Dialog
                open={openModal}
                disableEscapeKeyDown
                fullScreen={bitMobile}
            >
                <DialogTitle>Aviso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Se ha detectado que la persona empresaria ya cuenta con
                        un registro del diagnóstico técnico. ¿Deseas editar la
                        información o previsualizar el resumen?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        component={RouterLink}
                        to={`/diagnosticos/diagEmpresarial/humanas/read/${data.objInfoGeneral?.intId}`}
                        color="inherit"
                    >
                        ver resumen
                    </Button>

                    <Button
                        component={RouterLink}
                        to={`/diagnosticos/diagEmpresarial/humanas/edit/`}
                    >
                        editar
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid
                container
                direction="row"
                spacing={3}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
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
                                                    ? "editar diagnóstico de competencias técnicas"
                                                    : "registrar diagnóstico de competencias técnicas"}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        Todos los campos marcados con (*) son
                                        obligatorios.
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

                                <Grid item xs={12}>
                                    <InfoComMercadeo
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoComMercadeo}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoComProductivo
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoComProductivo}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoComFinanciero
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoComFinanciero}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoComAdministrativo
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoComAdministrativo}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoComAsociativo
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoComAsociativo}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                {errors.objInfoGeneral && (
                                    <Grid item xs={12}>
                                        <Alert severity="error">
                                            Lo sentimos, tienes campos
                                            pendientes por diligenciar en el
                                            formulario, revisa e intentalo
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
        </div>
    );
};

export default PageCUGeneral;
