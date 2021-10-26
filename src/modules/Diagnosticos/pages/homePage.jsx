import React from "react";

//Componentes de Mui
import { Card, CardActionArea, CardContent, Grid, Box } from "@mui/material";

import { People as PeopleIcon } from "@mui/icons-material";

const Diagnosticos = () => {
    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} md={2}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignContent: "center",
                                            justifyContent: "center",
                                            backgroundColor: "#7BDBD8",
                                            padding: "25px",
                                        }}
                                    >
                                        <PeopleIcon htmlColor="#fff" />
                                    </Box>
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
