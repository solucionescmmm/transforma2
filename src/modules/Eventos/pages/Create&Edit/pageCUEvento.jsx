import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

// Context
import { AuthContext } from "../../../../common/middlewares/Auth";

// Librerias
import axios from "axios";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

// MUI
import {
    Container,
    Grid,
    LinearProgress,
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    Breadcrumbs,
    Link,
} from "@mui/material";

//Iconos
import {
    Home as HomeIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";

//Estilos
import { makeStyles } from "@mui/styles";

// Componentes
import DropdownUsuarios from "../../../../common/components/dropdowUsuarios";
import Loader from "../../../../common/components/Loader";
import PageError from "../../../../common/components/Error";
import useGetEventos from "../../hooks/useGetEventos";
import { Link as RouterLink, Redirect, useHistory } from "react-router-dom";
import SelectTipoEventos from "../../components/selectTipoEventos";
import SelectListas from "../../../Diagnosticos/components/selectLista";
import DropdownServicios from "../../../Admin/components/dropdownServicios";
import DropdownAreas from "../../../Admin/components/dropdownAreas";
import SelectSedes from "../../../Admin/components/selectSedes";
import { useParams } from "react-router-dom";
import ReadSesiones from "./Sesiones";
import { parseISO } from "date-fns";

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

const CreateEditEventos = ({ isEdit }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);
    const { goBack } = useHistory();

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        strNombre: "",
        intTipoEvento: "",
        dtFechaInicio: null,
        dtFechaFin: null,
        strResponsable: null,
        bitPago: false,
        strSede: "",
        strServicio: "",
        arrAreas: [],
        arrInvolucrados: [],
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

    const { intId } = useParams();

    const { getUniqueData } = useGetEventos({ autoLoad: false });

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
                    url: `${
                        isEdit
                            ? process.env
                                  .REACT_APP_API_TRANSFORMA_EVENTOS_UPDATE
                            : process.env.REACT_APP_API_TRANSFORMA_EVENTOS_SET
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
        if (isEdit && intId) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData
                    .current({ intId: Number(intId) })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data.data) {
                            let data = res.data.data[0];

                            setData({
                                intId,
                                strNombre: data.strNombre,
                                intTipoEvento: data.intIdTipoEvento,
                                dtFechaInicio: parseISO(data.dtFechaIni),
                                dtFechaFin: parseISO(data.dtFechaFin),
                                strResponsable: data.strResponsable,
                                bitPago: data.btPago === true ? "Sí" : "No",
                                strSede: data.intIdSede,
                                strServicio: data.intIdServicio,
                                arrAreas: data.arrAreas,
                                arrInvolucrados: data.arrInvolucrados,
                            });

                            reset({
                                intId,
                                strNombre: data.strNombre,
                                intTipoEvento: data.intIdTipoEvento,
                                dtFechaInicio: parseISO(data.dtFechaIni),
                                dtFechaFin: parseISO(data.dtFechaFin),
                                strResponsable: data.strResponsable,
                                bitPago: data.btPago === true ? "Sí" : "No",
                                strSede: data.intIdSede,
                                strServicio: data.intIdServicio,
                                arrAreas: data.arrAreas,
                                arrInvolucrados: data.arrInvolucrados,
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
        return <Redirect to="/transforma/asesor/eventos/read/all" />;
    }

    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del evento seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    return (
        <Grid container direction="row" spacing={3}>
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
                    type="button"
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
                                                ? "EDITAR EVENTO"
                                                : "REGISTRAR EVENTO"}
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
                                    defaultValue={data.strNombre}
                                    name="strNombre"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <TextField
                                            label="Nombre del evento"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            required
                                            disabled={loading}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.strNombre ? true : false
                                            }
                                            helperText={
                                                errors?.strNombre?.message ||
                                                "Digíta el nombre del evento"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digíta el nombre del evento",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.intTipoEvento}
                                    name="intTipoEvento"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectTipoEventos
                                            label="Tipo de evento"
                                            name={name}
                                            value={value}
                                            onChange={(e) => onChange(e)}
                                            required
                                            disabled={loading}
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.intTipoEvento
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.intTipoEvento
                                                    ?.message ||
                                                "Selecciona el tipo de evento"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona el tipo de evento",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.dtFechaInicio}
                                    name="dtFechaInicio"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DatePicker
                                            label="Fecha de inicio"
                                            value={value}
                                            onChange={(date) => onChange(date)}
                                            slotProps={{
                                                textField: {
                                                    name,
                                                    variant: "standard",
                                                    error: !!errors?.dtFechaInicio,
                                                    helperText:
                                                        errors?.dtFechaInicio
                                                            ?.message ||
                                                        "Selecciona la fecha de inicio",
                                                    fullWidth: true,
                                                },
                                            }}
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona la fecha de inicio",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.dtFechaFin}
                                    name="dtFechaFin"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DatePicker
                                            label="Fecha de finalización"
                                            value={value}
                                            onChange={(date) => onChange(date)}
                                            slotProps={{
                                                textField: {
                                                    name,
                                                    variant: "standard",
                                                    error: !!errors?.dtFechaFin,
                                                    helperText:
                                                        errors?.dtFechaFin
                                                            ?.message ||
                                                        "Selecciona la fecha de finalización",
                                                    fullWidth: true,
                                                },
                                            }}
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona la fecha de finalización",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name={`strResponsable`}
                                    defaultValue={data.strResponsable}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownUsuarios
                                            label="Responsable"
                                            name={name}
                                            value={value}
                                            disabled={loading}
                                            onChange={(e, value) =>
                                                onChange(value)
                                            }
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={!!errors?.strResponsable}
                                            helperText={
                                                errors?.strResponsable
                                                    ?.message ||
                                                "Selecciona el responsables del evento"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona el responsable del evento",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.bitPago}
                                    name="bitPago"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectListas
                                            label="¿Es de pago?"
                                            name={name}
                                            value={value}
                                            disabled={loading}
                                            onChange={(e) => onChange(e)}
                                            error={
                                                errors?.bitPago ? true : false
                                            }
                                            helperText={
                                                errors?.bitPago?.message ||
                                                "Seleccione una opción"
                                            }
                                            strGrupo="Lista_Generica"
                                            strCodigo="SI_NO_N/A"
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona una opción",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strSede}
                                    name="strSede"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <SelectSedes
                                            label="Sede"
                                            name={name}
                                            value={value}
                                            onChange={(e) => {
                                                onChange(e);
                                            }}
                                            disabled={loading}
                                            required
                                            error={!!errors?.strSede}
                                            helperText={
                                                errors?.strSede?.message ||
                                                "Selecciona una sede"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona una sede",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.strServicio}
                                    name="strServicio"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownServicios
                                            label="Servicio asociado"
                                            name={name}
                                            value={value}
                                            disabled={loading}
                                            onChange={(_, value) =>
                                                onChange(value)
                                            }
                                            required
                                            error={
                                                errors?.strServicio
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.strServicio?.message ||
                                                "Selecciona un servicio"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, selecciona un servicio",
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    defaultValue={data.arrAreas}
                                    name="arrAreas"
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownAreas
                                            multiple
                                            label="Áreas involucradas"
                                            name={name}
                                            value={value}
                                            disabled={loading}
                                            onChange={(_, value) =>
                                                onChange(value)
                                            }
                                            required
                                            error={
                                                errors?.arrAreas ? true : false
                                            }
                                            helperText={
                                                errors?.arrAreas?.message ||
                                                "Seleccione las áreas responsables"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (value?.length === 0) {
                                                return "Por favor, seleccione las áreas responsables";
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Controller
                                    name={`arrInvolucrados`}
                                    defaultValue={data.arrInvolucrados}
                                    render={({
                                        field: { name, value, onChange },
                                    }) => (
                                        <DropdownUsuarios
                                            multiple
                                            label="Involucrados"
                                            name={name}
                                            value={value}
                                            disabled={loading}
                                            onChange={(e, value) =>
                                                onChange(value)
                                            }
                                            fullWidth
                                            variant="standard"
                                            required
                                            error={!!errors?.arrInvolucrados}
                                            helperText={
                                                errors?.arrInvolucrados
                                                    ?.message ||
                                                "Seleccione los responsables de la sesión"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        validate: (value) => {
                                            if (value?.length === 0) {
                                                return "Por favor, seleccione los responsables de la sesión";
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            {isEdit && (
                                <Grid item xs={12}>
                                    <ReadSesiones intIdEvento={intId} />
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

export default CreateEditEventos;
