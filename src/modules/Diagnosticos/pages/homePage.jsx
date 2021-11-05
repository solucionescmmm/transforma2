import React from "react";

//Librerias
import { Link as RouterLink } from "react-router-dom";

//Componentes de Mui
import { Card, CardActionArea, CardContent, Grid, Box, Typography } from "@mui/material";

// Iconos
import {
    People as PeopleIcon,
    Business as BusinessIcon,
    ManageAccounts as ManageAccountsIcon,
    Biotech as BiotechIcon,
    ConnectWithoutContact as ConnectWithoutContactIcon,
    AddBusiness as AddBusinessIcon,
} from "@mui/icons-material";

const Diagnosticos = ({ intId }) => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea
                        component={RouterLink}
                        to={`/diagnosticos/diagEmpresarial/`}
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
                                            <BusinessIcon
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
                                        Diagnóstico empresarial
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
                                        Diagnóstico de producto
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
                                        Diagnóstico de servicio
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
                                            <AddBusinessIcon
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
                                        Diagnóstico comercial
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

export default Diagnosticos;
