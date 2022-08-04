import { Fragment } from "react";

//Librerias
import { Link as RouterLink } from "react-router-dom";

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
    Skeleton,
} from "@mui/material";

//Iconos
import {
    Home as HomeIcon,
    Business as BusinessIcon,
} from "@mui/icons-material";

//Estilos
import { makeStyles } from "@mui/styles";

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
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

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

                        <Typography color="textPrimary"></Typography>
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
                    >
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                marginTop: "-50px",
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
                                marginRight: "200px",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Nombre de la iniciativa:
                                </span>
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
                                marginRight: "200px",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Estado:
                                </span>
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
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Fecha de vinculación:
                                </span>
                            </Typography>
                        </Box>

                        <Box sx={{ margin: "auto" }}>
                            <Button variant="contained">Editar</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Ventas
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Costos
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Utilidades
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Personas
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Diagnósticos
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                   
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Rutas
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                     
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Eventos
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Comentarios
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardContent sx={{ padding: "0px" }}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle2"
                                            align="center"
                                            sx={{ padding: "10px" }}
                                        >
                                            Tareas
                                        </Typography>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "columns",
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box>
                                                <Skeleton
                                                    variant="rectangular"
                                                    width={800}
                                                    height={118}
                                                />
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
