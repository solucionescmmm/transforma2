/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useRef, useState } from "react";
import {
    Alert,
    Avatar,
    Breadcrumbs,
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

//Librerias
import { Link as RouterLink, useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

//Iconos
import {
    Home as HomeIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

// Componentes
import CUEmpresario from "./pageCUTercero";
import useGetEmpresarios from "../../../common/hooks/useGetEmpresarios";
import axios from "axios";
import PageError from "../../../common/components/Error";
import { parseISO } from "date-fns";

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

const SearchEmpresario = ({ isEdit, strDoc, inModal, resetModal, closeModal }) => {
    const [documento, setDocumento] = useState("");
    const [hiddenSearch, setHiddenSearch] = useState(false);
    const [data, setData] = useState();
    const [flagGetdata, setFlagGetData] = useState(false);
    const [sendData, setSendData] = useState();
    const [bitBuscar, setBitBuscar] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================

    const { goBack } = useHistory();
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onSubmit = (data) => {
        setDocumento(data.documento);

        setFlagGetData(true);
    };

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

    async function getData() {
        setLoadingGetData(true);

        await refFntGetData
            .current({ strDocumento: documento })
            .then((res) => {
                if (res.data.error) {
                    throw new Error(res.data.msg);
                }

                if (res.data?.data?.[0]) {
                    let data = res.data.data?.[0];
                    const objEmprPrincipal = data;

                    setData({
                        intIdIdea: data.objInfoIdeaEmpresario?.intIdIdea,
                        objIdeaEmpresario: data.objInfoIdeaEmpresario,
                        objInfoPrincipal: {},
                        objInfoEmpresarioPr: {
                            intId: objEmprPrincipal.intId,
                            strNombres: objEmprPrincipal.strNombres || "",
                            strApellidos: objEmprPrincipal.strApellidos || "",
                            strTipoDocto: objEmprPrincipal.strTipoDocto || "",
                            strNroDocto: objEmprPrincipal.strNroDocto || "",
                            strLugarExpedicionDocto:
                                objEmprPrincipal.strLugarExpedicionDocto || "",
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
                            strCelular1: objEmprPrincipal.strCelular1 || objEmprPrincipal.strCelular || "",
                            strCelular2: objEmprPrincipal.strCelular2 || "",
                            strCorreoElectronico1:
                                objEmprPrincipal.strCorreoElectronico1 || objEmprPrincipal.strCorreoElectronico || "",
                            strCorreoElectronico2:
                                objEmprPrincipal.strCorreoElectronico2 || "",
                            strNivelEducativo:
                                objEmprPrincipal.strNivelEducativo || "",
                            strTitulos: objEmprPrincipal.strTitulos || "",
                            strCondicionDiscapacidad:
                                objEmprPrincipal.strCondicionDiscapacidad || "",
                            strEstrato: objEmprPrincipal.strEstrato || "",
                            btPerfilSensible: objEmprPrincipal.btPerfilSensible || "",
                            arrDepartamento:
                                objEmprPrincipal.arrDepartamento || [],
                            arrCiudad: objEmprPrincipal.arrCiudad || [],
                            strBarrio: objEmprPrincipal.strBarrio || "",
                            strDireccionResidencia:
                                objEmprPrincipal.strDireccionResidencia || "",
                            strURLFileFoto:
                                objEmprPrincipal.strUrlFileFoto || "",
                            strEstado: objEmprPrincipal.strEstado || "",
                            intIdEstado: objEmprPrincipal.intIdEstado || "",
                        },
                    });
                } else {
                    setData();
                    setSendData(false);

                }

                setBitBuscar(true);
                setLoadingGetData(false);
                setErrorGetData({ flag: false, msg: "" });
                setFlagGetData(false);
            })
            .catch((error) => {
                setErrorGetData({ flag: true, msg: error.message });
                setLoadingGetData(false);
                setFlagGetData(false);
                setSendData(false);
            });
    }

    console.log(data)

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagGetdata) {
            getData(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagGetdata]);

    useEffect(() => {
        return () => {
            setData();
            setDocumento();
            setBitBuscar(false);
        };
    }, [hiddenSearch]);

    useEffect(() => {
        if (strDoc) {
            setDocumento(strDoc);
        }
    }, [strDoc]);

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

    if (hiddenSearch || isEdit) {
        return (
            <CUEmpresario
                inModal={inModal}
                values={data}
                isEdit={isEdit}
                resetSearch={setHiddenSearch}
                closeModal={closeModal}
                resetModal={resetModal}
            />
        );
    }

    return (
        <Grid container direction="row" spacing={3}>
            {!inModal && (
                <Fragment>
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
                                to="/transforma/asesor/terceros/read/all"
                                className={classes.link}
                            >
                                Terceros
                            </Link>

                            <Typography
                                color="textPrimary"
                                className={classes.link}
                            >
                                Registro
                            </Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={() => goBack()}
                            startIcon={<ChevronLeftIcon />}
                            size="small"
                            color="inherit"
                        >
                            regresar
                        </Button>
                    </Grid>
                </Fragment>
            )}

            <Grid item xs={12}>
                <Container className={classes.containerPR}>
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
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
                                            REGISTRAR PERSONA EXTERNA
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={9} md={11}>
                                <Controller
                                    defaultValue={documento}
                                    name="documento"
                                    render={({ field: { name, value, onChange } }) => (
                                        <TextField
                                            label="Número de documento"
                                            name={name}
                                            value={value.trim()}
                                            onChange={(e) => {
                                                onChange(e)
                                                setBitBuscar(false)
                                                setData()
                                            }}
                                            required
                                            fullWidth
                                            variant="standard"
                                            error={
                                                errors?.documento
                                                    ? true
                                                    : false
                                            }
                                            helperText={
                                                errors?.documento
                                                    ?.message ||
                                                "Digita el número de documento"
                                            }
                                        />
                                    )}
                                    control={control}
                                    rules={{
                                        required:
                                            "Por favor, digita el número de documento",
                                        validate: (value) => {
                                            if (value === " ") {
                                                return "Por favor, digita el número de documento";
                                            }
                                        },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={3} md={1}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    style={{ marginTop: "15px" }}
                                    fullWidth
                                    type="submit"
                                    disabled={loadingGetData}
                                >
                                    Buscar
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                {data && !loadingGetData && documento && (
                                    <Alert severity="warning">
                                        Se encontro un registro con los
                                        siguientes datos:
                                        <Avatar
                                            style={{ margin: "10px" }}
                                            alt={
                                                data.objInfoEmpresarioPr
                                                    .strNombres
                                            }
                                            sx={{ width: 80, height: 80 }}
                                            src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${data.objInfoEmpresarioPr.strURLFileFoto}`}
                                        />
                                        <p>
                                            <b>Nombre: </b>{" "}
                                            {
                                                data.objInfoEmpresarioPr
                                                    .strNombres
                                            }{" "}
                                        </p>
                                        <p>
                                            <b>Apellidos: </b>{" "}
                                            {
                                                data.objInfoEmpresarioPr
                                                    .strApellidos
                                            }{" "}
                                        </p>
                                        <p>
                                            <b>
                                                {
                                                    data.objInfoEmpresarioPr
                                                        .strTipoDocto
                                                }
                                                :{" "}
                                            </b>{" "}
                                            {`${data.objInfoEmpresarioPr.strNroDocto} - (${data.objInfoEmpresarioPr.strLugarExpedicionDocto})`}
                                        </p>
                                        <p>
                                            <b>Departamento: </b>{" "}
                                            {
                                                data.objInfoEmpresarioPr
                                                    .arrDepartamento.region_name
                                            }{" "}
                                        </p>
                                        <p>
                                            <b>Ciudad: </b>{" "}
                                            {
                                                data.objInfoEmpresarioPr
                                                    .arrCiudad.city_name
                                            }{" "}
                                        </p>
                                        <p>
                                            <b>Dirección de residencia: </b>{" "}
                                            {
                                                data.objInfoEmpresarioPr
                                                    .strDireccionResidencia || "No diligenciado"
                                            }{" "}
                                        </p>
                                    </Alert>
                                )}

                                {loadingGetData && (
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="100%"
                                        width="100%"
                                    >
                                        <CircularProgress size={30} />
                                    </Box>
                                )}

                                {!documento && (
                                    <Alert severity="info">
                                        Por favor digita el documento para
                                        proceder a la busqueda de la persona
                                    </Alert>
                                )}

                                {!data && sendData === false && documento && (
                                    <Alert severity="info">
                                        No se ha encontrado registros asociados
                                        al documento digitado
                                    </Alert>
                                )} 
                                
                                {data && documento && (
                                    data?.objInfoEmpresarioPr?.strEstado === "Inactivo" 
                                        ? 
                                        <Grid item xs={12}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "row-reverse",
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    disabled={loadingGetData}
                                                    onClick={() => {
                                                        setHiddenSearch(true);
                                                        setData({
                                                            objInfoPrincipal: data?.objInfoEmpresarioPr
                                                        });
                                                    }}
                                                >
                                                    {"Agregar Empresario inactivo como tercero"}
                                                </Button>
                                            </Box>
                                        </Grid> 
                                        :
                                    <Alert severity="warning">
                                        Lo sentimos no puedes volver a registrar
                                        a esta persona
                                    </Alert>
                                )}

                                <div style={{ width: "500px" }}></div>
                            </Grid>

                            {!data && bitBuscar && (
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            disabled={loadingGetData}
                                            onClick={() => {
                                                setHiddenSearch(true);
                                                setData({
                                                    objInfoPrincipal: {
                                                        strNroDocto: documento,
                                                    },
                                                });
                                            }}
                                        >
                                            {"nuevo registro"}
                                        </Button>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

export default SearchEmpresario;
