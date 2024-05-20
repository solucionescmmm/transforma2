import React, { useState, useEffect, useCallback, useContext, useRef, Fragment } from "react";

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
    FormControlLabel,
    Checkbox,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../../../../../common/middlewares/Auth";

//hooks
import useGetServiciosFases from "../hooks/useGetServiciosFases";
import useGetPaquetesFases from "../hooks/useGetPaquetesFases";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalFinalizacion = ({ handleOpenDialog, open, intIdSesion, intIdIdea, intIdAcompañamiento, refresh, values }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [intIdPaqueteFase, setIntPaqueteFase] = useState(null)
    const [bitFinalizarPaquete, setBitFinalizarPaquete] = useState(null)

    const [data, setData] = useState({
        intIdSesion: null,
        bitFinalizarAcompañamiento: null,
        arrObjetivos: null,
        bitCumplieronServicio: false,
        strTipoAcompañamiento: "",
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { getUniqueData: getDataServ } = useGetServiciosFases()
    const { getUniqueData: getDataPaq } = useGetPaquetesFases()

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    const refFntGetDataServ = useRef(getDataServ);
    const refFntGetDataPaq = useRef(getDataPaq);

    const handlerChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: "PUT",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_RUTAS_ACOMPANIAMIENTO_FINISH_SESION}`,
                    data: {
                        ...data,
                        intId: data.intIdSesion,
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
        setLoading(true)
        if (intIdSesion) {
            setData({
                intIdSesion,
            });
        }
        setLoading(false);
    }, [intIdSesion]);

    useEffect(() => {
        if (values?.objInfoPrincipal?.strTipoAcompañamiento === "Asociado a ruta/servicio existente" && open === true) {
            setLoadingGetData(true)
            refFntGetDataServ.current({
                intIdFase: values?.intIdFase,
                intIdServicio: values?.intIdServicio
            }).then((res) => {
                if (res?.data?.error) {
                    toast.error(res.data.msg)
                }

                const dataServ = res?.data?.data[0]
                if (dataServ?.intIdPaqueteFase) {
                    setIntPaqueteFase(dataServ?.intIdPaqueteFase)
                    refFntGetDataServ.current({
                        intIdPaqueteFase: dataServ?.intIdPaqueteFase
                    }).then((res) => {
                        if (res?.data?.error) {
                            toast.error(res.data.msg)
                        }

                        const dataServPaq = res?.data?.data
                        let countServFinalizados = 0

                        dataServPaq?.map((s) => {
                            if (s.btFinalizado === true) {
                                countServFinalizados += 1
                            }
                            if (s.intIdFase === values?.intIdFase && s.intIdServicio === values?.intIdServicio) {
                                setData((prevState) => ({
                                    ...prevState,
                                    intIdServicioFase: s.intId,
                                    arrObjetivos: s?.arrObjetivos,
                                    strTipoAcompañamiento: values?.objInfoPrincipal?.strTipoAcompañamiento
                                }))
                            }
                            return s
                        })

                        if ((dataServPaq?.length - countServFinalizados) === 1) {
                            setBitFinalizarPaquete(true)
                        }

                        setLoadingGetData(false);
                    }).catch((error) => {
                        toast.error(error?.message);
                    })
                } else {
                    setData((prevState) => ({
                        ...prevState,
                        intIdServicioFase: dataServ?.intId,
                        arrObjetivosServ: dataServ?.arrObjetivos,
                        strTipoAcompañamiento: values?.objInfoPrincipal?.strTipoAcompañamiento
                    }))
                    setBitFinalizarPaquete(true)
                }

                setLoadingGetData(false);
            }).catch((error) => {
                toast.error(error?.message);
            })
            setLoadingGetData(false);
        }
    }, [values, open]);

    useEffect(() => {
        if (intIdPaqueteFase && open === true && bitFinalizarPaquete === true) {
            setLoadingGetData(true)
            refFntGetDataPaq.current({
                intIdPaqueteFase: intIdPaqueteFase
            }).then((res) => {
                if (res?.data?.error) {
                    toast.error(res.data.msg)
                }

                const dataPaq = res?.data?.data[0]

                setData((prevState) => ({
                    ...prevState,
                    intIdPaqueteFase: dataPaq?.intId,
                    arrObjetivosPaq: dataPaq?.arrObjetivos,
                    strTipoAcompañamiento: values?.objInfoPrincipal?.strTipoAcompañamiento
                }))

                setLoadingGetData(false);
            }).catch((error) => {
                toast.error(error?.message);
            })
            setLoadingGetData(false);
        }
    }, [values, open, intIdPaqueteFase, bitFinalizarPaquete]);

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

            refresh({
                intIdIdea,
                intId: intIdAcompañamiento
            });

            setSucces(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!data.intIdSesion) {
        return (
            <Dialog
                fullScreen={bitMobile}
                open={open}
                onClose={handleOpenDialog}
                PaperProps={{
                    style: {
                        backgroundColor:
                            !loading && !data.intIdSesion ? "#FDEDED" : "inherit",
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
                                    No se encontro el identificador de la sesión
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
            open={open}
            onClose={handleOpenDialog}
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: "#FDEDED",
                },
            }}
        >
            {loadingGetData ? (
                <LinearProgress className={classes.linearProgress} />
            ) : (<Fragment>
                <DialogTitle>{`Finalizar la sesión del acompañamiento`}</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        ¿Deseas finalizar la sesión del acompañamiento?
                    </DialogContentText>
                    {values.bitUltimaSesion ?
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.bitFinalizarAcompañamiento}
                                        onChange={(e) => {
                                            handlerChangeData("bitFinalizarAcompañamiento", e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />}
                                label={values?.objInfoPrincipal?.strTipoAcompañamiento === "Asociado a ruta/servicio existente" ?
                                `¿Deseas finalizar el acompañamiento y el servicio asociado?`:`¿Deseas finalizar el acompañamiento?`}
                            />
                        </Grid> : null}
                    {data.bitFinalizarAcompañamiento &&
                        bitFinalizarPaquete ?
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={data.bitCumplieronServicio}
                                        onChange={(e) => {
                                            handlerChangeData("bitCumplieronServicio", e.target.checked)
                                        }}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />}
                                label="¿Se cumplieron los objetivos del servicio?"
                            />
                        </Grid> : null}
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
            </Fragment>)}
        </Dialog>
    );
};

export default ModalFinalizacion;