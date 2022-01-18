import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    useCallback,
    Fragment,
} from "react";

//Context
import { AuthContext } from "../../../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";
import useGetDiagnServ from "../../../../hooks/useGetDiagnServ";

//Librerias
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";

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
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos de Material UI
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material/";

//Componentes
import Loader from "../../../../../../common/components/Loader";
import PageError from "../../../../../../common/components/Error";
import InfoGeneral from "./infoGeneral";
import InfoEvaluacion from "./infoEvaluacion";
import InfoAdicional from "./infoAdicional";
import InfoNormatividad from "./infoNormatividad";

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
        objInfoEvaluacion: {},
        objInfoNormatividad: {},
        objInfoAdicional: {},
    });

    const [openModal, setOpenModal] = useState(false);

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

    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false });

    const { getUniqueData: getUniqueDataServ } = useGetDiagnServ({
        autoLoad: false,
    });

    const refFntGetDataEmpresario = useRef(getUniqueData);
    const refFntGetDataServ = useRef(getUniqueDataServ);

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
                                  .REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_UPDATESERVICIO
                            : process.env
                                  .REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_SETSERVICIO
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                objInfoGeneral: {
                                    ...data.objInfoGeneral,
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
                                objInfoEvaluacion: {
                                    ...data.objInfoEvaluacion,
                                },
                                objInfoNormatividad: {
                                    ...data.objInfoNormatividad,
                                },
                                objInfoAdicional: {
                                    ...data.objInfoAdicional,
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
                await refFntGetDataEmpresario
                    .current({ intId })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data) {
                            let data = res.data.data[0];

                            setData((prevState) => ({
                                ...prevState,
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
                                },
                            }));
                        }

                        setErrorGetData({ flag: false, msg: "" });
                    })
                    .catch((error) => {
                        setErrorGetData({ flag: true, msg: error.message });
                    });

                await refFntGetDataServ
                    .current({ intIdEmpresario: intId })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data) {
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
                    })
                    .catch((error) => {
                        setErrorGetData({
                            flag: true,
                            msg: error.message,
                        });
                    });

                setLoadingGetData(false);
            }

            getData();
        }
    }, [intId, isEdit]);

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
        <Fragment>
            <Dialog
                open={openModal}
                disableEscapeKeyDown
                fullScreen={bitMobile}
            >
                <DialogTitle>Aviso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Se ha detectado que la persona empresaria ya cuenta con
                        un registro del diagnóstico de servicio. ¿Deseas editar
                        la información o previsualizar el resumen?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        component={RouterLink}
                        to={`/diagnosticos/diagDesign/service/read/${data.objInfoGeneral?.intId}`}
                        color="inherit"
                    >
                        ver resumen
                    </Button>

                    <Button
                        component={RouterLink}
                        to={`/diagnosticos/diagDesign/service/edit`}
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
                                                    ? "editar diagnóstico de servicios"
                                                    : "registrar diagnóstico de servicios"}
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
                                    <InfoEvaluacion
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoEvaluacion}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoNormatividad
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoNormatividad}
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
                                        values={data.objInfoAdicional}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                {(errors.objInfoGeneral ||
                                    errors.objInfoEvaluacion ||
                                    errors.objInfoNormatividad ||
                                    errors.objInfoAdicional) && (
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
                                            sx={{ marginLeft: "15px" }}
                                        >
                                            {isEdit ? "guardar" : "registrar"}
                                        </LoadingButton>

                                        <Button
                                            variant="contained"
                                            color="inherit"
                                        >
                                            Mostrar resultados
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default PageCUServicio;
