import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

// Context
import { AuthContext } from "../../../../common/middlewares/Auth";

// Hooks
import useGetTareas from "../../hooks/useGetTareas";

// Librerias
import axios from "axios";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { parseISO } from "date-fns";

// MUI
import {
    Container,
    Grid,
    LinearProgress,
    Paper,
    Box,
    Typography,
    TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";

//Estilos
import { makeStyles } from "@mui/styles";

// Componentes
import DropdownUsuarios from "../../../../common/components/dropdowUsuarios";
import Loader from "../../../../common/components/Loader";
import PageError from "../../../../common/components/Error";
import DropdownAreas from "../../../Admin/components/dropdownAreas";
import SelectEstadoTareas from "../../components/selectEstadoTareas";

const styles = makeStyles((theme) => ({
    containerPR: {
        marginTop: "20px",
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

const CreateEditTareas = ({ isEdit, intIdIdea, intId, onChangeRoute }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        intId,
        strTarea: "",
        intIdIdea,
        strObservaciones: "",
        strResponsable: [],
        dtFechaFinTentativa: null,
        strUsuarioCreacion: strInfoUser.strUsuario,
        dtFechaAtencion: null,
        intIdEstado: "",
        strArea: null,
        strEstado:""
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
    } = useForm({ mode: "onChange" });

    const { getUniqueData } = useGetTareas({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

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
                            ? process.env.REACT_APP_API_TRANSFORMA_TAREAS_PUT
                            : process.env.REACT_APP_API_TRANSFORMA_TAREAS_SET
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

    useEffect(() => {
        if (isEdit) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData
                    .current({ intId, intIdIdea })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data.data) {
                            let data = res.data.data[0];

                            setData({
                                intId,
                                strTarea: data.strTarea,
                                intIdIdea,
                                strObservaciones: data.strObservaciones,
                                strResponsable: data.strResponsable || [],
                                dtFechaFinTentativa: parseISO(
                                    data.dtFechaFinTentativa
                                ),
                                strUsuarioCreacion: strInfoUser.strUsuario,
                                dtFechaAtencion: data.dtFechaAtencion
                                    ? parseISO(data.dtFechaAtencion)
                                    : null,
                                intIdEstado: data.intIdEstado,
                                strArea: data.strArea,
                                strEstado: data.strEstado
                            });

                            reset({
                                intId,
                                strTarea: data.strTarea,
                                intIdIdea,
                                strObservaciones: data.strObservaciones,
                                strResponsable: data.strResponsable || [],
                                dtFechaFinTentativa: parseISO(
                                    data.dtFechaFinTentativa
                                ),
                                strUsuarioCreacion: strInfoUser.strUsuario,
                                dtFechaAtencion: data.dtFechaAtencion
                                    ? parseISO(data.dtFechaAtencion)
                                    : null,
                                intIdEstado: data.intIdEstado,
                                strArea: data.strArea,
                                strEstado: data.strEstado
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, intId, intIdIdea, strInfoUser]);

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
        onChangeRoute("Tareas");
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
        <Container className={classes.containerPR}>
            <Paper className={classes.paper}>
                {loading ? (
                    <LinearProgress className={classes.linearProgress} />
                ) : null}

                <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ padding: "25px" }}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
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
                                        ? "EDITAR TAREA"
                                        : "REGISTRAR TAREA"}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strTarea}
                            name="strTarea"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Título de la tarea"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={loading}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.strTarea ? true : false}
                                    helperText={
                                        errors?.strTarea?.message ||
                                        "Digíta el nombre de la tarea"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta el nombre de la tarea",
                            }}
                        />
                    </Grid>

                    {isEdit ? <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.intIdEstado}
                            name="intIdEstado"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectEstadoTareas
                                    label="Estado"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={!!!isEdit || loading}
                                    fullWidth
                                    variant="standard"
                                    error={errors?.intIdEstado ? true : false}
                                    helperText={
                                        errors?.intIdEstado?.message ||
                                        "Selecciona el estado de la tarea"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta el nombre de la tarea",
                            }}
                        />
                    </Grid>: null}

                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`strArea`}
                            defaultValue={data.strArea}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownAreas
                                    label="­Área responsable"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e, value) => onChange(value)}
                                    fullWidth
                                    variant="standard"
                                    required
                                    error={!!errors?.strArea}
                                    helperText={
                                        errors?.strArea?.message ||
                                        "Selecciona el área responsable de la tarea"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona los responsables de la tarea",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name={`strResponsable`}
                            defaultValue={data.strResponsable}
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownUsuarios
                                    label="Responsables"
                                    multiple
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(e, value) => onChange(value)}
                                    fullWidth
                                    variant="standard"
                                    required
                                    error={!!errors?.strResponsable}
                                    helperText={
                                        errors?.strResponsable?.message ||
                                        "Selecciona los responsables de la tarea"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value?.length === 0) {
                                        return "Por favor, selecciona los responsables de la tarea";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strObservaciones}
                            name="strObservaciones"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Observaciones"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={loading}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    error={
                                        errors?.strObservaciones ? true : false
                                    }
                                    helperText={
                                        errors?.strObservaciones?.message ||
                                        "Digíta las observaciones de la tarea"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta las observaciones de la tarea",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaAtencion}
                            name="dtFechaAtencion"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha de gestión"
                                    value={value}
                                    disabled={loading}
                                    onChange={(date) => onChange(date)}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "standard",
                                            name,
                                            error: !!errors?.dtFechaAtencion,
                                            helperText:
                                                errors?.dtFechaAtencion
                                                    ?.message ||
                                                "Selecciona la fecha de gestión",
                                        },
                                    }}
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.dtFechaFinTentativa}
                            name="dtFechaFinTentativa"
                            render={({ field: { name, value, onChange } }) => (
                                <DatePicker
                                    label="Fecha tentativa de finalización"
                                    value={value}
                                    disabled={loading}
                                    onChange={(date) => onChange(date)}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            required: true,
                                            fullWidth: true,
                                            variant: "standard",
                                            name,
                                            error: !!errors?.dtFechaFinTentativa,
                                            helperText:
                                                errors?.dtFechaFinTentativa
                                                    ?.message ||
                                                "Selecciona la fecha tentativa de finalización",
                                        },
                                    }}
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona la fecha tentativa de finalización",
                            }}
                        />
                    </Grid>

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
    );
};

export default CreateEditTareas;
