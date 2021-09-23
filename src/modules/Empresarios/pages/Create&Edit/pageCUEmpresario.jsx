import React, { useState, useCallback, useEffect, useContext, useRef } from "react";

//Context
import { AuthContext } from "../../../../common/middlewares/Auth";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

//Librerias
import { Link as RouterLink, Redirect, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { format } from "date-fns";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    IconButton,
    Tooltip,
    SvgIcon,
    LinearProgress,
    Container,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";

//Estilos
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

//Componentes
import InfoPrincipal from "./infoPrincipal";
import InfoEmpresarioPr from "./infoEmpresarioPr";
import InfoEmpresarioSec from "./infoEmpresarioSec";
import InfoEmpresa from "./infoEmpresa";
import InfoAdicional from "./infoAdicional";
import Loader from "../../../../common/components/Loader";
import PageError from "../../../../common/components/Error";

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

const CUEmpresario = ({ isEdit }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {},
        objInfoEmpresarioPr: {},
        arrInfoEmpresarioSec: [],
        objInfoEmpresa: {},
        objInfoAdicional: {},
    });

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

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

    const { intId } = useParams();

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

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
                    url: `${
                        isEdit
                            ? process.env
                                  .REACT_APP_API_TRANSFORMA_INTERESADOS_UPDATEREGISTRO
                            : process.env.REACT_APP_API_TRANSFORMA_INTERESADOS_SETREGISTRO
                    }`,
                    data,
                    transformRequest: [
                        (data) => {
                            let newData = {
                                objEmpresario: {
                                    strSede: data.objInfoPrincipal.strSede,
                                    strModalidadIngreso:
                                        data.objInfoPrincipal.strModalidadIngreso,
                                    dtFechaVinculacion: data.objInfoPrincipal
                                        .dtFechaVinculacion
                                        ? format(
                                              data.objInfoPrincipal.dtFechaVinculacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strEstadoVinculacion:
                                        data.objInfoPrincipal.strEstadoVinculacion,
                                    strTipoVinculacion:
                                        data.objInfoPrincipal.strTipoVinculacion,
                                    strURLFileLogoEmpresa:
                                        data.objInfoEmpresarioPr.strURLFileLogoEmpresa,
                                    strEstadoNegocio:
                                        data.objInfoEmpresarioPr.strEstadoNegocio,
                                    strCuandoComienzaEmpresa:
                                        data.objInfoEmpresarioPr.strCuandoComienzaEmpresa,
                                    strNombreMarca:
                                        data.objInfoEmpresarioPr.strNombreMarca,
                                    dtFechaFundacion: data.objInfoEmpresarioPr
                                        .dtFechaFundacion
                                        ? format(
                                              data.objInfoEmpresarioPr.dtFechaFundacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strLugarOperacion:
                                        data.objInfoEmpresarioPr.strLugarOperacion,
                                    strDireccionResidencia: data.objInfoEmpresarioPr.strDireccionResidencia,
                                    strDepartamento:
                                        data.objInfoEmpresarioPr.strDepartamento,
                                    strCiudad: data.objInfoEmpresarioPr.strCiudad,
                                    strBarrio: data.objInfoEmpresarioPr.strBarrio,
                                    strEstrato: data.objInfoEmpresarioPr.strEstrato,
                                    strSectorEconomico:
                                        data.objInfoEmpresarioPr.strSectorEconomico,
                                    strCategoriaProducto:
                                        data.objInfoEmpresarioPr.strCategoriaProducto,
                                    strCategoriaServicio:
                                        data.objInfoEmpresarioPr.strCategoriaServicio,
                                    arrCategoriasSecundarias:
                                        data.objInfoEmpresarioPr.arrCategoriasSecundarias,
                                    strOtraCategoria:
                                        data.objInfoEmpresarioPr.strOtraCategoria,
                                    strDescProductosServicios:
                                        data.objInfoEmpresarioPr
                                            .strDescProductosServicios,
                                    strMateriaPrima:
                                        data.objInfoEmpresarioPr.strMateriaPrima,
                                    strNombreTecnica:
                                        data.objInfoEmpresarioPr.strNombreTecnica,
                                    strTiempoDedicacion:
                                        data.objInfoEmpresarioPr.strTiempoDedicacion,
                                    btGeneraEmpleo:
                                        data.objInfoEmpresarioPr.btGeneraEmpleo,
                                    intNumeroEmpleados:
                                        data.objInfoEmpresarioPr.intNumeroEmpleados,
                                    dblValorVentasMes:
                                        data.objInfoEmpresarioPr.dblValorVentasMes,
                                    arrFormasComercializacion:
                                        data.objInfoEmpresarioPr
                                            .arrFormasComercializacion,
                                    arrMediosDigitales:
                                        data.objInfoEmpresarioPr.arrMediosDigitales,
                                    btGrupoAsociativo:
                                        data.objInfoEmpresarioPr.btGrupoAsociativo,
                                    strAsociacionUnidadProdIndividual:
                                        data.objInfoEmpresarioPr
                                            .strAsociacionUnidadProdIndividual,
                                },
                                arrEmpresarioSecundario: data.arrInfoEmpresarioSec,
                                objInfoEmpresa: {
                                    strURLFileLogoEmpresa:
                                        data.objInfoEmpresa.strURLFileLogoEmpresa,
                                    strEstadoNegocio:
                                        data.objInfoEmpresa.strEstadoNegocio,
                                    strCuandoComienzaEmpresa:
                                        data.objInfoEmpresa.strCuandoComienzaEmpresa,
                                    strNombreMarca: data.objInfoEmpresa.strNombreMarca,
                                    dtFechaFundacion: data.objInfoEmpresa.dtFechaFundacion
                                        ? format(
                                              data.objInfoEmpresa.dtFechaFundacion,
                                              "yyyy-MM-dd"
                                          )
                                        : null,
                                    strLugarOperacion:
                                        data.objInfoEmpresa.strLugarOperacion,
                                    strDireccionResidencia: data.objInfoEmpresa.strDireccionResidencia,
                                    strDepartamento: data.objInfoEmpresa.strDepartamento,
                                    strCiudad: data.objInfoEmpresa.strCiudad,
                                    strBarrio: data.objInfoEmpresa.strBarrio,
                                    strEstrato: data.objInfoEmpresa.strEstrato,
                                    strSectorEconomico:
                                        data.objInfoEmpresa.strSectorEconomico,
                                    strCategoriaProducto:
                                        data.objInfoEmpresa.strCategoriaProducto,
                                    strCategoriaServicio:
                                        data.objInfoEmpresa.strCategoriaServicio,
                                    arrCategoriasSecundarias:
                                        data.objInfoEmpresa.arrCategoriasSecundarias,
                                    strOtraCategoria:
                                        data.objInfoEmpresa.strOtraCategoria,
                                    strDescProductosServicios:
                                        data.objInfoEmpresa.strDescProductosServicios,
                                    strMateriaPrima: data.objInfoEmpresa.strMateriaPrima,
                                    strNombreTecnica:
                                        data.objInfoEmpresa.strNombreTecnica,
                                    strTiempoDedicacion:
                                        data.objInfoEmpresa.strTiempoDedicacion,
                                    btGeneraEmpleo: data.objInfoEmpresa.btGeneraEmpleo,
                                    intNumeroEmpleados:
                                        data.objInfoEmpresa.intNumeroEmpleados,
                                    dblValorVentasMes:
                                        data.objInfoEmpresa.dblValorVentasMes,
                                    arrFormasComercializacion:
                                        data.objInfoEmpresa.arrFormasComercializacion,
                                    arrMediosDigitales:
                                        data.objInfoEmpresa.arrMediosDigitales,
                                    btGrupoAsociativo:
                                        data.objInfoEmpresa.btGrupoAsociativo,
                                    strAsociacionUnidadProdIndividual:
                                        data.objInfoEmpresa
                                            .strAsociacionUnidadProdIndividual,
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
        [token, data, isEdit]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (isEdit) {
            setLoadingGetData(true);

            async function getData() {
                await refFntGetData.current({ intId }).then((res) => {
                    let data = res?.[0];

                    setData(data);

                    setLoadingGetData(false);
                });
            }

            getData();
        }
    }, [isEdit, intId]);

    useEffect(() => {
        if (isEdit) {
            reset(data);
        }
    }, [data, reset, isEdit]);

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
        return <Redirect to="/transforma/asesor/empresario/read/all" />;
    }

    if (loadingGetData) {
        return <Loader />;
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
        <Grid
            container
            direction="row"
            spacing={3}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        color="inherit"
                        component={RouterLink}
                        to="/transforma"
                        className={classes.link}
                    >
                        <HomeIcon className={classes.icon} />
                        Inicio
                    </Link>

                    <Link
                        color="inherit"
                        component={RouterLink}
                        to="/transforma/asesor/empresario/read/all"
                        className={classes.link}
                    >
                        Empresarios
                    </Link>

                    <Typography color="textPrimary" className={classes.link}>
                        {isEdit ? "Edición" : "Registro"}
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Container className={classes.containerPR}>
                    <Paper className={classes.paper}>
                        {loading ? (
                            <LinearProgress className={classes.linearProgress} />
                        ) : null}

                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            style={{ padding: "25px" }}
                        >
                            <Grid item xs={12}>
                                <Box
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
                                            style={{ fontWeight: "bold" }}
                                            color="primary"
                                            variant="h6"
                                        >
                                            {isEdit
                                                ? "EDITAR EMPRESA"
                                                : "REGISTRAR EMPRESA"}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <IconButton color="secondary" size="large">
                                            <Tooltip title="Importar información">
                                                <SvgIcon>
                                                    <path
                                                        id="icons8_microsoft_excel"
                                                        d="M14.5,3,2,5.556V23.444L14.5,26ZM17,5.556V8.111h2.5v2.556H17v2.556h2.5v2.556H17v2.556h2.5v2.556H17v2.556h8.75A1.265,1.265,0,0,0,27,22.167V6.833a1.265,1.265,0,0,0-1.25-1.278Zm5,2.556h2.5v2.556H22ZM4.72,9.768H6.941L8.1,12.6a5.7,5.7,0,0,1,.237.8h.032a8.475,8.475,0,0,1,.251-.826L9.9,9.768h2.026L9.51,14.458,12,19.232H9.839L8.448,16.147a2.67,2.67,0,0,1-.166-.631h-.02c-.031.146-.094.364-.188.656l-1.4,3.06H4.5L7.076,14.5ZM22,13.222h2.5v2.556H22Zm0,5.111h2.5v2.556H22Z"
                                                        transform="translate(-2 -3)"
                                                    />
                                                </SvgIcon>
                                            </Tooltip>
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="caption">
                                    Todos los campos marcados con (*) son obligatorios.
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <InfoPrincipal
                                    control={control}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoEmpresarioPr
                                    control={control}
                                    disabled={loading}
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <InfoEmpresarioSec
                                    control={control}
                                    disabled={loading}
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
                                    errors={errors}
                                    setValue={setValue}
                                    setError={setError}
                                    clearErrors={clearErrors}
                                />
                            </Grid>

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
    );
};

export default CUEmpresario;
