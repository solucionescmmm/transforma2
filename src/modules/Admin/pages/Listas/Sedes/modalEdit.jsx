import React, { useState, useEffect, useCallback, useContext } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { Redirect } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Alert,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
    Grid,
    Typography,
    TextField,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";

// Componentes
import SelectEstados from "../../../components/selectEstado";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalCreate = ({ handleOpenDialog, open, values }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [state, setState] = useState({
        intIdEstado: "",
        strNombre: "",
    });

    const [initialState, setInitialState] = useState();

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: "PUT",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_SEDES_UPDATE}`,
                    data: { ...state },
                    headers: {
                        token,
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
        [token, state]
    );

    const onSubmit = (data) => {
        setState((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

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

    useEffect(() => {
        if (values) {
            setState({
                intId: values.intId,
                intIdEstado: values.intIdEstado,
                strNombre: values.strNombre,
            });

            setInitialState(values.intIdEstado);
        }
    }, [values]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (success) {
        return <Redirect to="/transforma/admin/lists/" />;
    }

    return (
        <Dialog
            fullScreen={bitMobile}
            open={loading ? true : open}
            onClose={handleOpenDialog}
            fullWidth
            PaperProps={{
                component: "form",
                noValidate: true,
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>Editar sede</DialogTitle>

            <DialogContent>
                <Grid container direction="rorw" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los elementos marcados con *, son obligatorios
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={state.intIdEstado}
                            name="intIdEstado"
                            render={({ field: { onChange, value, name } }) => (
                                <SelectEstados
                                    label="Estado"
                                    name={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e);
                                        setState((prevState) => ({
                                            ...prevState,
                                            [e.target.name]: e.target.value,
                                        }));
                                    }}
                                    disabled={loading}
                                    required
                                    error={errors[name] ? true : false}
                                    helperText={
                                        errors[name]?.message ||
                                        "Selecciona una opción"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona una opción",

                                validate: (value) => {
                                    if (
                                        initialState === 1 ||
                                        initialState === 3
                                    ) {
                                        if (value === 2) {
                                            return "No puedes pasar de un estado activo o inactivo al estado 'En borrador'";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={state.strNombre}
                            name="strNombre"
                            render={({ field: { onChange, value, name } }) => (
                                <TextField
                                    label="Nombre"
                                    variant="standard"
                                    name={name}
                                    value={value}
                                    disabled={
                                        initialState === 1 || initialState === 3
                                            ? true
                                            : loading
                                    }
                                    onChange={(e) => onChange(e)}
                                    required
                                    fullWidth
                                    error={errors[name] ? true : false}
                                    helperText={
                                        errors[name]?.message ||
                                        "Digita el nombre de la sede"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el nombre de la sede",
                            }}
                        />
                    </Grid>

                    {state.intIdEstado === 1 && (
                        <Grid item xs={12}>
                            <Alert severity="warning">
                                Al seleccionar el estado activo, no podras
                                editar ni eliminar está información
                            </Alert>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton color="primary" loading={loading} type="submit">
                    guardar
                </LoadingButton>

                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    disabled={loading}
                    type="button"
                >
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCreate;
