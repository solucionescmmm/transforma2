import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef,
    Fragment,
} from "react";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

//Componentes de Material UI
import {
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
    CircularProgress,
    Alert,
    Grid,
    TextField,
    Typography,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";

//Estilos
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import DropdownAreas from "../../../../Admin/components/dropdownAreas";
import { parseISO } from "date-fns";
import { AuthContext } from "../../../../../common/middlewares/Auth";
import DropdownUsuarios from "../../../../../common/components/dropdowUsuarios";
import useGetSesiones from "../../../hooks/useGetSesiones";
import ReadAsistencia from "../Asistencia";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalCEdit = ({
    handleOpenDialog,
    open,
    intId,
    refresh,
    intIdEvento,
    isEdit,
}) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [data, setData] = useState({
        strNombre: "",
        dtFechaInicio: null,
        dtFechaFin: null,
        strArea: null,
        strResponsables: [],
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ mode: "onChange" });

    const { getUniqueData } = useGetSesiones({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const onSubmit = (data) => {
        setData((prevState) => ({
            intIdEvento: Number(intIdEvento),
            intId,
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
                                  .REACT_APP_API_TRANSFORMA_SESIONES_UPDATE
                            : process.env.REACT_APP_API_TRANSFORMA_SESIONES_SET
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
        if (isEdit && intId) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData
                    .current({ intId, intIdEvento })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data.data) {
                            let data = res.data.data[0];

                            setData({
                                strNombre: data.strNombreModulo,
                                dtFechaInicio: parseISO(data.dtFechaIni),
                                dtFechaFin: parseISO(data.dtFechaFin),
                                strArea: data.strArea,
                                strResponsables: data.strResponsables,
                            });

                            reset({
                                strNombre: data.strNombreModulo,
                                dtFechaInicio: parseISO(data.dtFechaIni),
                                dtFechaFin: parseISO(data.dtFechaFin),
                                strArea: data.strArea,
                                strResponsables: data.strResponsables,
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

    useEffect(() => {
        if (success) {
            reset({
                strNombre: "",
                dtFechaInicio: null,
                dtFechaFin: null,
                strArea: null,
                strResponsables: [],
            });
            refresh({ intIdEvento });
            handleOpenDialog();

            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <Dialog
                fullScreen={bitMobile}
                open={loading ? true : open}
                onClose={handleOpenDialog}
                fullWidth
                maxWidth="lg"
            >
                {loading ? (
                    <LinearProgress className={classes.linearProgress} />
                ) : null}
                <DialogTitle>{``}</DialogTitle>

                <DialogContent>
                    {loadingGetData && (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    )}

                    {errorGetData.flag && (
                        <Alert severity="error">
                            Ha ocurrido un error al obtener los datos de la
                            sesion seleccionada, por favor escala al área de TI
                            para más información.
                        </Alert>
                    )}

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
                                            ? "EDITAR SESION"
                                            : "REGISTRAR SESION"}
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
                            <Controller
                                defaultValue={data.strNombre}
                                name="strNombre"
                                render={({
                                    field: { name, value, onChange },
                                }) => (
                                    <TextField
                                        label="Nombre de la sesion"
                                        name={name}
                                        value={value}
                                        onChange={(e) => onChange(e)}
                                        required
                                        disabled={loading}
                                        fullWidth
                                        variant="standard"
                                        error={errors?.strNombre ? true : false}
                                        helperText={
                                            errors?.strNombre?.message ||
                                            "Digíta el nombre de la sesion"
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    required:
                                        "Por favor, digíta el nombre de la sesion",
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
                                        disabled={loading}
                                        onChange={(date) => onChange(date)}
                                        format="dd/MM/yyyy"
                                        slotProps={{
                                            textField: {
                                                name,
                                                variant: "standard",
                                                required: true,
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
                                        disabled={loading}
                                        onChange={(date) => onChange(date)}
                                        format="dd/MM/yyyy"
                                        slotProps={{
                                            textField: {
                                                name,
                                                required: true,
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
                                defaultValue={data.strArea}
                                name="strArea"
                                render={({
                                    field: { name, value, onChange },
                                }) => (
                                    <DropdownAreas
                                        label="Área responsable"
                                        name={name}
                                        value={value}
                                        disabled={loading}
                                        onChange={(_, value) => onChange(value)}
                                        required
                                        error={errors?.strArea ? true : false}
                                        helperText={
                                            errors?.strArea?.message ||
                                            "Seleccione el área responsable"
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (value?.length === 0) {
                                            return "Por favor, seleccione el área responsable";
                                        }
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name={`strResponsables`}
                                defaultValue={data.strResponsables}
                                render={({
                                    field: { name, value, onChange },
                                }) => (
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
                                        error={!!errors?.strResponsables}
                                        helperText={
                                            errors?.strResponsables?.message ||
                                            "Selecciona los responsables de la sesion"
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    validate: (value) => {
                                        if (value?.length === 0) {
                                            return "Por favor, selecciona los responsables de la sesion";
                                        }
                                    },
                                }}
                            />
                        </Grid>

                        {isEdit && (
                            <Grid item xs={12}>
                                <ReadAsistencia
                                    intIdSesion={intId}
                                    intIdEvento={intIdEvento}
                                />
                            </Grid>
                        )}
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            minWidth: "100%",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <LoadingButton
                                color="error"
                                loading={loading}
                                type="button"
                                onClick={handleSubmit(onSubmit)}
                            >
                                finalizar sesión
                            </LoadingButton>
                        </Box>
                        <Box>
                            <LoadingButton
                                color="primary"
                                loading={loading}
                                type="button"
                                onClick={handleSubmit(onSubmit)}
                            >
                                {isEdit ? "guardar" : "registrar"}
                            </LoadingButton>

                            <Button
                                onClick={() => handleOpenDialog()}
                                color="inherit"
                                type="button"
                                disabled={loading}
                            >
                                cancelar
                            </Button>
                        </Box>
                    </Box>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ModalCEdit;
