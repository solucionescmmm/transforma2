import React, { useState, useEffect, useCallback, useContext } from "react";

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

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
    TextField,
    Typography,
} from "@mui/material";

import Dropzone from "../../../../common/components/dropzone";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalCreate = ({
    handleOpenDialog,
    open,
    refresh,
    intIdIdea,
    intId,
    values,
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

    const [data, setData] = useState({
        intIdIdea,
        intId: null,
        strNombre: "",
        strObservaciones: "",
        strUrlDocumento: "",
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
        setError,
        clearErrors,
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
                    method: isEdit ? "PUT" : "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: isEdit
                        ? `${process.env.REACT_APP_API_TRANSFORMA_DOCUMENTOS_UPDATE}`
                        : `${process.env.REACT_APP_API_TRANSFORMA_DOCUMENTOS_SET}`,
                    data,
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

                    reset({
                        intIdIdea,
                        intId: null,
                        strNombre: "",
                        strObservaciones: "",
                        strUrlDocumento: "",
                    });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [token, data, isEdit]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    const onSubmit = (data) => {
        setData((prevState) => ({
            ...prevState,
            ...data,
        }));

        setFlagSubmit(true);
    };

    useEffect(() => {
        if (isEdit) {
            setData((prevState) => ({
                ...prevState,
                intId,
                strNombre: values.strNombre,
                strObservaciones: values.strObservaciones,
                strUrlDocumento: values.strUrlDocumento,
            }));

            reset({
                intId,
                strNombre: values.strNombre,
                strObservaciones: values.strObservaciones,
                strUrlDocumento: values.strUrlDocumento,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intId, isEdit, values]);

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
            refresh({ intIdIdea });
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
                noValidate: "noValidate",
                component: "form",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>
                {isEdit ? "Editar documento" : "Registrar documento"}
            </DialogTitle>

            <DialogContent>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="strNombre"
                            defaultValue={data.strNombre}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombre del documento"
                                    name={name}
                                    required
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={loading}
                                    error={errors?.strNombre ? true : false}
                                    helperText={
                                        errors?.strNombre?.message ||
                                        "Digita el nombre del documento"
                                    }
                                />
                            )}
                            rules={{
                                required:
                                    "Por favor, digita el nombre del documento",
                            }}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="strObservaciones"
                            defaultValue={data.strObservaciones}
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Observaciones"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={loading}
                                    error={
                                        errors?.strObservaciones ? true : false
                                    }
                                    helperText={
                                        errors?.strObservaciones?.message ||
                                        "Digita las observaciones"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strUrlDocumento}
                            name="strUrlDocumento"
                            render={({ field: { name, onChange, value } }) => (
                                <Dropzone
                                    label="Documento"
                                    name={name}
                                    value={value}
                                    disabled={loading}
                                    onChange={(url) => onChange(url)}
                                    maxFiles={1}
                                    required
                                    type=""
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    error={
                                        errors?.strUrlDocumento ? true : false
                                    }
                                    helperText={
                                        errors?.strUrlDocumento?.message ||
                                        "Selecciona el documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, selecciona un documento",
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton color="primary" loading={loading} type="submit">
                    {isEdit ? "editar" : "registrar"}
                </LoadingButton>

                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    type="button"
                    disabled={loading}
                >
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCreate;
