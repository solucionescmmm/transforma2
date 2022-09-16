import { useCallback, useContext, useEffect, useRef, useState } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

// Hooks
import useGetPaquetes from "../../../hooks/useGetPaquetes";

// Librerias
import axios from "axios";
import toast from "react-hot-toast";
import { Redirect, useParams, Link as RouterLink } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";

//Estilos
import { makeStyles } from "@mui/styles";

// Mui
import {
    Alert,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Grid,
    LinearProgress,
    Link,
    Paper,
    Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos
import {
    Home as HomeIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

// Componentes
import PageError from "../../../../../common/components/Error";
import Loader from "../../../../../common/components/Loader";
import InfoPrincipal from "./infoPrincipal";
import InfoSedesTarifa from "./infoSedesTarifa";
import InfoResponsables from "./infoResponsables";
import shortid from "shortid";

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

const CreateEdit = ({ isEdit, isPreview }) => {
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
        getValues,
        watch,
    } = useForm({ mode: "onChange" });

    const {
        fields: arrST,
        append: apST,
        remove: rmST,
    } = useFieldArray({
        control,
        name: "arrSedesTarifas",
        keyName: "id",
    });

    const {
        fields: arrRE,
        append: apRE,
        remove: rmRE,
    } = useFieldArray({
        control,
        name: "arrResponsables",
        keyName: "id",
    });

    const { intId } = useParams();

    const { getUniqueData, data: dataPaquetes } = useGetPaquetes({
        autoLoad: true,
    });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onSubmit = (data) => {
        const arrSedesTarifas =
            data.arrSedesTarifas.filter((s) => s.intIdSede !== "") || [];

        const arrResponsables =
            data.arrResponsables.filter((r) => r.intIdArea !== "") || [];

        setData({
            ...data,
            arrSedesTarifas,
            arrResponsables,
        });

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
                                  .REACT_APP_API_TRANSFORMA_PAQUETES_UPDATE
                            : process.env.REACT_APP_API_TRANSFORMA_PAQUETES_SET
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
        if (isEdit || isPreview) {
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

                            const arrAtributos = data.arrAtributos;

                            if (arrAtributos) {
                                for (let i = 0; i < arrAtributos.length; i++) {
                                    arrAtributos[i].id = shortid.generate();
                                }
                            }

                            const arrSedesTarifas = data.arrSedesTarifas;

                            for (let i = 0; i < arrSedesTarifas.length; i++) {
                                arrSedesTarifas[i].id = shortid.generate();
                            }

                            const arrResponsables = data.arrResponsables;

                            for (let i = 0; i < arrResponsables.length; i++) {
                                arrResponsables[i].id = shortid.generate();
                            }

                            setData({
                                ...data,
                                arrAtributos: arrAtributos || [],
                                arrSedesTarifas,
                                arrResponsables,
                            });

                            reset({
                                ...data,
                                arrAtributos: arrAtributos || [],
                                arrSedesTarifas,
                                arrResponsables,
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
        // eslint-disable-next-line
    }, [isEdit, intId, isPreview]);

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
        return <Redirect to="/transforma/admin/paquetes/" />;
    }

    if (loadingGetData && typeof dataServicios !== "undefined") {
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
                        {isEdit
                            ? "Editar paquete"
                            : isPreview
                            ? "Previsualizar paquete"
                            : "Registrar paquete"}
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Button
                    component={RouterLink}
                    to={`/transforma/admin/paquetes/`}
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
                                                ? "EDITAR PAQUETE"
                                                : isPreview
                                                ? "PREVISUALIZAR PAQUETE"
                                                : "REGISTRAR PAQUETE"}
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
                                    isEdit={isEdit}
                                    isPreview={isPreview}
                                    control={control}
                                    values={data.objInfoPrincipal}
                                    disabled={isPreview ? true : loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    watch={watch}
                                    data={dataPaquetes}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoSedesTarifa
                                    isEdit={isEdit}
                                    control={control}
                                    values={data.arrModulos}
                                    disabled={isPreview ? true : loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    fields={arrST}
                                    append={apST}
                                    remove={rmST}
                                    isPreview={isPreview}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoResponsables
                                    isEdit={isEdit}
                                    control={control}
                                    values={data.arrModulos}
                                    disabled={isPreview ? true : loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    fields={arrRE}
                                    append={apRE}
                                    remove={rmRE}
                                    getValues={getValues}
                                    isPreview={isPreview}
                                />
                            </Grid>

                            {(errors.objInfoPrincipal ||
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
                                        disabled={isPreview}
                                    >
                                        {isEdit
                                            ? "guardar"
                                            : isPreview
                                            ? "No disponible"
                                            : "registrar"}
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
