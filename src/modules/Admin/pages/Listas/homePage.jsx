import React, { useState } from "react";

//Librerias
import { Link as RouterLink } from "react-router-dom";

//Componentes de Material UI
import {
    Breadcrumbs,
    Grid,
    Link,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";

//Estilos
import { makeStyles } from "@mui/styles";
import Wrapper from "./wrapper";

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
    const [state, setState] = useState("");
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    return (
        <Grid container direction="row" spacing={2}>
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
                        to="/transforma/admin"
                        className={classes.link}
                    >
                        Administración
                    </Link>

                    <Typography color="textPrimary">
                        Gestión de tablas maestras
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h6">
                    Administración de Tablas Maestras
                </Typography>

                <hr />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    value={state}
                    label="Seleccionar tabla"
                    onChange={(e) => setState(e.target.value)}
                    variant="standard"
                    select
                    helperText="Selecciona un elemento de la lista para cargar la configuración"
                    fullWidth
                >
                    <MenuItem value="Áreas">Áreas</MenuItem>
                    <MenuItem value="Sedes">Sedes</MenuItem>
                    <MenuItem value="Tipos de tarifa">Tipos de tarifa</MenuItem>
                    <MenuItem value="Tipos de campo">Tipos de campo</MenuItem>
                    <MenuItem value="Atributos">Atributos</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <Wrapper type={state} />
            </Grid>
        </Grid>
    );
};

export default HomePage;
