import React, { useState, useEffect, useCallback, useContext, useRef, Fragment } from "react";

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";

//Librerias
import axios from "axios";
import { toast } from "react-hot-toast";

//Hooks
import useGetDiagnosticosByHijos from "../../hooks/useGetDiagnosticosByHijos";

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
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos
import { makeStyles } from "@mui/styles";
import { useForm } from "react-hook-form";

//Componentes
import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

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
    const [dense] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [objDataHijos, setObjDataHijos]= useState(null)
    const [bitFinalizar, setBitFinalizar] = useState(false)

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

    const { getUniqueData } = useGetDiagnosticosByHijos({
        intId
    })

    const refGetDataDiagnosticosHijos = useRef(getUniqueData)

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
        if (intId && values) {
            setLoadingGetData(true);

            async function getData() {
                await refGetDataDiagnosticosHijos
                    .current({
                        intId
                    })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }
    
                        if (res.data?.data) {
                            setObjDataHijos(res.data.data[0])
                            if (
                                res.data.data[0]?.objDiagnosticoGeneral ||
                                res.data.data[0]?.objDiagnosticoHumanoSocial ||
                                res.data.data[0]?.objDiagnosticoCompetenciasTecnicas ||
                                res.data.data[0]?.objDiagnosticoProductos ||
                                res.data.data[0]?.objDiagnosticoServicios
                            ) {
                                setBitFinalizar(true)
                            }
                        }
    
                        setErrorGetData({ flag: false, msg: "" });
                    })
                    .catch((error) => {
                        setErrorGetData({ flag: true, msg: error.message });
                    });
    
                setLoadingGetData(false);
            }
            getData();
        }
    }, [intId,values]);

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
    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
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
            }}
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}

            <DialogTitle>Finalizar diagnóstico</DialogTitle>

            <DialogContent>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Typography sx={{ mt: 2, mb: 1 }} variant="body1" component="div">
                          Tienes los siguientes diagnósticos sin finalizar:
                        </Typography>
                            <List dense={dense}>
                                {objDataHijos?.objDiagnosticoGeneral 
                                ? <ListItem>
                                    <ListItemText
                                      primary="Diagnónstico información general"
                                    />
                                </ListItem>: null}
                                {objDataHijos?.objDiagnosticoHumanoSocial 
                                ? <ListItem>
                                    <ListItemText
                                      primary="Diagnónstico competencias humanas"
                                    />
                                </ListItem>: null}
                                {objDataHijos?.objDiagnosticoCompetenciasTecnicas 
                                ? <ListItem>
                                    <ListItemText
                                      primary="Diagnónstico competencias técnicas"
                                    />
                                </ListItem>: null}
                                {objDataHijos?.objDiagnosticoProductos 
                                ? <ListItem>
                                    <ListItemText
                                      primary="Diagnónstico producto"
                                    />
                                </ListItem>: null}
                                {objDataHijos?.objDiagnosticoServicios 
                                ? <ListItem>
                                    <ListItemText
                                      primary="Diagnónstico servicio"
                                    />
                                </ListItem>: null}
                            </List>
                        <Typography sx={{ mt: 2, mb: 1 }} variant="caption" component="div">
                            Debes de finalizarlos manualmente antes de finalizar el diagnóstico padre
                        </Typography>
                    </Grid>
                    {bitFinalizar ? null: (
                        <Fragment>
                            <DialogContentText>
                                Se va a finalizar el diagnóstico con identificador {data.intIdDiagnostico}.
                            </DialogContentText>
                            <Grid item xs={12}>
                                <FormControlLabel 
                                    control={<Checkbox 
                                        checked={data.btConRuta}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }} />} 
                                    label="¿Deseas Finalizar el diagnóstico con una ruta asociada? "
                                />
                            </Grid>
                        </Fragment> 
                    )}
                </Grid>
            </DialogContent>

            <DialogActions>
                <LoadingButton 
                    color="error" 
                    loading={loading} 
                    type="submit"
                    disabled={bitFinalizar}
                >
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
