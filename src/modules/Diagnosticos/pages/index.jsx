import React from "react";

//Componentes de Mui
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Box,
    Typography,
} from "@mui/material";

// Iconos
import {
    Business as BusinessIcon,
    AddBusiness as AddBusinessIcon,
    Architecture as ArchitectureIcon,
} from "@mui/icons-material";

const Diagnosticos = ({ onChangeRoute, intIdIdea, intIdDiagnostico }) => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea
                        onClick={() =>
                            onChangeRoute("DiagEmpresarial", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
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
                    <CardActionArea
                        onClick={() =>
                            onChangeRoute("DiagDesign", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
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
                                            <ArchitectureIcon
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
                                        Diagnóstico de diseño
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
                        onClick={() =>
                            onChangeRoute("DiagComercial", {
                                intIdIdea,
                                intIdDiagnostico,
                            })
                        }
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
