import React, { useState, useEffect, useCallback, useContext } from "react";

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";
//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

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
    Checkbox,
    FormControlLabel,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalFinish = ({
    handleOpenDialog,
    open,
    intIdDiagnostico,
    intIdIdea,
    refresh,
}) => {
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
        intIdDiagnostico: null,
        btConRuta: false,
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const {
        handleSubmit,
    } = useForm({ mode: "onChange" });
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const handleChange = (e) =>{
        setData((prevState)=>({
            ...prevState,
            btConRuta: e.target.checked
        }))
    }

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
                    url: `${process.env.REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_FINISHEXPRESS}`,
                    data: {
                        ...data,
                        intIdDiagnostico: data.intIdDiagnostico,
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
        if (intIdDiagnostico) {
            setData({
                intIdDiagnostico,
                intIdIdea,
            });
        }

        setLoading(false);
    }, [intIdDiagnostico, intIdIdea]);

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
            handleOpenDialog();
            refresh({ intIdIdea })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!data.intIdDiagnostico) {
        return (
            <Dialog
                fullScreen={bitMobile}
                open={open}
                onClose={handleOpenDialog}
                PaperProps={{
                    style: {
                        backgroundColor:
                            !loading && !data.intIdDiagnostico
                                ? "#FDEDED"
                                : "inherit",
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
                                    No se encontro el identificador del
                                    empresario
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
                noValidate: "noValidate",
                component: "form",
                onSubmit: handleSubmit(onSubmit),
                style: {
                    backgroundColor: "#FDEDED",
                },
            }}
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>{`¿Deseas finalizar el diagnóstico express?`}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    El proceso es irreversible y no podrás editar nuevamente la
                    información suministrada.
                </DialogContentText>
                <Grid item xs={12}>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    checked={data.btConRuta}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }} 
                                />} 
                            label="¿Deseas Finalizar el diagnóstico express con una ruta asociada? "
                        />
                    </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton
                    color="error"
                    loading={loading}
                    type="submit"
                >
                    Finalizar
                </LoadingButton>

                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    disabled={loading}
                >
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalFinish;