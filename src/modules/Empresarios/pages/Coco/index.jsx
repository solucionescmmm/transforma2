import { Fragment, useEffect, useState } from "react";

//Librerias
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";
import useGetHistorico from "../../hooks/useGetHistorico";
import useGetRutasActivas from "../../hooks/useGetRutasActivas";

// Componentes MUI
import {
    Avatar,
    Breadcrumbs,
    Grid,
    Link,
    Paper,
    Typography,
    Box,
    Button,
    Card,
    CardContent,
    Tab,
} from "@mui/material";

//Iconos
import {
    Home as HomeIcon,
    EmailOutlined as EmailIcon,
    PhoneAndroidOutlined as PhoneIcon,
    PlaceOutlined as PlaceIcon,
} from "@mui/icons-material";

//Estilos
import { makeStyles } from "@mui/styles";
import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

// Componentes
import Routes from "../../../../routes/coco.routes";
import CardPersonas from "./cardPersonas";
import CardGrafica from "./cardGrafica";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CardAcom from "./cardAcomp";
import ReadTareas from "../Tareas";
import { calcularEdad } from "../../../../common/functions/edad";

const styles = makeStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const Coco = () => {
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();
    const { data: dataPersonas, refreshGetData } = useGetEmpresarios({
        autoload: true,
        intId,
    });
    const { data: dataHistorico } = useGetHistorico({
        autoload: true,
        intIdIdea: intId,
    });

    const { data: dataRuta } = useGetRutasActivas({
        autoload: true,
        intIdIdea: intId,
    });
    const location = useHistory();

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [route, setRoute] = useState({
        location: "Inicio",
        params: {
            intIdIdea: intId,
        },
    });

    const [objInteresado, setObjInteresado] = useState({});
    const [strEtapa, setStrEtapa] = useState("N/A");
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const onChangeRoute = (location, params) => {
        setRoute((prevState) => ({
            location: location || prevState.location || "Inicio",
            params: {
                ...params,
                intIdIdea: intId,
            },
        }));
    };

    const getRealTab = (location) => {
        if (location.startsWith("Persona")) {
            return "Personas";
        }

        if (location.match(/Comentarios/gi)) {
            return "Comentarios";
        }

        if (location.match(/Diag/gi)) {
            return "DiagnosticoCoco";
        }

        if (location.match(/Ruta/gi)) {
            return "Rutas";
        }

        if (location.match(/Acomp/gi) || location.match(/Sesion/gi)) {
            return "Acompañamientos";
        }

        if (location.match(/Docum/gi)) {
            return "Documentos";
        }

        if (location.startsWith("Indicadores")) {
            return "Indicadores";
        }

        if (location.startsWith("Tareas") || location.startsWith("CreateTareas") || location.startsWith("EditTareas") ) {
            return "Tareas";
        }

        return "Inicio";
    };
    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoading(true);

        if (dataPersonas && dataPersonas.length > 0) {
            setObjInteresado(dataPersonas[0]);
            setLoading(false);
        }
    }, [dataPersonas]);

    useEffect(() => {
        setLoading(true);

        if (dataHistorico) {
            setStrEtapa(
                dataHistorico?.arrEtapaDllo?.at(-1)?.strClasificacionFecha
            );
            setLoading(false);
        }
    }, [dataHistorico]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loading) {
        return <Loader />;
    }

    if (!dataPersonas && !dataHistorico) {
        return <Loader />;
    }

    if (dataPersonas?.error) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor contacta con soporte técnico para más información."
                title={dataPersonas.msg}
            />
        );
    }

    return (
        <Fragment>
            <Grid
                container
                direction="row"
                spacing={2}
                sx={{ minWidth: "80vw", marginBottom: "30px" }}
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
                            Personas empresarias
                        </Link>

                        <Typography color="textPrimary">
                            {objInteresado?.objInfoEmpresa?.strNombreMarca ||
                                ""}
                        </Typography>
                    </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                    <Paper
                        sx={{
                            padding: "12px",
                            marginTop: "30px",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "30px",
                        }}
                        elevation={0}
                    >
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                            }}
                            alt="logo"
                            src={`${process.env.REACT_APP_API_BACK_PROT}://${
                                process.env.REACT_APP_API_BACK_HOST
                            }${process.env.REACT_APP_API_BACK_PORT}${
                                objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strUrlFileFoto || ""
                            }`}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <b>
                                    {" "}
                                    {objInteresado?.objInfoEmpresa
                                        ?.strNombreMarca || ""}
                                </b>
                            </Typography>

                            <Typography>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strNombres +
                                    " " +
                                    objInteresado?.objEmpresario
                                        ?.filter(
                                            (p) =>
                                                p.strTipoEmpresario ===
                                                "Principal"
                                        )
                                        ?.at(0)?.strApellidos || ""}
                            </Typography>

                            <Typography>
                                <span
                                    style={{
                                        color: "#00BAB3",
                                        marginRight: "10px",
                                    }}
                                >
                                    {objInteresado?.objEmpresario
                                        ?.filter(
                                            (p) =>
                                                p.strTipoEmpresario ===
                                                "Principal"
                                        )
                                        ?.at(0)?.strEstadoVinculacion || ""}
                                </span>

                                <Button
                                    size="small"
                                    sx={{
                                        padding: "0",
                                        letterSpacing: "0",
                                        fontSize: "12px",
                                    }}
                                    variant="contained"
                                    onClick={() =>
                                        location.push(
                                            `/transforma/asesor/empresario/edit/${intId}`
                                        )
                                    }
                                >
                                    Editar
                                </Button>
                            </Typography>
                            {objInteresado?.objEmpresario
                                ?.filter(
                                    (p) => p.strTipoEmpresario === "Principal"
                                )
                                ?.at(0)?.btPerfilSensible ? (
                                <Typography color="red" variant="body1">
                                    Perfil sensible
                                </Typography>
                            ) : null}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexGrow: "1",
                                marginTop: "5px",
                                flexDirection: "column",
                            }}
                        >
                            <Typography variant="caption">
                                <b>Fecha de vinculación: </b>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.dtFechaVinculacion || ""}
                            </Typography>

                            <Typography variant="caption">
                                <b>Sede: </b>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strSede || ""}
                            </Typography>

                            <Typography variant="caption">
                                <b>Ruta activa: </b>
                                {dataRuta ? "Si" : "No"}
                            </Typography>

                            <Typography variant="caption">
                                <b>Etapa de desarrollo: </b>
                                {strEtapa}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                spacing={0}
                sx={{ marginBottom: "12px" }}
            >
                <Grid item xs={12}>
                    <TabContext value={getRealTab(route.location)}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={(_, value) =>
                                    onChangeRoute(value, { ...route.params })
                                }
                                aria-label="menu"
                            >
                                <Tab label="Perfil" value="Inicio" />
                                <Tab label="Personas" value="Personas" />
                                <Tab label="Comentarios" value="Comentarios" />
                                <Tab label="Tareas" value="Tareas" />
                                <Tab
                                    label="Diagnósticos"
                                    value="DiagnosticoCoco"
                                />
                                <Tab label="Rutas" value="Rutas" />
                                <Tab
                                    label="Acompañamientos"
                                    value="Acompañamientos"
                                />
                                <Tab label="Indicadores" value="Indicadores" />
                                <Tab label="Documentos" value="Documentos" />
                            </TabList>
                        </Box>

                        <TabPanel value="Inicio" sx={{ width: "100%" }}>
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ display: "flex", alignItems: "stretch" }}
                            >
                                <Grid item xs={12} md={6} sx={{ flex: "1" }}>
                                    <Card elevation={1} sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Grid container direction="row">
                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            width: "100%",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <Box>
                                                            <Avatar
                                                                sx={{
                                                                    width: 50,
                                                                    height: 50,
                                                                }}
                                                                alt="logo"
                                                                src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${objInteresado?.objInfoEmpresa?.strURLFileLogoEmpresa}`}
                                                            />
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                width: "100%",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    textAlign:
                                                                        "center",
                                                                }}
                                                            >
                                                                <b>
                                                                    Información
                                                                    de la
                                                                    empresa
                                                                </b>
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexGrow: "1",
                                                            marginTop: "10px",
                                                            flexDirection:
                                                                "column",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#00BAB3",
                                                                }}
                                                            >
                                                                Categoría:{" "}
                                                            </span>
                                                            {objInteresado
                                                                ?.objInfoEmpresa
                                                                ?.strCategoriaProducto ||
                                                                objInteresado
                                                                    ?.objInfoEmpresa
                                                                    ?.strCategoriaServicio ||
                                                                "No registro"}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#00BAB3",
                                                                }}
                                                            >
                                                                Descripción:{" "}
                                                            </span>
                                                            {objInteresado
                                                                ?.objInfoEmpresa
                                                                ?.strDescProductosServicios ||
                                                                "No registro"}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#00BAB3",
                                                                }}
                                                            >
                                                                Dirección:{" "}
                                                            </span>
                                                            {objInteresado
                                                                ?.objInfoEmpresa
                                                                ?.strDireccionResidencia ||
                                                                "No registro"}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#00BAB3",
                                                                }}
                                                            >
                                                                NIT:{" "}
                                                            </span>
                                                            {""}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#00BAB3",
                                                                }}
                                                            >
                                                                Instagram:{" "}
                                                            </span>
                                                            {objInteresado?.objInfoEmpresa?.arrMediosDigitales.find(
                                                                (x) =>
                                                                    x.label ===
                                                                    "Instagram"
                                                            )?.value ||
                                                                "No registro"}
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            <span
                                                                style={{
                                                                    color: "#00BAB3",
                                                                }}
                                                            >
                                                                Facebook:{" "}
                                                            </span>
                                                            {objInteresado?.objInfoEmpresa?.arrMediosDigitales.find(
                                                                (x) =>
                                                                    x.label ===
                                                                    "Facebook"
                                                            )?.value ||
                                                                "No registro"}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ flex: "1" }}>
                                    <Card elevation={1} sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        textAlign: "center",
                                                        marginTop: "10px",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <b>Acompañamientos</b>
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection:
                                                            "columns",
                                                        alignContent: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 800,
                                                            height: 118,
                                                            paddingLeft: "10px",
                                                        }}
                                                    >
                                                        <CardAcom
                                                            intIdIdea={intId}
                                                        />
                                                    </Box>
                                                </Box>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row-reverse",
                                                            gap: 1,
                                                            paddingRight: "5px",
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() =>
                                                                onChangeRoute(
                                                                    "Acompañamientos"
                                                                )
                                                            }
                                                            sx={{
                                                                fontSize:
                                                                    "11px",
                                                            }}
                                                        >
                                                            Ver más
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ flex: "1" }}>
                                    <Card elevation={1} sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        textAlign: "center",
                                                        marginTop: "10px",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <b>Persona principal</b>
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexGrow: "1",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <EmailIcon
                                                        htmlColor="#00BAB3"
                                                            className={
                                                                classes.icon
                                                            }
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                                marginTop:
                                                                    "4px",
                                                            }}
                                                        >
                                                            {objInteresado?.objEmpresario
                                                                ?.filter(
                                                                    (p) =>
                                                                        p.strTipoEmpresario ===
                                                                        "Principal"
                                                                )
                                                                ?.at(0)
                                                                ?.strCorreoElectronico1 ||
                                                                "No registro"}
                                                        </Typography>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <PhoneIcon
                                                        htmlColor="#00BAB3"
                                                            className={
                                                                classes.icon
                                                            }
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                                marginTop:
                                                                    "4px",
                                                            }}
                                                        >
                                                            {objInteresado?.objEmpresario
                                                                ?.filter(
                                                                    (p) =>
                                                                        p.strTipoEmpresario ===
                                                                        "Principal"
                                                                )
                                                                ?.at(0)
                                                                ?.strCelular1 ||
                                                                "No registro"}
                                                        </Typography>
                                                    </Box>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row",
                                                        }}
                                                    >
                                                        <PlaceIcon
                                                            className={
                                                                classes.icon
                                                            }
                                                            htmlColor="#00BAB3"
                                                        />
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    "12px",
                                                                marginTop:
                                                                    "4px",
                                                            }}
                                                        >
                                                            {objInteresado?.objEmpresario
                                                                ?.filter(
                                                                    (p) =>
                                                                        p.strTipoEmpresario ===
                                                                        "Principal"
                                                                )
                                                                ?.at(0)
                                                                ?.strDireccionResidencia ||
                                                                "No registro"}
                                                        </Typography>
                                                    </Box>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            marginLeft: "10px"
                                                        }}

                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Tipo de documento:{" "}
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strTipoDocto ||
                                                            "No registro"}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            marginLeft: "10px"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Número de documento:{" "}
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strNroDocto ||
                                                            "No registro"}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                            marginLeft: "10px"
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Edad:{" "}
                                                        </span>
                                                        {calcularEdad(
                                                            objInteresado?.objEmpresario
                                                                ?.filter(
                                                                    (p) =>
                                                                        p.strTipoEmpresario ===
                                                                        "Principal"
                                                                )
                                                                ?.at(0)
                                                                ?.dtFechaNacimiento
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={6} sx={{ flex: "1" }}>
                                    <Card elevation={1} sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Grid item xs={12}>
                                                <Typography
                                                    sx={{
                                                        textAlign: "center",
                                                        marginTop: "10px",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <b>Personas secundarias</b>
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection:
                                                            "columns",
                                                        alignContent: "center",
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 800,
                                                            height: 118,
                                                            paddingLeft: "10px",
                                                        }}
                                                    >
                                                        <CardPersonas
                                                            intIdIdea={intId}
                                                            arrPerson={
                                                                objInteresado?.objEmpresario
                                                            }
                                                        />
                                                    </Box>
                                                </Box>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row-reverse",
                                                            gap: 1,
                                                            paddingRight: "5px",
                                                        }}
                                                    >
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() =>
                                                                onChangeRoute(
                                                                    "Personas"
                                                                )
                                                            }
                                                            sx={{
                                                                fontSize:
                                                                    "11px",
                                                            }}
                                                        >
                                                            Ver más
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12}>
                                    <ReadTareas
                                        onChangeRoute={onChangeRoute}
                                        inModal
                                        intIdIdea={route.params.intIdIdea}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>

                        <TabPanel value="Indicadores" sx={{ width: "100%" }}>
                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <Card elevation={0}>
                                        <CardContent sx={{ padding: "0px" }}>
                                            <Grid container direction="row">
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sx={{
                                                        color: "#00BAB3",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            padding: "1px",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flexGrow: 1,
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                Ventas
                                                            </b>
                                                        </p>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "columns",
                                                            alignContent:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 290,
                                                                height: 118,
                                                            }}
                                                        >
                                                            <CardGrafica
                                                                intIdIdea={
                                                                    intId
                                                                }
                                                                type="Ventas"
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card elevation={0}>
                                        <CardContent sx={{ padding: "0px" }}>
                                            <Grid container direction="row">
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sx={{
                                                        color: "#00BAB3",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            padding: "1px",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flexGrow: 1,
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                Empleados
                                                            </b>
                                                        </p>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "columns",
                                                            alignContent:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 290,
                                                                height: 118,
                                                            }}
                                                        >
                                                            <CardGrafica
                                                                intIdIdea={
                                                                    intId
                                                                }
                                                                type="Empleados"
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card elevation={0}>
                                        <CardContent sx={{ padding: "0px" }}>
                                            <Grid container direction="row">
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sx={{
                                                        color: "#00BAB3",
                                                    }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            padding: "1px",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <p
                                                            style={{
                                                                flexGrow: 1,
                                                            }}
                                                        >
                                                            <b
                                                                style={{
                                                                    fontSize: 16,
                                                                }}
                                                            >
                                                                Etapa desarrollo
                                                            </b>
                                                        </p>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "columns",
                                                            alignContent:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: 290,
                                                                height: 118,
                                                            }}
                                                        >
                                                            <CardGrafica
                                                                intIdIdea={
                                                                    intId
                                                                }
                                                                type="Desarrollo"
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        <Routes
                            route={route}
                            onChangeRoute={onChangeRoute}
                            refreshGlobal={refreshGetData}
                        />
                    </TabContext>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Coco;
