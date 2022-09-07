import React, { useState, useEffect, useCallback, useContext } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

//Componentes de Material UI
import {
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

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalCreate = ({ handleOpenDialog, open, values, refresh, data }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [state, setState] = useState({
        intId: "",
        strNombre: "",
    });

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
        reset,
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
                    url: `${process.env.REACT_APP_API_TRANSFORMA_PROYECTOS_ES_PUT}`,
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
                strNombre: values.strNombre,
            });

            reset({
                intId: values.intId,
                strNombre: values.strNombre,
            });
        }
        // eslint-disable-next-line
    }, [values]);

    useEffect(() => {
        if (success) {
            refresh();
            handleOpenDialog();

            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
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
            <DialogTitle>Editar proyecto</DialogTitle>

            <DialogContent>
                <Grid container direction="rorw" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los elementos marcados con *, son obligatorios
                        </Typography>
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
                                    disabled={loading}
                                    onChange={(e) => onChange(e)}
                                    required
                                    fullWidth
                                    error={errors[name] ? true : false}
                                    helperText={
                                        errors[name]?.message ||
                                        "Digita el nombre del proyecto"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita el nombre del proyecto",
                                validate: (value) => {
                                    if (
                                        data?.find(
                                            (a) =>
                                                a.strNombre.toLowerCase() ===
                                                    value.toLowerCase() &&
                                                a.intId !== state.intId
                                        )
                                    ) {
                                        return `Ya existe un proyecto registrado como ${value}`;
                                    }
                                },
                            }}
                        />
                    </Grid>
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
