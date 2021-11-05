import React from "react";

//Librerias
import { Link as RouterLink } from "react-router-dom";

// Componentes de MUI
import { Typography, Grid, Button } from "@mui/material";

//Iconos de Material UI
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material/";

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
                    Regresar
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Typography align="center">
                    La persona empresaria no presenta registro de un diagnóstico
                    empresarial ¿Desea registrar el diagnóstico?
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Button component={RouterLink} to={`/diagnosticos/diagEmpresarial/create`} fullWidth>
                    Registrar
                </Button>
            </Grid>
        </Grid>
    );
};

export default DiagEmpresarialPage;
