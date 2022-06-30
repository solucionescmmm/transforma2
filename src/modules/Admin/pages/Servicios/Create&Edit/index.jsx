import { useCallback, useContext, useEffect, useRef, useState } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

// Hooks
import useGetServicios from "../../../hooks/useGetServicios";

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
        getValues,
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

    const { fields: arrAT, append: apAT } = useFieldArray({
        control,
        name: "arrAtributos",
        keyName: "id",
    });

    const {
        fields: arrMO,
        append: apMO,
        remove: rmMO,
    } = useFieldArray({
        control,
        name: "arrModulos",
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

    const { getUniqueData, data: dataServicios } = useGetServicios({
        autoLoad: true,
    });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onSubmit = (data) => {
        const arrModulos =
            data.arrModulos.filter((m) => m.intHoras !== "") || [];

        const arrSedesTarifas =
            data.arrSedesTarifas.filter((s) => s.intIdSede !== "") || [];

        const arrResponsables =
            data.arrResponsables.filter((r) => r.intIdArea !== "") || [];

        setData({
            ...data,
            arrModulos,
            arrSedesTarifas,
            arrResponsables,
        });

        setFlagSubmit(true);
    };

    const handleChangeTipoServicio = (data) => {
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
                                  .REACT_APP_API_TRANSFORMA_SERVICIO_UPDATE
                            : process.env.REACT_APP_API_TRANSFORMA_SERVICIO_SET
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

                            const arrAtributos = data.arrAtributos;

                            if (arrAtributos) {
                                for (let i = 0; i < arrAtributos.length; i++) {
                                    arrAtributos[i].id = shortid.generate();
                                }
                            }

                            const arrModulos = data.arrModulos;

                            if (arrModulos) {
                                for (let i = 0; i < arrModulos.length; i++) {
                                    arrModulos[i].id = shortid.generate();
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
                                arrAtributos: arrAtributos | [],
                                arrModulos: arrModulos || [],
                                arrSedesTarifas,
                                arrResponsables,
                            });

                            reset({
                                ...data,
                                arrAtributos: arrAtributos || [],
                                arrModulos: arrModulos || [],
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
    }, [isEdit, intId]);

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
        return <Redirect to="/transforma/admin/services/" />;
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
                                    isEdit={isEdit}
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
                                    data={dataServicios}
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
                                    append={apAT}
                                    fields={arrAT}
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
                                        fields={arrMO}
                                        append={apMO}
                                        remove={rmMO}
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
                                    fields={arrST}
                                    append={apST}
                                    remove={rmST}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoResponsables
                                    control={control}
                                    values={data.arrModulos}
                                    disabled={loading}
                                    isEdit={isEdit}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    fields={arrRE}
                                    append={apRE}
                                    remove={rmRE}
                                    getValues={getValues}
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
