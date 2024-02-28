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
    DialogContentText,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
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

const ModalFinalizar = ({
    handleOpenDialog,
    open,
    refresh,
    intIdIdea,
    values,
    intId
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
        intIdDiagnostico:"",
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
                    url: `${process.env.REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_FINISH}`,
                    data: {
                        ...data,
                        intIdIdea
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
        [token, data, intIdIdea]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================

    useEffect(() => {
        if (intId) {
            setData((prevState)=>({
                ...prevState,
                intIdDiagnostico: intId || null,
            }));
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

            <DialogTitle>Finalizar diagnóstico</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Se va a finalizar el diagnóstico con identificador {data.intIdDiagnostico}.
                </DialogContentText>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <FormControlLabel 
                            control={<Checkbox 
                                checked={data.btConRuta}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }} />} 
                            label="¿Deseas Finalizar el diagnóstico con una ruta asociada? "
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton color="error" loading={loading} type="submit">
                    Finalizar
                </LoadingButton>

                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    type="button"
                    disabled={loading}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalFinalizar;
