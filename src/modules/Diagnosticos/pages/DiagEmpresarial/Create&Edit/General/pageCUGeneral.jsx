import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    useCallback,
} from "react";

//Context
import { AuthContext } from "../../../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";

//Librerias
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format, parseISO } from "date-fns";

// Componentes de MUI
import {
    Grid,
    Container,
    Paper,
    LinearProgress,
    Box,
    Typography,
    Alert,
    DialogTitle,
    useMediaQuery,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Componentes
import Loader from "../../../../../../common/components/Loader";
import PageError from "../../../../../../common/components/Error";
import InfoGeneral from "./infoGeneral";
import InfoFamiliar from "./infoFamiliar";
import InfoEmprendimiento from "./infoEmprendimiento";
import InfoEmpresa from "./infoEmpresa";
import InfoPerfilEco from "./infoPerfilEco";
import InfoAdicional from "./infoAdicional";

//Estilos
import { makeStyles } from "@mui/styles";
import useGetDiagnGeneral from "../../../../hooks/useGetDiagnGeneral";
import { useTheme } from "@emotion/react";

const styles = makeStyles((theme) => ({
    containerPR: {
        [theme.breakpoints.down("sm")]: {
            paddingRigth: "0px",
            paddingLeft: "0px",
        },
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: 0,
    },
    container: {
        position: "relative",
        display: "flex",
        width: "inherit",
        height: "70vh",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const PageCUGeneral = ({
    isEdit,
    intIdIdea,
    intIdDiagnostico,
    onChangeRoute,
}) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoGeneral: {},
        objInfoFamiliar: {},
        objInfoEmprendimiento: {},
        objInfoEmpresa: {},
        objInfoPerfilEco: {},
        objInfoAdicional: {},
    });

    const [openModal, setOpenModal] = useState(false);

    const [loading, setLoading] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
        setError,
        setValue,
        clearErrors,
    } = useForm({ mode: "onChange" });

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false, intIdIdea });

    const { getUniqueData: getUniqueDataGen } = useGetDiagnGeneral({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    const refFntGetData = useRef(getUniqueData);
    const refFntGetDataGen = useRef(getUniqueDataGen);

    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

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
                    method: isEdit ? "PUT" : "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${isEdit
                        ? process.env
                            .REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_UPDATEGENERAL
                        : process.env
                            .REACT_APP_API_TRANSFORMA_DIAGNOSTICOS_SETGENERAL
                        }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                objInfoGeneral: {
                                    ...data.objInfoGeneral,
                                    intIdIdea,
                                    intIdDiagnostico,
                                    dtmFechaSesion: data.objInfoGeneral
                                        .dtmFechaSesion
                                        ? format(
                                            data.objInfoGeneral
                                                .dtmFechaSesion,
                                            "yyyy-MM-dd hh:mm:ss"
                                        )
                                        : null,
                                    dtmActualizacion: data.objInfoGeneral
                                        .dtmActualizacion
                                        ? format(
                                            data.objInfoGeneral
                                                .dtmActualizacion,
                                            "yyyy-MM-dd hh:mm:ss"
                                        )
                                        : null,
                                    
                                    dtFechaExpedicionDocto: data.objInfoGeneral
                                        .dtFechaExpedicionDocto
                                        ? format(
                                            data.objInfoGeneral
                                                .dtFechaExpedicionDocto,
                                            "yyyy-MM-dd"
                                        )
                                        : null,
                                    dtFechaNacimiento: data.objInfoGeneral
                                        .dtFechaNacimiento
                                        ? format(
                                            data.objInfoGeneral
                                                .dtFechaNacimiento,
                                            "yyyy-MM-dd"
                                        )
                                        : null,
                                },
                                objInfoFamiliar: {
                                    ...data.objInfoFamiliar,
                                },
                                objInfoEmprendimiento: {
                                    ...data.objInfoEmprendimiento,
                                    intAñoInicioOperacion: data.objInfoEmprendimiento.intAñoInicioOperacion ? format(data.objInfoEmprendimiento.intAñoInicioOperacion, 'yyyy') : null
                                },
                                objInfoEmpresa: {
                                    ...data.objInfoEmpresa,
                                },
                                objInfoPerfilEco: {
                                    ...data.objInfoPerfilEco,
                                },
                                objInfoAdicional: {
                                    ...data.objInfoAdicional,
                                },
                            };

                            return JSON.stringify(newData);
                        },
                    ],
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

                    onChangeRoute("DiagEmpresarial", {
                        intIdIdea,
                        intIdDiagnostico,
                    });
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
    useEffect(() => {
        if (intIdIdea) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData
                    .current({ intIdIdea })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data?.data?.[0]) {
                            let data = res.data.data?.[0];
                            const objEmprPrincipal = data.objEmpresario.find(
                                (emp) => emp.strTipoEmpresario === "Principal"
                            );

                            setData({
                                ...data,
                                intIdIdea: intIdIdea,
                                intIdDiagnostico,
                                objIdeaEmpresario: data.objInfoIdeaEmpresario,
                                objInfoGeneral: {
                                    intIdEmpresario: objEmprPrincipal.intId,
                                    dtmFechaSesion: null,
                                    strLugarSesion: "",
                                    strUsuarioCreacion: "",
                                    dtmActualizacion: null,
                                    strUsuarioActualizacion: "",
                                    strNombres:
                                        objEmprPrincipal.strNombres || "",
                                    strApellidos:
                                        objEmprPrincipal.strApellidos || "",
                                    strTipoDocto:
                                        objEmprPrincipal.strTipoDocto || "",
                                    strNroDocto:
                                        objEmprPrincipal.strNroDocto || "",
                                    strLugarExpedicionDocto:
                                        objEmprPrincipal.strLugarExpedicionDocto ||
                                        "",
                                    dtFechaExpedicionDocto:
                                        objEmprPrincipal.dtFechaExpedicionDocto
                                            ? parseISO(
                                                objEmprPrincipal.dtFechaExpedicionDocto
                                            )
                                            : null,
                                    dtFechaNacimiento:
                                        objEmprPrincipal.dtFechaNacimiento
                                            ? parseISO(
                                                objEmprPrincipal.dtFechaNacimiento
                                            )
                                            : null,
                                    strGenero: objEmprPrincipal.strGenero || "",
                                    strNivelEducativo:
                                        objEmprPrincipal.strNivelEducativo ||
                                        "",
                                    strTitulos:
                                        objEmprPrincipal.strTitulos || "",
                                    strEstrato:
                                        objEmprPrincipal.strEstrato || "",
                                    arrDepartamento:
                                        objEmprPrincipal.arrDepartamento || [],
                                    arrCiudad: objEmprPrincipal.arrCiudad || [],
                                    strDireccionResidencia:
                                        objEmprPrincipal.strDireccionResidencia ||
                                        "",
                                    strBarrio: objEmprPrincipal.strBarrio || "",
                                    strUbicacionVivienda: "",
                                    strCelular1:
                                        objEmprPrincipal.strCelular1 || "",
                                    strCelular2:
                                        objEmprPrincipal.strCelular2 || "",
                                    strCorreoElectronico1:
                                        objEmprPrincipal.strCorreoElectronico1 ||
                                        "",
                                    strCorreoElectronico2:
                                        objEmprPrincipal.strCorreoElectronico2 ||
                                        "",
                                },
                                objInfoEmprendimiento: {
                                    strUnidadProductiva:
                                        data.objInfoEmpresa.strNombreMarca,
                                    strLugarOperacion:
                                        data.objInfoEmpresa.strLugarOperacion,
                                    arrDepartamento:
                                        data.objInfoEmpresa.arrDepartamento,
                                    arrCiudad: data.objInfoEmpresa.arrCiudad,
                                    strBarrio: data.objInfoEmpresa.strBarrio,
                                    strDireccionResidencia:
                                        data.objInfoEmpresa
                                            .strDireccionResidencia,
                                    strCelular: objEmprPrincipal.strCelular1 || "",
                                    strCorreoElectronico: objEmprPrincipal.strCorreoElectronico1 || "",
                                    strRedesSociales:
                                        data.objInfoEmpresa.arrMediosDigitales
                                            ?.length > 0
                                            ? "Sí"
                                            : "No",
                                    arrMediosDigitales:
                                        data.objInfoEmpresa
                                            .arrMediosDigitales || [],
                                    strTiempoDedicacion:
                                        data.objInfoEmpresa
                                            .strTiempoDedicacion || "",
                                    strSectorEconomico:
                                        data.objInfoEmpresa
                                            .strSectorEconomico || "",
                                    strCategoriaProducto:
                                        data.objInfoEmpresa
                                            .strCategoriaProducto || "",
                                    strCategoriaServicio:
                                        data.objInfoEmpresa
                                            .strCategoriaServicio || "",
                                    arrCategoriasSecundarias:
                                        data.objInfoEmpresa
                                            .arrCategoriasSecundarias || [],
                                    strOtraCategoria:
                                        data.objInfoEmpresa.strOtraCategoria ||
                                        "",
                                    btGeneraEmpleo:
                                        typeof data.objInfoEmpresa
                                            .btGeneraEmpleo === "boolean"
                                            ? data.objInfoEmpresa.btGeneraEmpleo
                                            : "",
                                },
                                objInfoPerfilEco: {
                                    dblValorVentasMes: data.objInfoEmpresa.valorVentasMes || "",
                                    intNumeroEmpleados: data.objInfoEmpresa.intNumeroEmpleados || "",
                                }
                            });
                        }

                        setLoadingGetData(false);
                        setErrorGetData({ flag: false, msg: "" });
                    })
                    .catch((error) => {
                        setErrorGetData({ flag: true, msg: error.message });
                        setLoadingGetData(false);
                    });

                await refFntGetDataGen
                    .current({
                        intIdIdea,
                        intIdDiagnostico,
                    })
                    .then((res) => {
                        if (res.data.error) {
                            throw new Error(res.data.msg);
                        }

                        if (res.data?.data) {
                            if (!isEdit) {
                                setFinalizado(
                                    res.data.data[0].objInfoGeneral.btFinalizado
                                );
                                setOpenModal(true);
                            } else {
                                const data = res.data.data[0];

                                setData({
                                    objInfoGeneral: {
                                        ...data.objInfoGeneral,
                                        intIdIdea,
                                        intIdDiagnostico,
                                        dtmFechaSesion: data.objInfoGeneral
                                            .dtmFechaSesion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmFechaSesion
                                            )
                                            : null,
                                        dtmActualizacion: data.objInfoGeneral
                                            .dtmActualizacion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmActualizacion
                                            )
                                            : null,
                                        dtFechaExpedicionDocto: data
                                            .objInfoGeneral
                                            .dtFechaExpedicionDocto
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtFechaExpedicionDocto
                                            )
                                            : null,
                                        dtFechaNacimiento: data.objInfoGeneral
                                            .dtFechaNacimiento
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtFechaNacimiento
                                            )
                                            : null,
                                    },
                                    objInfoFamiliar: {
                                        ...data.objInfoFamiliar,
                                    },
                                    objInfoEmprendimiento: {
                                        ...data.objInfoEmprendimiento,
                                        intAñoInicioOperacion: data.objInfoEmprendimiento
                                        .intAñoInicioOperacion
                                        ? parseISO(
                                            data.objInfoEmprendimiento
                                                .intAñoInicioOperacion
                                        )
                                        : null,
                                    },
                                    objInfoEmpresa: {
                                        ...data.objInfoEmpresa,
                                    },
                                    objInfoPerfilEco: {
                                        ...data.objInfoPerfilEco,
                                    },
                                    objInfoAdicional: {
                                        ...data.objInfoAdicional,
                                    },
                                });

                                reset({
                                    objInfoGeneral: {
                                        ...data.objInfoGeneral,
                                        intIdIdea,
                                        intIdDiagnostico,
                                        dtmFechaSesion: data.objInfoGeneral
                                            .dtmFechaSesion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmFechaSesion
                                            )
                                            : null,
                                        dtmActualizacion: data.objInfoGeneral
                                            .dtmActualizacion
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtmActualizacion
                                            )
                                            : null,
                                        dtFechaExpedicionDocto: data
                                            .objInfoGeneral
                                            .dtFechaExpedicionDocto
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtFechaExpedicionDocto
                                            )
                                            : null,
                                        dtFechaNacimiento: data.objInfoGeneral
                                            .dtFechaNacimiento
                                            ? parseISO(
                                                data.objInfoGeneral
                                                    .dtFechaNacimiento
                                            )
                                            : null,
                                    },
                                    objInfoFamiliar: {
                                        ...data.objInfoFamiliar,
                                    },
                                    objInfoEmprendimiento: {
                                        ...data.objInfoEmprendimiento,
                                        intAñoInicioOperacion: data.objInfoEmprendimiento
                                        .intAñoInicioOperacion
                                        ? parseISO(
                                            data.objInfoEmprendimiento
                                                .intAñoInicioOperacion
                                        )
                                        : null,
                                    },
                                    objInfoEmpresa: {
                                        ...data.objInfoEmpresa,
                                    },
                                    objInfoPerfilEco: {
                                        ...data.objInfoPerfilEco,
                                    },
                                    objInfoAdicional: {
                                        ...data.objInfoAdicional,
                                    },
                                });
                            }
                        }

                        setErrorGetData({ flag: false, msg: "" });

                        setLoadingGetData(false);
                    })
                    .catch((error) => {
                        setErrorGetData({
                            flag: true,
                            msg: error.message,
                        });

                        setLoadingGetData(false);
                    });
            }

            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intIdIdea, intIdDiagnostico, isEdit]);

    useEffect(() => {
        if (isEdit) {
            setOpenModal(false);
        }
    }, [isEdit]);

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
    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    if (data?.error) {
        return (
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={data.msg}
            />
        );
    }

    return (
        <div style={{ marginTop: "25px", width: "100%" }}>
            <Dialog
                open={openModal}
                disableEscapeKeyDown
                fullScreen={bitMobile}
            >
                <DialogTitle>Aviso</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Se ha detectado que la persona empresaria ya cuenta con
                        un registro del diagnóstico general. ¿Deseas editar la
                        información o previsualizar la información?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarialRead", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
                        color="inherit"
                    >
                        ver detalle
                    </Button>

                    <Button
                        onClick={() =>
                            onChangeRoute("DiagEmpresarialEdit", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
                        disabled={finalizado}
                        color="success"
                    >
                        editar
                    </Button>
                </DialogActions>
            </Dialog>

            <Grid
                container
                direction="row"
                spacing={3}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ marginTop: "10px" }}
                noValidate
            >
                <Grid item xs={12}>
                    <Container className={classes.containerPR}>
                        <Paper className={classes.paper}>
                            {loading ? (
                                <LinearProgress
                                    className={classes.linearProgress}
                                />
                            ) : null}

                            <Grid
                                container
                                direction="row"
                                spacing={2}
                                style={{ padding: "25px" }}
                            >
                                <Grid item xs={12}>
                                    <Grid
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
                                                style={{
                                                    fontWeight: "bold",
                                                    textTransform: "uppercase",
                                                }}
                                                color="primary"
                                                variant="body1"
                                            >
                                                {isEdit
                                                    ? "editar diagnóstico empresarial"
                                                    : "registrar diagnóstico empresarial"}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="caption">
                                        Todos los campos marcados con (*) son
                                        obligatorios.
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoGeneral
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoGeneral}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoFamiliar
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoFamiliar}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoEmprendimiento
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoEmprendimiento}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoEmpresa
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoEmpresa}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoPerfilEco
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoPerfilEco}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <InfoAdicional
                                        control={control}
                                        disabled={loading}
                                        values={data.objInfoAdicional}
                                        errors={errors}
                                        setValue={setValue}
                                        setError={setError}
                                        clearErrors={clearErrors}
                                    />
                                </Grid>

                                {(errors.objInfoGeneral ||
                                    errors.objInfoFamiliar ||
                                    errors.objInfoEmprendimiento ||
                                    errors.objInfoEmpresa ||
                                    errors.objInfoPerfilEco ||
                                    errors.objInfoAdicional) && (
                                        <Grid item xs={12}>
                                            <Alert severity="error">
                                                Lo sentimos, tienes campos
                                                pendientes por diligenciar en el
                                                formulario, revisa e intentalo
                                                nuevamente.
                                            </Alert>
                                        </Grid>
                                    )}

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                        }}
                                    >
                                        <LoadingButton
                                            variant="contained"
                                            type="submit"
                                            loading={loading}
                                        >
                                            {isEdit ? "guardar" : "registrar"}
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
};

export default PageCUGeneral;
