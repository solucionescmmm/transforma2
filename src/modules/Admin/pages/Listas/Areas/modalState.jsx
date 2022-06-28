import React, { useState, useEffect, useCallback, useContext } from "react";

//Context
import { AuthContext } from "../../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { Redirect } from "react-router-dom";
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

const ModalState = ({ handleOpenDialog, open, values }) => {
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
        intIdEstado: "",
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
                    url: `${process.env.REACT_APP_API_TRANSFORMA_AREAS_UPDATE}`,
                    params: {
                        intId: data.intId,
                        bitActivar: data.intIdEstado === 1 ? false : true,
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
        if (values) {
            setData({
                intId: values.intId,
                intIdEstado: values.intIdEstado,
            });
        }

        setLoading(false);
    }, [values]);

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
        return <Redirect to="/transforma/admin/lists/" />;
    }

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
                                <b>No se encontro el identificador del área</b>
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
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>
                {data.intIdEstado === 1
                    ? "¿Deseas desactivar el registro seleccionado?"
                    : "¿Deseas activar el registro seleccionado?"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    {data.intIdEstado === 1
                        ? "Al desactivar el registro, dejara de listarse en el sistema y en los servicios"
                        : "Al activar el registro, se listara de forma automaticamente en todo el sistema"}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <LoadingButton
                    color="error"
                    loading={loading}
                    type="button"
                    onClick={() => setFlagSubmit(true)}
                >
                    aceptar
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

export default ModalState;
