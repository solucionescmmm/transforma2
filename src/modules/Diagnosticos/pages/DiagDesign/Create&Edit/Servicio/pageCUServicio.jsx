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
import useGetDiagnServ from "../../../../hooks/useGetDiagnServ";

//Librerias
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
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Componentes
import Loader from "../../../../../../common/components/Loader";
import PageError from "../../../../../../common/components/Error";
import InfoGeneral from "./infoGeneral";
import InfoEvaluacion from "./infoEvaluacion";
import InfoAdicional from "./infoAdicional";
import InfoNormatividad from "./infoNormatividad";
import ModalFinalizacion from "./components/modalFinalizacion";
import ModalDelete from "./components/modalDelete";

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

const PageCUServicio = ({
    isEdit,
    isPreview,
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
        objInfoEvaluacion: {},
        objInfoNormatividad: {},
        objInfoAdicional: {},
    });

    const [openModal, setOpenModal] = useState(false);
    const [openModalFinalizacion, setOpenModalFinalizacion] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [loading, setLoading] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

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

    const { getUniqueData } = useGetEmpresarios({
        autoLoad: false,
        intIdIdea,
    });

    const { getUniqueData: getUniqueDataServ } = useGetDiagnServ({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
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

            let objEmprPrincipal

            if (data.objEmpresario) {
                objEmprPrincipal = data?.objEmpresario?.find(
                    (emp) => emp.strTipoEmpresario === "Principal"
                );
            }

            setFlagSubmit(false);

            await axios(
                {
                    method: isEdit ? "PUT" : "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${isEdit
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
                                    intIdEmpresario: objEmprPrincipal ? objEmprPrincipal.intId : null,
                                    intIdTipoEmpresario: objEmprPrincipal ? objEmprPrincipal.intIdTipoEmpresario : null,
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
                                    dtmActualizacion: data.objInfoGeneral
                                        .dtmActualizacion
                                        ? format(
                                            data.objInfoGeneral
                                                .dtmActualizacion,
                                            "yyyy-MM-dd hh:mm:ss"
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
                    onChangeRoute("DiagDesign", {
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

    const handlerOpenModalFinalizacion = () => {
        setOpenModalFinalizacion(!openModalFinalizacion);
    };

    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (intIdIdea) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetDataEmpresario
                    .current({ intIdIdea })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data?.data?.[0]) {
                            const data = res.data.data?.[0];

                            setData({
                                ...data,
                                objEmpresario: data.objEmpresario
                            });
                        }
                        
                        setErrorGetData({ flag: false, msg: "" });
                    })
                    .catch((error) => {
                        setErrorGetData({
                            flag: true,
                            msg: error.message,
                        });
                    });

                await refFntGetDataServ
                    .current({
                        intIdIdea,
                        intIdDiagnostico,
                    })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data?.data) {
                            if (!isEdit && !isPreview) {
                                setFinalizado(
                                    res.data.data[0].objInfoGeneral.btFinalizado
                                );
                                setOpenModal(true);
                            } else {
                                const data = res.data.data[0];

                                setData({
                                    ...data,
                                    objInfoGeneral: {
                                        ...data.objInfoGeneral,
                                        intIdIdea,
                                        intIdDiagnostico,
                                        dtmFechaSesion: data.objInfoGeneral
                                            .dtmFechaSesion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmFechaSesion
                                            )
                                            : null,
                                        dtmActualizacion: data.objInfoGeneral
                                            .dtmActualizacion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmActualizacion
                                            )
                                            : null,
                                    },
                                });
                                reset({
                                    ...data,
                                    objInfoGeneral: {
                                        ...data.objInfoGeneral,
                                        intIdIdea,
                                        intIdDiagnostico,
                                        dtmFechaSesion: data.objInfoGeneral
                                            .dtmFechaSesion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmFechaSesion
                                            )
                                            : null,
                                        dtmActualizacion: data.objInfoGeneral
                                            .dtmActualizacion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmActualizacion
                                            )
                                            : null,
                                    },
                                });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, intIdIdea, intIdDiagnostico]);

    useEffect(() => {
        if (isEdit) {
            setOpenModal(false);
        }
    }, [isEdit]);

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

            <ModalFinalizacion
                handleOpenDialog={handlerOpenModalFinalizacion}
                open={openModalFinalizacion}
                intIdDiagnostico={intIdDiagnostico}
                intIdIdea={intIdIdea}
                onChangeRoute={onChangeRoute}
            />

            <ModalDelete
                handleOpenDialog={handlerOpenModalDelete}
                open={openModalDelete}
                intIdDiagnostico={intIdDiagnostico}
                intIdIdea={intIdIdea}
                onChangeRoute={onChangeRoute}
            />

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
                        la información o previsualizar la información?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="inherit"
                        onClick={() => {
                            onChangeRoute("DiagDesignServRead", {
                                intIdIdea,
                                intIdDiagnostico,
                            });
                        }}
                    >
                        ver detalle
                    </Button>

                    <Button
                        disabled={finalizado}
                        onClick={() => {
                            onChangeRoute("DiagDesignServEdit", {
                                intIdIdea,
                                intIdDiagnostico,
                            });
                        }}
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
                                                    ? "editar diagnóstico de servicios" :
                                                    isPreview ? "previsualizar diagnóstico de servicios"
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
                                        disabled={isPreview ? true : loading}
                                        values={data.objInfoGeneral}
                                        errors={errors}
                                        isEdit={isEdit}
                                        intIdIdea={intIdIdea}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoEvaluacion
                                        control={control}
                                        disabled={isPreview ? true : loading}
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
                                        disabled={isPreview ? true : loading}
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
                                        disabled={isPreview ? true : loading}
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

                                {isPreview ? null : (
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: isEdit ? "row" : "row-reverse",
                                            }}
                                        >
                                            {
                                                isEdit ? (
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <LoadingButton
                                                            variant="text"
                                                            loading={loading}
                                                            color="error"
                                                            onClick={() =>
                                                                handlerOpenModalDelete()
                                                            }>
                                                            Borrar diagnóstico
                                                        </LoadingButton>
                                                    </Box>
                                                ) : null
                                            }
                                            {
                                                isEdit ? (
                                                    <LoadingButton
                                                        variant="contained"
                                                        loading={loading}
                                                        onClick={() =>
                                                            handlerOpenModalFinalizacion()
                                                        }
                                                        style={{
                                                            marginLeft: 15
                                                        }}>
                                                        Finalizar
                                                    </LoadingButton>
                                                ) : null
                                            }
                                            <LoadingButton
                                                variant="contained"
                                                type="submit"
                                                loading={loading}
                                                sx={{ marginLeft: "15px" }}
                                            >
                                                {isEdit ? "guardar" : "registrar"}
                                            </LoadingButton>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
};

export default PageCUServicio;
