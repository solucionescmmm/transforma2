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
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { parseISO } from "date-fns";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    LinearProgress,
    Container,
    TextField,
    // MenuItem,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { DateTimePicker } from "@mui/x-date-pickers";

//Estilos
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Componentes
import PageError from "../../../../../common/components/Error";
import ReadTareas from "../../Tareas";
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";
import SelectTipoAct from "../../../components/selectTipoAct";
import DropdownEmpresarios from "../../../components/dropdownEmpresarios";
import useGetRutas from "../../../hooks/useGetRutas";
import Loader from "../../../../../common/components/Loader";

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

const CUSesion = ({
    isEdit,
    intIdIdea,
    intId,
    intIdAcompañamiento,
    intIdServicio,
    intIdRuta,
    intIdFase,
    values,
    onChangeRoute,
    isPreview,
}) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { data: dataRutas } = useGetRutas({
        autoLoad: true,
        intIdIdea,
        intId: intIdRuta,
    });

    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intId,
        intIdIdea,
        intIdAcompañamiento,
        intIdServicio,
        intIdRuta,
        intIdFase,
        objEmpresario: null,
        dtmFechaInicial: null,
        intTipoAcomp: null,
        strUbicacion: "",
        intIdTipoActividad: "",
        strResponsables: [],
        strObjetivoActividad: "",
        dtmProximaActividad: null,
        strObservaciones: "",
        strURLDocumento: "",
        objObjetivos: {
            bitFinalizaServ: false,
        },
        bitFinalizarSesion: false,
    });

    // const [dataObj, setDataObj] = useState([]);

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
        clearErrors,
    } = useForm({ mode: "onChange" });

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
                    url: `${isEdit
                        ? process.env
                            .REACT_APP_API_TRANSFORMA_RUTAS_ACOMPANIAMIENTO_UPDATE_SESION
                        : process.env
                            .REACT_APP_API_TRANSFORMA_RUTAS_ACOMPANIAMIENTO_SET_SESION
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
        console.log(values)
        if (values) {
            setData({
                intId:values?.intId || null,
                objEmpresario: values.objEmpresario || null,
                dtmFechaInicial: values.dtmFechaInicial ? parseISO(values?.dtmFechaInicial) : null,
                intTipoAcomp: values.intTipoAcomp || null,
                strUbicacion: values.strUbicacion || "",
                intIdTipoActividad: values.intIdTipoActividad || "",
                strResponsables: values.strResponsables || [],
                strObjetivoActividad: values.strObjetivoActividad || "",
                dtmProximaActividad: values.dtmProximaActividad ? parseISO(values?.dtmProximaActividad) : null,
                strObservaciones: values.strObservaciones || "",
                strURLDocumento: values.strURLDocumento || "",
            });

            reset({
                intId:values?.intId || null,
                objEmpresario: values.objEmpresario || null,
                dtmFechaInicial: values.dtmFechaInicial ? parseISO(values?.dtmFechaInicial) : null,
                intTipoAcomp: values.intTipoAcomp || null,
                strUbicacion: values.strUbicacion || "",
                intIdTipoActividad: values.intIdTipoActividad || "",
                strResponsables: values.strResponsables || [],
                strObjetivoActividad: values.strObjetivoActividad || "",
                dtmProximaActividad: values.dtmProximaActividad ? parseISO(values?.dtmProximaActividad) : null,
                strObservaciones: values.strObservaciones || "",
                strURLDocumento: values.strURLDocumento || "",
            });
        }
    }, [values]);

    useEffect(() => {
        if (isEdit || isPreview) {
            reset(data);
        }
    }, [data, reset, isEdit, isPreview]);

    useEffect(() => {
        if (dataRutas?.length) {
            const objFase = dataRutas[0].arrInfoFases.find(
                (x) => x.intId === intIdFase
            );

            if (objFase) {
                // const { arrServicios } = objFase;

                // const objServicio = arrServicios.find(
                //     (x) => x.intIdServicio === intIdServicio
                // );

                // const { arrObjetivos } = objServicio;

                // setDataObj(arrObjetivos);
            }
        }
    }, [dataRutas]);

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
        onChangeRoute("ViewAcomp", {
            intIdIdea,
            intIdAcompañamiento
        })
    }

    if (data?.error) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del acompañamiento seleccionado, por favor escala al área de TI para más información."
                title={data.msg}
            />
        );
    }

    if (isEdit && !values) {
        return <Loader />;
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
                                                    ? "EDITAR SESIÓN"
                                                    : isPreview
                                                        ? "PREVISUALIZAR SESIÓN"
                                                        : "REGISTRAR SESIÓN"}
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
                                        defaultValue={data?.objEmpresario}
                                        name="objEmpresario"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DropdownEmpresarios
                                                name={name}
                                                value={value}
                                                label="Persona Empresaria"
                                                helperText={
                                                    errors?.objEmpresario
                                                        ?.message ||
                                                    "selecciona el empresario"
                                                }
                                                error={!!errors?.objEmpresario}
                                                disabled={loading || isPreview}
                                                required
                                                onChange={(_, value) =>
                                                    onChange(value)
                                                }
                                                intIdIdea={intIdIdea}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona el empresario",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        defaultValue={data.dtmFechaInicial}
                                        name="dtmFechaInicial"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DateTimePicker
                                                label="Fecha de inicio"
                                                value={value}
                                                onChange={(date) =>
                                                    onChange(date)
                                                }
                                                format="dd/MM/yyyy H:mm"
                                                ampm
                                                slotProps={{
                                                    textField: {
                                                        name,
                                                        variant: "standard",
                                                        error: !!errors?.dtmFechaInicial,
                                                        helperText:
                                                            errors
                                                                ?.dtmFechaInicial
                                                                ?.message ||
                                                            "Selecciona la fecha del acompañamiento",
                                                        fullWidth: true,
                                                    },
                                                }}
                                                disabled={loading || isPreview}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required:
                                                "Por favor, selecciona la fecha del acompañamiento",
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strUbicacion}
                                        name="strUbicacion"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Lugar actividad"
                                                variant="standard"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading || isPreview}
                                                required
                                                error={
                                                    !!errors?.strUbicacion
                                                }
                                                helperText={
                                                    errors?.strUbicacion
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
                                        defaultValue={data.intIdTipoActividad}
                                        name="intIdTipoActividad"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <SelectTipoAct
                                                label="Tipo de actividad"
                                                variant="standard"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading || isPreview}
                                                required
                                                error={
                                                    !!errors?.intIdTipoActividad
                                                }
                                                helperText={
                                                    errors?.intIdTipoActividad
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
                                        defaultValue={data.strResponsables}
                                        name="strResponsables"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DropdownUsuarios
                                                label="Responsable"
                                                multiple
                                                name={name}
                                                value={value}
                                                onChange={(_, value) =>
                                                    onChange(value)
                                                }
                                                disabled={loading || isPreview}
                                                required
                                                error={!!errors?.strResponsables}
                                                helperText={
                                                    errors?.strResponsables
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
                                                disabled={loading || isPreview}
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

                                <Grid item xs={12} md={12}>
                                    <Controller
                                        defaultValue={data.dtmProximaActividad}
                                        name="dtmProximaActividad"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <DateTimePicker
                                                label="Fecha próxima actividad"
                                                value={value}
                                                onChange={(date) =>
                                                    onChange(date)
                                                }
                                                format="dd/MM/yyyy H:mm"
                                                ampm
                                                disabled={loading || isPreview}
                                                slotProps={{
                                                    textField: {
                                                        name,
                                                        variant: "standard",
                                                        error: !!errors?.dtmProximaActividad,
                                                        helperText:
                                                            errors?.dtmProximaActividad
                                                                ?.message ||
                                                            "Selecciona la fecha de la próxima reunión",
                                                        fullWidth: true,
                                                    },
                                                }}
                                            />
                                        )}
                                        control={control}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Controller
                                        defaultValue={data.strObservaciones}
                                        name="strObservaciones"
                                        render={({
                                            field: { name, onChange, value },
                                        }) => (
                                            <TextField
                                                label="Retroalimentación y observaciones"
                                                variant="outlined"
                                                name={name}
                                                value={value}
                                                onChange={(e) => onChange(e)}
                                                disabled={loading || isPreview}
                                                error={!!errors?.strObservaciones}
                                                helperText={
                                                    errors?.strObservaciones
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
                                    <ReadTareas intIdIdea={intIdIdea} inModal disabled={loading || isPreview} />
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
                                                disabled={loading || isPreview}
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

                                {/* <Grid item xs={12}>
                                    <Typography
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Información adicional
                                    </Typography>
                                    <hr />
                                </Grid>

                                {dataObj.map((x) => (
                                    <Fragment>
                                        <Grid item xs={12}>
                                            <Controller
                                                name={`objObjetivos.${x.intId}`}
                                                defaultValue={false}
                                                render={({
                                                    field: {
                                                        name,
                                                        onChange,
                                                        value,
                                                    },
                                                }) => (
                                                    <Fragment>
                                                        <Typography
                                                            variant="p"
                                                            style={{
                                                                fontSize:
                                                                    "14px",
                                                            }}
                                                        >
                                                            {x.strNombre}
                                                        </Typography>
                                                        <TextField
                                                            label="¿Se logró el objetivo?"
                                                            variant="standard"
                                                            name={name}
                                                            value={value}
                                                            onChange={(e) =>
                                                                onChange(e)
                                                            }
                                                            disabled={loading || isPreview}
                                                            helperText={
                                                                "Selecciona una opción"
                                                            }
                                                            fullWidth
                                                            select
                                                        >
                                                            <MenuItem
                                                                value={true}
                                                            >
                                                                Sí
                                                            </MenuItem>
                                                            <MenuItem
                                                                value={false}
                                                            >
                                                                No
                                                            </MenuItem>
                                                        </TextField>
                                                    </Fragment>
                                                )}
                                                control={control}
                                            />

                                            <Controller
                                                name={`objObjetivos.${x.intId}.strMotivo`}
                                                defaultValue=""
                                                render={({
                                                    field: {
                                                        name,
                                                        onChange,
                                                        value,
                                                    },
                                                }) => (
                                                    <TextField
                                                        label="En caso de que no, especificar el por que"
                                                        variant="outlined"
                                                        name={name}
                                                        value={value}
                                                        onChange={(e) =>
                                                            onChange(e)
                                                        }
                                                        disabled={loading || isPreview}
                                                        helperText={
                                                            "Describe brevemente el motivo"
                                                        }
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                    />
                                                )}
                                                control={control}
                                            />
                                        </Grid>
                                    </Fragment>
                                ))} */}

                                {isPreview ? null : (
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
                                )}
                            </Grid>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default CUSesion;
