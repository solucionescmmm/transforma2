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
import TeamIcon from "../../../../static/img/icons/team.png";
import DocumentIcon from "../../../../static/img/icons/document.png";
import RouteIcon from "../../../../static/img/icons/route.png";
import PlannerIcon from "../../../../static/img/icons/planner.png";
import CommentsIcon from "../../../../static/img/icons/comments.png";
import NotesIcon from "../../../../static/img/icons/notes.png";
import FoldersIcon from "../../../../static/img/icons/folders.png";

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
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [route, setRoute] = useState("");

    const [objInteresado, setObjInteresado] = useState({});

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();
    const { data } = useGetEmpresarios({ autoload: true, intId });
    const location = useHistory();

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

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

    if (route) {
        return (
            <Fragment>
                <Grid
                    container
                    direction="row"
                    spacing={2}
                    sx={{ minWidth: "80vw", marginBottom: "50px" }}
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
                    onChange={(value) => setRoute(value)}
                    intId={intId}
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
                sx={{ minWidth: "80vw", marginBottom: "80px" }}
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
                spacing={2}
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
                                            <CardGrafica />
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
                                            <CardGrafica />
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
                                            <CardGrafica />
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
                                                Personas
                                            </b>
                                        </p>
                                        <img
                                            src={TeamIcon}
                                            alt="icono"
                                            width={40}
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
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                setRoute("PersonasCreate")
                                            }
                                        >
                                            Agregar personas
                                        </Button>

                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                setRoute("PersonasCreate")
                                            }
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
                                                Diagnósticos
                                            </b>
                                        </p>
                                        <img
                                            src={DocumentIcon}
                                            alt="icono"
                                            width={40}
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
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                                setRoute("Diagnosticos")
                                            }
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
                                                Rutas
                                            </b>
                                        </p>
                                        <img
                                            src={RouteIcon}
                                            alt="icono"
                                            width={40}
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
                                            <p>No existen rutas registradas</p>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row-reverse",
                                            gap: 1,
                                        }}
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => setRoute("")}
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
                    <Card elevation={0}>
                        <CardActionArea>
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
                                                    Eventos
                                                </b>
                                            </p>
                                            <img
                                                src={PlannerIcon}
                                                alt="icono"
                                                width={50}
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
                                                <p>
                                                    No existen eventos asociados
                                                    a las personas de está
                                                    iniciativa
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0}>
                        <CardActionArea onClick={() => setRoute("Comentarios")}>
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
                                                    Comentarios
                                                </b>
                                            </p>
                                            <img
                                                src={CommentsIcon}
                                                alt="icono"
                                                width={40}
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
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0}>
                        <CardActionArea>
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
                                                    Tareas
                                                </b>
                                            </p>
                                            <img
                                                src={NotesIcon}
                                                alt="icono"
                                                width={50}
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
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={0}>
                        <CardActionArea>
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
                                                width={50}
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
                                                <p>
                                                    Se encontraron 0 documentos
                                                </p>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Coco;
