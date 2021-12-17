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
    Biotech as BiotechIcon,
    ChevronLeft as ChevronLeftIcon,
    ConnectWithoutContact as ConnectWithoutContactIcon,
    ListAlt as ListAltIcon,
} from "@mui/icons-material";

const DiagDesign = ({ intId }) => {
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
                        to={`/diagnosticos/diagDesign/product/create`}
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
                                            <BiotechIcon
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
                                        Producto
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
                                            <ConnectWithoutContactIcon
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
                                        Servicio
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

export default DiagDesign;
