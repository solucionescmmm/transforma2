import { useCallback, useContext, useEffect, useState } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

// Librerias
import axios from "axios";
import toast from "react-hot-toast";
import { Redirect, useParams, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

//Estilos
import { makeStyles } from "@mui/styles";

// Mui
import {
    Alert,
    Box,
    Breadcrumbs,
    Container,
    Grid,
    LinearProgress,
    Link,
    Paper,
    Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";

// Componentes
import PageError from "../../../../../common/components/Error";
import Loader from "../../../../../common/components/Loader";
import InfoPrincipal from "./infoPrincipal";
import InfoModulos from "./infoModulos";
import InfoSedesTarifa from "./infoSedesTarifa";
import InfoResponsables from "./infoResponsables";
import InfoAtributo from "./infoAtributos";

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

const CreateEdit = ({ isEdit }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {},
        arrAtributos: [],
        arrModulos: [],
        arrSedesTarifas: [],
        arrResponsables: [],
    });

    const [bitModulo, setBitModulo] = useState(false);

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [objTipoServicio, setObjTipoServicio] = useState();

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

    const handleChangeTipoServicio = (data) => {
        console.log(data);
        setObjTipoServicio(data);
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
                        to="/transforma/admin/"
                        className={classes.link}
                    >
                        Administración
                    </Link>

                    <Typography color="textPrimary" className={classes.link}>
                        {isEdit ? "Editar servicio" : "Registrar servicio"}
                    </Typography>
                </Breadcrumbs>
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
                                                ? "EDITAR SERVICIO"
                                                : "REGISTRAR SERVICIO"}
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
                                    onChangeModules={setBitModulo}
                                    onChangeTipoServicio={
                                        handleChangeTipoServicio
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoAtributo
                                    control={control}
                                    values={objTipoServicio?.arrAtributos}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

                            {bitModulo && (
                                <Grid item xs={12}>
                                    <InfoModulos
                                        control={control}
                                        values={data.arrModulos}
                                        disabled={loading}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <InfoSedesTarifa
                                    control={control}
                                    values={data.arrModulos}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoResponsables
                                    control={control}
                                    values={data.arrModulos}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

                            {(errors.objInfoPrincipal ||
                                errors.arrModulos ||
                                errors.arrSedesTarifas ||
                                errors.arrResponsables) && (
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

export default CreateEdit;
