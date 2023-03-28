/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    useState,
    useCallback,
    useEffect,
    useContext,
    Fragment,
} from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";
import Dropzone from "../../../../../common/components/dropzone";

//Librerias
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    LinearProgress,
    Container,
    Alert,
    TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { DateTimePicker } from "@mui/x-date-pickers";

//Estilos
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Componentes
import PageError from "../../../../../common/components/Error";
import InfoRutaExs from "./infoRutaExs";
import SelectTipoAcomp from "../../../components/selectTipoAcomp";
import ReadTareas from "../../Tareas";
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";
import SelectTipoAct from "../../../components/selectTipoAct";
import InfoNuevoServPaq from "./infoNuevoServPaq";

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

const CURuta = ({ isEdit, values, intIdIdea, onChangeRoute }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intIdIdea,
        dtmFechaInicio: null,
        dtmFechaFinal: null,
        intTipoAcomp: null,
        objInfoRutaExs: {},
        objNuevoServPaq: {},
        strLugarActividad: "",
        intTipoActividad: "",
        objResponsable: null,
        strObjetivoActividad: "",
        strActividades: "",
        strLogros: "",
        dtmFechaProx: null,
        strRetroAlim: "",
        strURLDocumento: "",
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
        watch,
    } = useForm({ mode: "onChange" });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "arrInfoFases",
        keyName: "Id",
    });

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
                                  .REACT_APP_API_TRANSFORMA_RUTAS_ACOMPANIAMIENTO_UPDATE
                            : process.env
                                  .REACT_APP_API_TRANSFORMA_RUTAS_ACOMPANIAMIENTO_SET
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
        if (isEdit && values) {
            setData({
                ...values,
                objInfoPrincipal: {
                    ...values.objInfoPrincipal,
                    intEstado: values.intIdEstadoRuta,
                },
            });
        }
    }, [isEdit, values]);

    console.log(errors);

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
    const watchIntTipoAcomp = watch("intTipoAcomp");

    if (success) {
        onChangeRoute("Rutas");
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
            <Grid
                container
                direction="row"
                spacing={3}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                sx={{
                    marginTop: "10px",
                }}
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
                                                    ? "EDITAR ACOMPAÑAMIENTO"
                                                    : "REGISTRAR ACOMPAÑAMIENTO"}
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

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        defaultValue={data.dtmFechaInicio}
                                        name="dtmFechaInicio"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DateTimePicker
                                                label="Fecha de inicio"
                                                value={value}
                                                onChange={(date) =>
                                                    onChange(date)
                                                }
                                                slotProps={{
                                                    textField: {
                                                        name,
                                                        variant: "standard",
                                                        error: !!errors?.dtmFechaInicio,
                                                        helperText:
                                                            errors?.dtmFechaInicio
                                                                ?.message ||
                                                            "Selecciona la fecha del acompañamiento",
                                                        fullWidth: true,
                                                    },
                                                }}
                                                disabled={loading}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona la fecha del acompañamiento",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        defaultValue={data.dtmFechaFinal}
                                        name="dtmFechaFinal"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DateTimePicker
                                                label="Fecha final"
                                                value={value}
                                                onChange={(value) =>
                                                    onChange(value)
                                                }
                                                ampm
                                                disabled={loading}
                                                slotProps={{
                                                    textField: {
                                                        name,
                                                        variant: "standard",
                                                        error: !!errors?.dtmFechaFinal,
                                                        helperText:
                                                            errors?.dtmFechaFinal
                                                                ?.message ||
                                                            "Selecciona la fecha final del acompañamiento",
                                                        fullWidth: true,
                                                    },
                                                }}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona la fecha final del acompañamiento",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.intTipoAcomp}
                                        name="intTipoAcomp"
                                        render={({
                                            field: { name, value, onChange },
                                        }) => (
                                            <SelectTipoAcomp
                                                disabled={loading}
                                                label="Tipo de Acompañamiento"
                                                required
                                                name={name}
                                                value={value}
                                                onChange={(e) => {
                                                    setValue(
                                                        "objInfoRutaExs.objRuta",
                                                        null
                                                    );

                                                    setValue(
                                                        "objInfoRutaExs.objFase",
                                                        null
                                                    );

                                                    setValue(
                                                        "objInfoRutaExs.objPaquete",
                                                        null
                                                    );

                                                    setValue(
                                                        "objInfoRutaExs.objServicio",
                                                        null
                                                    );

                                                    setValue(
                                                        "objNuevoServPaq.objPaquete",
                                                        null
                                                    );

                                                    setValue(
                                                        "objNuevoServPaq.objServicio",
                                                        null
                                                    );
                                                    onChange(e);
                                                }}
                                                helperText={
                                                    errors?.intTipoAcomp
                                                        ?.message ||
                                                    "Selecciona el tipo de acompañamiento"
                                                }
                                                error={!!errors?.intTipoAcomp}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona el tipo de acompañamiento",
                                        }}
                                    />
                                </Grid>

                                {!watchIntTipoAcomp && (
                                    <Grid item xs={12}>
                                        <Alert severity="info">
                                            Por favor selecciona el tipo de
                                            acompañamiento para continuar
                                        </Alert>
                                    </Grid>
                                )}

                                {watchIntTipoAcomp === 1 && (
                                    <InfoRutaExs
                                        control={control}
                                        values={data.objInfoRutaExs}
                                        disabled={loading}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        isEdit={isEdit}
                                        fields={fields}
                                        append={append}
                                        remove={remove}
                                        watch={watch}
                                        intIdIdea={intIdIdea}
                                    />
                                )}

                                {watchIntTipoAcomp === 2 && (
                                    <InfoNuevoServPaq
                                        control={control}
                                        values={data.objInfoRutaExs}
                                        disabled={loading}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        isEdit={isEdit}
                                        fields={fields}
                                        append={append}
                                        remove={remove}
                                        watch={watch}
                                        intIdIdea={intIdIdea}
                                    />
                                )}

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strLugarActividad}
                                        name="strLugarActividad"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Lugar actividad"
                                                variant="standard"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading}
                                                required
                                                error={
                                                    !!errors?.strLugarActividad
                                                }
                                                helperText={
                                                    errors?.strLugarActividad
                                                        ?.message ||
                                                    "Digita el lugar donde se  realizo la actividad"
                                                }
                                                fullWidth
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona el responsable",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.intTipoActividad}
                                        name="intTipoActividad"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <SelectTipoAct
                                                label="Tipo de actividad"
                                                variant="standard"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading}
                                                required
                                                error={
                                                    !!errors?.intTipoActividad
                                                }
                                                helperText={
                                                    errors?.intTipoActividad
                                                        ?.message ||
                                                    "Selecciona el tipo de actividad"
                                                }
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona el tipo de actividad",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.objResponsable}
                                        name="objResponsable"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DropdownUsuarios
                                                label="Responsable"
                                                name={name}
                                                value={value}
                                                onChange={(_, value) =>
                                                    onChange(value)
                                                }
                                                disabled={loading}
                                                required
                                                error={!!errors?.objResponsable}
                                                helperText={
                                                    errors?.objResponsable
                                                        ?.message ||
                                                    "Selecciona el responsable"
                                                }
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona el responsable",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strObjetivoActividad}
                                        name="strObjetivoActividad"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Objetivo actividad"
                                                variant="outlined"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading}
                                                required
                                                error={
                                                    !!errors?.strObjetivoActividad
                                                }
                                                helperText={
                                                    errors?.strObjetivoActividad
                                                        ?.message ||
                                                    "Digita el objetivo de la actividad"
                                                }
                                                fullWidth
                                                multiline
                                                rows={4}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, digita el objetivo de la actividad",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strActividades}
                                        name="strActividades"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Temas y/o actividades a desarrollar"
                                                variant="outlined"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading}
                                                required
                                                error={!!errors?.strActividades}
                                                helperText={
                                                    errors?.strActividades
                                                        ?.message ||
                                                    "Digita las actividades a desarrollar"
                                                }
                                                fullWidth
                                                multiline
                                                rows={4}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, digita las actividad a desarrollar",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strLogros}
                                        name="strLogros"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Logros/avances a desarrollar"
                                                variant="outlined"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading}
                                                required
                                                error={
                                                    !!errors?.strObservaciones
                                                }
                                                helperText={
                                                    errors?.strObservaciones
                                                        ?.message ||
                                                    "Digita las observaciones"
                                                }
                                                fullWidth
                                                multiline
                                                rows={4}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, digita las observaciones",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Controller
                                        defaultValue={data.dtmFechaProx}
                                        name="dtmFechaProx"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DateTimePicker
                                                label="Fecha próxima actividad"
                                                value={value}
                                                onChange={(date) =>
                                                    onChange(date)
                                                }
                                                disabled={loading}
                                                slotProps={{
                                                    textField: {
                                                        name,
                                                        variant: "standard",
                                                        error: !!errors?.dtmFechaProx,
                                                        helperText:
                                                            errors?.dtmFechaProx
                                                                ?.message ||
                                                            "Selecciona la fecha de la próxima reunión",
                                                        fullWidth: true,
                                                    },
                                                }}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona la fecha de la próxima reunión",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strRetroAlim}
                                        name="strRetroAlim"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Retroalimentación y observaciones"
                                                variant="outlined"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading}
                                                error={!!errors?.strRetroAlim}
                                                helperText={
                                                    errors?.strRetroAlim
                                                        ?.message ||
                                                    "Digita la retroalimentación u observaciones en caso de tener"
                                                }
                                                fullWidth
                                                multiline
                                                rows={4}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, digita la retroalimentación u observaciones en caso de tener",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Compromisos
                                    </Typography>
                                    <hr />
                                </Grid>

                                <Grid item xs={12}>
                                    <ReadTareas intIdIdea={intIdIdea} inModal />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Información participantes
                                    </Typography>
                                    <hr />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strURLDocumento}
                                        name="strURLDocumento"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <Dropzone
                                                label="Documento"
                                                name={name}
                                                value={value}
                                                disabled={loading}
                                                onChange={(url) =>
                                                    onChange(url)
                                                }
                                                maxFiles={1}
                                                type=""
                                                setError={setError}
                                                clearErrors={clearErrors}
                                                error={
                                                    errors?.objInfoEmpresa
                                                        ?.strURLFileLogoEmpresa
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    errors?.objInfoEmpresa
                                                        ?.strURLFileLogoEmpresa
                                                        ?.message ||
                                                    "Selecciona algún documento de soporte en caso de ser necesario"
                                                }
                                            />
                                        )}
                                        control={control}
                                    />
                                </Grid>

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

export default CURuta;
