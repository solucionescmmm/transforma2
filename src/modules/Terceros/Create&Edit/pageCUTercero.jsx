/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useCallback,
    useEffect,
    useContext,
    useRef,
} from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Hooks
import { useHistory } from "react-router-dom";

//Librerias
import { Link as RouterLink, Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

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
import Loader from "../../../common/components/Loader";
import PageError from "../../../common/components/Error";
import useGetTerceros from "../hook/useGetTerceros";

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

const CUTercero = ({ isEdit, values, resetSearch }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {},
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

    const { getUniqueData } = useGetTerceros({ autoLoad: false });

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
                                  .REACT_APP_API_TRANSFORMA_TERCEROS_UPDATE
                            : process.env.REACT_APP_API_TRANSFORMA_TERCEROS_SET
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                intIdIdea: data.intIdIdea,
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

                            setData({
                                objInfoPrincipal: {
                                    ...data,
                                    strCorreoElectronico1:
                                        data.strCorreoElectronico,
                                    strCelular1: data.strCelular,
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
    }, [isEdit, intId]);

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
        return <Redirect to="/transforma/asesor/terceros/read/all" />;
    }

    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos de la persona seleccionada, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    if (data?.error) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos de la persona seleccionada, por favor escala al área de TI para más información."
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
                        to="/transforma/asesor/terceros/read/all"
                        className={classes.link}
                    >
                        Terceros
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
                                                ? "EDITAR PERSONA EXTERNA"
                                                : "REGISTRAR PERSONA EXTERNA"}
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

                            {errors.objInfoPrincipal && (
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

                                    <Button onClick={() => resetSearch(false)}>
                                        Nueva busqueda
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

export default CUTercero;
