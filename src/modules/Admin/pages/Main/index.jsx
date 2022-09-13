import React from "react";

//Librerias
import { Link as RouterLink } from "react-router-dom";

//Componentes de Mui
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Box,
    Typography,
    Breadcrumbs,
    Link,
} from "@mui/material";

// Iconos
import {
    CorporateFare as CorporateFareIcon,
    Home as HomeIcon,
    VerifiedUser as VerifiedUserIcon,
    BusinessCenter as BusinessCenterIcon,
    Ballot as BallotIcon
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

const HomePage = () => {
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    return (
        <Grid container direction="row" spacing={2} width="100%">
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

                    <Typography color="textPrimary">Administración</Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Typography align="left" variant="h5">
                    Administración
                </Typography>
                <Typography align="left" variant="body1">
                    Configuración avanzada del sistema, gestiona y organiza la
                    información disponible en servicios, áreas y más.
                </Typography>
                <hr />
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea
                        component={RouterLink}
                        to={`/transforma/admin/lists/`}
                    >
                        <CardContent sx={{ padding: "0px" }}>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#7BDBD8",
                                            padding: "25px",
                                        }}
                                    >
                                        <Box>
                                            <CorporateFareIcon
                                                htmlColor="#fff"
                                                sx={{ fontSize: "80px" }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        align="center"
                                        sx={{ padding: "10px" }}
                                    >
                                        Gestión de tablas maestras
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea
                        component={RouterLink}
                        to={`/transforma/admin/services/`}
                    >
                        <CardContent sx={{ padding: "0px" }}>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#7BDBD8",
                                            padding: "25px",
                                        }}
                                    >
                                        <Box>
                                            <BusinessCenterIcon
                                                htmlColor="#fff"
                                                sx={{ fontSize: "80px" }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        align="center"
                                        sx={{ padding: "10px" }}
                                    >
                                        Gestión de servicios
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea
                        component={RouterLink}
                        to={`/transforma/admin/paquetes/`}
                    >
                        <CardContent sx={{ padding: "0px" }}>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#7BDBD8",
                                            padding: "25px",
                                        }}
                                    >
                                        <Box>
                                            <BallotIcon
                                                htmlColor="#fff"
                                                sx={{ fontSize: "80px" }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        align="center"
                                        sx={{ padding: "10px" }}
                                    >
                                        Gestión de paquetes
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea
                        component={RouterLink}
                        to={`/transforma/admin/users/`}
                    >
                        <CardContent sx={{ padding: "0px" }}>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "columns",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#7BDBD8",
                                            padding: "25px",
                                        }}
                                    >
                                        <Box>
                                            <VerifiedUserIcon
                                                htmlColor="#fff"
                                                sx={{ fontSize: "80px" }}
                                            />
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="subtitle2"
                                        align="center"
                                        sx={{ padding: "10px" }}
                                    >
                                        Gestión de usuarios
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Grid>
    );
};

export default HomePage;
