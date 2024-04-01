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
import ModalFinalizacion from "./components/modalFinalizacion";
import ModalDelete from "./components/modalDelete";

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
        objInfoComMercadeo: {},
        objInfoComProductivo: {},
        objInfoComFinanciero: {},
        objInfoComAdministrativo: {},
        objInfoComAsociativo: {},
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

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false, intIdIdea });

    const { getUniqueData: getUniqueDataTecn } = useGetDiagnTecn({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    const refFntGetData = useRef(getUniqueData);
    const refFntGetDataTecn = useRef(getUniqueDataTecn);

    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                await refFntGetData
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
                        setErrorGetData({ flag: true, msg: error.message });
                        setLoadingGetData(false);
                    });

                await refFntGetDataTecn
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
                                const data = res.data.data[0]

                                reset({
                                    ...data,
                                    objInfoGeneral: {
                                        ...data.objInfoGeneral,
                                        dtmFechaSesion:
                                            parseISO(
                                                data.objInfoGeneral
                                                    .dtmFechaSesion
                                            ) || null,
                                        dtmActualizacion:
                                            parseISO(
                                                data.objInfoGeneral
                                                    .dtmActualizacion
                                            ) || null,
                                    },
                                });

                                setData({
                                    ...data,
                                    objInfoGeneral: {
                                        ...data.objInfoGeneral,
                                        dtmFechaSesion:
                                            parseISO(
                                                data.objInfoGeneral
                                                    .dtmFechaSesion
                                            ) || null,
                                        dtmActualizacion:
                                            parseISO(
                                                data.objInfoGeneral
                                                    .dtmActualizacion
                                            ) || null,
                                    },
                                });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intIdIdea, intIdDiagnostico, isEdit]);

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
                        un registro del diagnóstico técnico. ¿Deseas editar la
                        información o previsualizar la información?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        color="inherit"
                        onClick={() =>
                            onChangeRoute("DiagEmpresarialTecRead", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
                    >
                        ver detalle
                    </Button>

                    <Button
                        color="success"
                        disabled={finalizado}
                        onClick={() =>
                            onChangeRoute("DiagEmpresarialTecEdit", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
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
                                                    ? "editar diagnóstico de competencias técnicas" :
                                                    isPreview ? "Previsualizar diagnóstico de competencias técnicas"
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
                                        disabled={isPreview ? true : loading}
                                        values={data.objInfoGeneral}
                                        errors={errors}
                                        intIdIdea={intIdIdea}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoComMercadeo
                                        control={control}
                                        disabled={isPreview ? true : loading}
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
                                        disabled={isPreview ? true : loading}
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
                                        disabled={isPreview ? true : loading}
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
                                        disabled={isPreview ? true : loading}
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
                                        disabled={isPreview ? true : loading}
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

                                {isPreview ? null :(
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

export default PageCUGeneral;
