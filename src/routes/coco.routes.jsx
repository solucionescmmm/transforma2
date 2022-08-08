import React from "react";

// Componentes mui
import { Button, Grid } from "@mui/material";

//Iconos
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";

const CocoRoutes = ({ route, onChange }) => {
    if (route === "Personas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid>Personas</Grid>
            </Grid>
        );
    }

    if (route === "Diagnosticos") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid>Diagnosticos</Grid>
            </Grid>
        );
    }

    if (route === "Rutas") {
        return (
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12}>
                    <Button
                        onClick={() => onChange("")}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid>Rutas</Grid>
            </Grid>
        );
    }
};

export default CocoRoutes;
