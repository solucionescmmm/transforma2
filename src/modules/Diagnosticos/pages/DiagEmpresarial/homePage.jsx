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
    Button,
} from "@mui/material";

// Iconos
import {
    People as PeopleIcon,
    ManageAccounts as ManageAccountsIcon,
    ChevronLeft as ChevronLeftIcon,
    FactCheck as FactCheckIcon,
    ListAlt as ListAltIcon,
} from "@mui/icons-material";

const DiagEmpresarialPage = ({ intId }) => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
                <Button
                    component={RouterLink}
                    to={`/diagnosticos/`}
                    startIcon={<ChevronLeftIcon />}
                    size="small"
                    color="inherit"
                >
                    regresar
                </Button>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea>
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
                                            <ListAltIcon
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
                                        Resumen
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
                        to={`/diagnosticos/diagEmpresarial/general/create`}
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
                                            <FactCheckIcon
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
                                        Información general
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea>
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
                                            <PeopleIcon
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
                                        Competencias humanas
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea>
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
                                            <ManageAccountsIcon
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
                                        Competencias técnicas
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

export default DiagEmpresarialPage;
