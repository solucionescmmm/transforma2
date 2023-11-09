import { Fragment, useEffect, useState } from "react";

//Librerias
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

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
import { Home as HomeIcon } from "@mui/icons-material";
import TeamIcon from "../../../../static/img/icons/Personas.png";
import DocumentIcon from "../../../../static/img/icons/Diagnosticos.png";
import RouteIcon from "../../../../static/img/icons/Rutas.png";
import CommentsIcon from "../../../../static/img/icons/Comentarios.png";
import NotesIcon from "../../../../static/img/icons/tareas.png";
import FoldersIcon from "../../../../static/img/icons/Documentos.png";

//Estilos
import { makeStyles } from "@mui/styles";
import Loader from "../../../../common/components/Loader";
import ErrorPage from "../../../../common/components/Error";

// Componentes
import Routes from "../../../../routes/coco.routes";
import CardPersonas from "./cardPersonas";
import CardGrafica from "./cardGrafica";
import CardTareas from "./cardTareas";
import CardComentarios from "./cardComentarios";
import CardDocumentos from "./cardDocumentos";
import CardRutas from "./cardRutas";
import CardDiagnosticos from "./cardDiagnosticos";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import CardAcom from "./cardAcomp";
import ReadTareas from "../Tareas";

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

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loading) {
        return <Loader />;
    }

    if (!dataPersonas) {
        return <Loader />;
    }

    if (dataPersonas.error) {
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
                                width: 50,
                                height: 50,
                            }}
                            alt="logo"
                            src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${objInteresado.objInfoEmpresa.strURLFileLogoEmpresa}`}
                        />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Representante:
                                </span>
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
                                <span style={{ color: "#00BAB3" }}>
                                    Nombre de la empresa:
                                </span>
                                {objInteresado?.objInfoEmpresa
                                    ?.strNombreMarca || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Categoría:
                                </span>
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Teléfono:
                                </span>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strCelular1 || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Estado:
                                </span>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strEstadoVinculacion || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>NIT:</span>
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexGrow: "1",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Correo:
                                </span>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strCorreoElectronico1 || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>Sede:</span>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.strSede || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Fecha de vinculación:
                                </span>
                                {objInteresado?.objEmpresario
                                    ?.filter(
                                        (p) =>
                                            p.strTipoEmpresario === "Principal"
                                    )
                                    ?.at(0)?.dtFechaVinculacion || ""}
                            </Typography>
                        </Box>

                        <Box sx={{ margin: "auto" }}>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    location.push(
                                        `/transforma/asesor/empresario/edit/${intId}`
                                    )
                                }
                            >
                                Editar
                            </Button>
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
                                <Tab label="Perfíl" value="Inicio" />
                                <Tab label="Personas" value="Personas" />
                                <Tab label="Comentarios" value="Comentarios" />
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
                                                                src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${objInteresado.objInfoEmpresa.strURLFileLogoEmpresa}`}
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
                                                                Categoría:
                                                            </span>
                                                            {objInteresado
                                                                ?.objInfoEmpresa
                                                                ?.strCategoriaProducto ||
                                                                objInteresado
                                                                    ?.objInfoEmpresa
                                                                    ?.strCategoriaServicio ||
                                                                ""}
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
                                                                Descripción:
                                                            </span>
                                                            {objInteresado
                                                                ?.objInfoEmpresa
                                                                ?.strDescProductosServicios ||
                                                                ""}
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
                                                                Dirección:
                                                            </span>
                                                            {objInteresado
                                                                ?.objInfoEmpresa
                                                                ?.strDireccionResidencia ||
                                                                ""}
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
                                                                NIT:
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
                                                                Instagram:
                                                            </span>
                                                            {objInteresado?.objInfoEmpresa?.arrMediosDigitales.find(
                                                                (x) =>
                                                                    x.label ===
                                                                    "Instagram"
                                                            )?.value || ""}
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
                                                                Facebook:
                                                            </span>
                                                            {objInteresado?.objInfoEmpresa?.arrMediosDigitales.find(
                                                                (x) =>
                                                                    x.label ===
                                                                    "Facebook"
                                                            )?.value || ""}
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
                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Email:
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strCorreoElectronico1 ||
                                                            ""}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Celular:
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strCelular1 || ""}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Dirección:
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strDireccionResidencia ||
                                                            ""}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Tipo de documento:
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strTipoDocto ||
                                                            ""}
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            fontSize: "12px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#00BAB3",
                                                            }}
                                                        >
                                                            Número de documento:
                                                        </span>
                                                        {objInteresado?.objEmpresario
                                                            ?.filter(
                                                                (p) =>
                                                                    p.strTipoEmpresario ===
                                                                    "Principal"
                                                            )
                                                            ?.at(0)
                                                            ?.strNroDocto || ""}
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
                                                                    "PersonasCreate"
                                                                )
                                                            }
                                                            sx={{
                                                                fontSize:
                                                                    "11px",
                                                            }}
                                                        >
                                                            Agregar personas
                                                        </Button>

                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() =>
                                                                onChangeRoute(
                                                                    "PersonasRe"
                                                                )
                                                            }
                                                            sx={{
                                                                fontSize:
                                                                    "11px",
                                                            }}
                                                        >
                                                            Reemplazar
                                                            representante
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
