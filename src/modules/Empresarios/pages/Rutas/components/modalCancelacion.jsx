import React, { useState, useEffect, useCallback, useContext } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

//Componentes de Material UI
import {
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
    CircularProgress,
    Alert,
    AlertTitle,
    Grid,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import SelectMotivosCancelacion from "./selectMotivosCancelacion";



const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalCancel = ({ handleOpenDialog, open, intId, refresh, intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(true);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [data, setData] = useState({
        intId: null,
        intIdMotivoCancelacion: "",
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

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

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
                    method: "PUT",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_RUTAS_CANCEL}`,
                    data: {
                        ...data,
                        intId: data.intId,
                    },
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
        [token, data]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (intId) {
            setData({
                intId,
            });
        }

        setLoading(false);
    }, [intId]);

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
    if (!data.intId) {
        return (
            <Dialog
                fullScreen={bitMobile}
                open={open}
                onClose={handleOpenDialog}
                PaperProps={{
                    style: {
                        backgroundColor:
                            !loading && !data.intId ? "#FDEDED" : "inherit",
                    },
                }}
            >
                <DialogContent>
                    {loading ? (
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
                    ) : (
                        <Alert severity="error">
                            <AlertTitle>
                                <b>
                                    No se encontro el identificador de la ruta
                                </b>
                            </AlertTitle>
                            Ha ocurrido un error al momento de seleccionar los
                            datos, por favor escala al área de TI para mayor
                            información.
                        </Alert>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleOpenDialog()} color="inherit">
                        cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog
            fullScreen={bitMobile}
            open={loading ? true : open}
            onClose={handleOpenDialog}
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: "#FDEDED",
                },
            }}
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>{`¿Deseas cancelar la ruta seleccionada?`}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    El proceso es irreversible y no podrás recuperar la
                    información.
                </DialogContentText>
                <Grid
                        container
                        direction="row"
                        spacing={2}
                        style={{ padding: "15px" }}
                    >

                        <Grid item xs={12}>
                            <Controller
                                defaultValue={data.intIdMotivoCancelacion}
                                name="intIdMotivoCancelacion"
                                render={({
                                    field: { name, value, onChange },
                                }) => (
                                    <SelectMotivosCancelacion
                                        label="Motivos de cancelación"
                                        name={name}
                                        value={value}
                                        onChange={(e) => onChange(e)}
                                        disabled={loading}
                                        fullWidth
                                        required
                                        color="primary"
                                        error={errors?.intIdMotivoCancelacion ? true : false}
                                        helperText={
                                            errors?.intIdMotivoCancelacion?.message ||
                                            "Selecciona una opción"
                                        }
                                    />
                                )}
                                control={control}
                                rules={{
                                    required: "Por favor, selecciona una opción.",
                                }}
                            />
                        </Grid>
                    </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton
                    color="error"
                    loading={loading}
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                >
                    aceptar
                </LoadingButton>

                <Button
                    onClick={() => {
                        reset()
                        handleOpenDialog()
                    }}
                    color="inherit"
                    disabled={loading}
                >
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCancel;
