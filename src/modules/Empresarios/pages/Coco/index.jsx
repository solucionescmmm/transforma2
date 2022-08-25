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
    CardActionArea,
    CardContent,
} from "@mui/material";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";
import TeamIcon from "../../../../static/img/icons/Personas.png";
import DocumentIcon from "../../../../static/img/icons/Diagnosticos.png";
import RouteIcon from "../../../../static/img/icons/Rutas.png";
import PlannerIcon from "../../../../static/img/icons/Eventos.png";
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
    const { data } = useGetEmpresarios({ autoload: true, intId });
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

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoading(true);

        if (data && data.length > 0) {
            setObjInteresado(data[0]);

            setLoading(false);
        }
    }, [data]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loading) {
        return <Loader />;
    }

    if (!data) {
        return <Loader />;
    }

    if (data.error) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor contacta con soporte técnico para más información."
                title={data.msg}
            />
        );
    }

    if (route.location !== "Inicio") {
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
                                Personas iniciativas
                            </Link>

                            <Typography color="textPrimary">
                                {objInteresado?.objInfoEmpresa
                                    ?.strNombreMarca || ""}
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                padding: "15px",
                                marginTop: "30px",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                            elevation={0}
                        >
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,

                                    display: "flex",
                                    marginRight: "80px",
                                }}
                            >
                                E
                            </Avatar>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginRight: "180px",
                                }}
                            >
                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        Representante:
                                    </span>
                                    {objInteresado?.objEmpresario?.[0]
                                        ?.strNombres +
                                        " " +
                                        objInteresado?.objEmpresario?.[0]
                                            ?.strApellidos || ""}
                                </Typography>

                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        Nombre de la iniciativa:
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
                                    marginRight: "180px",
                                }}
                            >
                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        Teléfono:
                                    </span>
                                    {objInteresado?.objEmpresario?.[0]
                                        ?.strCelular1 || ""}
                                </Typography>

                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        Estado:
                                    </span>
                                    {objInteresado?.objEmpresario?.[0]
                                        ?.strEstadoVinculacion || ""}
                                </Typography>

                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        NIT:
                                    </span>
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
                                    {objInteresado?.objEmpresario?.[0]
                                        ?.strCorreo || ""}
                                </Typography>

                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        Sede:
                                    </span>
                                    {objInteresado?.objEmpresario?.[0]
                                        ?.strSede || ""}
                                </Typography>

                                <Typography>
                                    <span style={{ color: "#00BAB3" }}>
                                        Fecha de vinculación:
                                    </span>
                                    {objInteresado?.objEmpresario?.[0]
                                        ?.dtFechaVinculacion || ""}
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
                <Routes
                    route={route}
                    onChangeRoute={onChangeRoute}
                />
            </Fragment>
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
                            Personas iniciativas
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
                            padding: "15px",
                            marginTop: "30px",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                        elevation={0}
                    >
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,

                                display: "flex",
                                marginRight: "80px",
                            }}
                        >
                            E
                        </Avatar>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginRight: "180px",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Representante:
                                </span>
                                {objInteresado?.objEmpresario?.[0]?.strNombres +
                                    " " +
                                    objInteresado?.objEmpresario?.[0]
                                        ?.strApellidos || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Nombre de la iniciativa:
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
                                marginRight: "180px",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Teléfono:
                                </span>
                                {objInteresado?.objEmpresario?.[0]
                                    ?.strCelular1 || ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Estado:
                                </span>
                                {objInteresado?.objEmpresario?.[0]
                                    ?.strEstadoVinculacion || ""}
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
                                {objInteresado?.objEmpresario?.[0]?.strCorreo ||
                                    ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>Sede:</span>
                                {objInteresado?.objEmpresario?.[0]?.strSede ||
                                    ""}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Fecha de vinculación:
                                </span>
                                {objInteresado?.objEmpresario?.[0]
                                    ?.dtFechaVinculacion || ""}
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
                spacing={1}
                sx={{ marginBottom: "15px" }}
            >
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Ventas
                                            </b>
                                        </p>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 290,
                                                height: 118,
                                            }}
                                        >
                                            <CardGrafica intIdIdea={intId} />
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Empleados
                                            </b>
                                        </p>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 290,
                                                height: 118,
                                            }}
                                        >
                                            <CardGrafica intIdIdea={intId} />
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Etapa desarrollo
                                            </b>
                                        </p>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 290,
                                                height: 118,
                                            }}
                                        >
                                            <CardGrafica intIdIdea={intId} />
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #BDBDBD" }}>
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        onClick={() => onChangeRoute("Tareas")}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Tareas
                                            </b>
                                        </p>
                                        <img
                                            src={NotesIcon}
                                            alt="icono"
                                            width={80}
                                            style={{}}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 800,
                                                height: 118,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p>No existen nuevas tareas</p>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                onChangeRoute("CreateTareas")
                                            }
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Agregar tarea
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #BDBDBD" }}>
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Acompañamientos
                                            </b>
                                        </p>
                                        <img
                                            src={RouteIcon}
                                            alt="icono"
                                            width={80}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 800,
                                                height: 118,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p>
                                                No existen acompañamientos
                                                registrados
                                            </p>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => onChangeRoute("")}
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Agregar ruta
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #BDBDBD" }}>
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Diagnósticos
                                            </b>
                                        </p>
                                        <img
                                            src={DocumentIcon}
                                            alt="icono"
                                            width={80}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 800,
                                                height: 118,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p>
                                                No existen registros de
                                                dianósticos
                                            </p>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                onChangeRoute("Diagnosticos")
                                            }
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Agregar diagnóstico
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #BDBDBD" }}>
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        onClick={() =>
                                            onChangeRoute("Comentarios")
                                        }
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Comentarios
                                            </b>
                                        </p>
                                        <img
                                            src={CommentsIcon}
                                            alt="icono"
                                            width={80}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 800,
                                                height: 118,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p>No hay comentarios nuevos</p>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                onChangeRoute(
                                                    "CreateComentarios"
                                                )
                                            }
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Agregar comentario
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #BDBDBD" }}>
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                        onClick={() =>
                                            onChangeRoute("Personas")
                                        }
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Personas
                                            </b>
                                        </p>
                                        <img
                                            src={TeamIcon}
                                            alt="icono"
                                            width={80}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 800,
                                                height: 118,
                                                paddingLeft: "10px",
                                            }}
                                        >
                                            <CardPersonas intId={intId} />
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                onChangeRoute("PersonasCreate")
                                            }
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Agregar personas
                                        </Button>

                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                onChangeRoute("PersonasCreate")
                                            }
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Reemplazar representante
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0} sx={{ border: "1px solid #BDBDBD" }}>
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
                                            padding: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p style={{ flexGrow: 1 }}>
                                            <b style={{ fontSize: 16 }}>
                                                Documentos
                                            </b>
                                        </p>
                                        <img
                                            src={FoldersIcon}
                                            alt="icono"
                                            width={80}
                                            style={{}}
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 800,
                                                height: 118,
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <p>Se encontraron 0 documentos</p>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                            paddingRight: "5px",
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => onChangeRoute("")}
                                            sx={{
                                                fontSize: "11px",
                                            }}
                                        >
                                            Agregar documento
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Coco;
