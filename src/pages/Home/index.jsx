import React, { useContext } from "react";

//Componentes de Material UI
import { Grid, Typography, Paper, Breadcrumbs } from "@material-ui/core";

//Iconos
import { Home as HomeIcon } from "@material-ui/icons";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

//Context
import { AuthContext } from "../../common/middlewares/Auth";

const homeStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        backgroundColor: "#00BAB3",
        position: "relative",
        color: "white",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
    iconPaper1: {
        position: "absolute",
        width: "80px",
        top: 0,
        right: 0,
        marginTop: "-10px",
    },
    iconPaper2: {
        position: "absolute",
        width: "80px",
        top: 0,
        right: 35,
        marginTop: "-10px",
    },
}));

const HomePage = () => {
    const { strInfoUser } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = homeStyles();

    return (
        <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary" className={classes.link}>
                        <HomeIcon fontSize="inherit" className={classes.icon} />
                        Inicio
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography style={{ fontWeight: "bold" }} variant="subtitle1">
                        {`Bienvenido ${strInfoUser?.strNombre} ${strInfoUser?.strApellidos}`}
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Typography>
                    En la parte derecha encontraras el menu con todas las opciones
                    disponibles, si necesitas ayuda o soporte comunícate con el area
                    encargada para mas información
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                    eventos
                </Typography>

                <hr />
            </Grid>
        </Grid>
    );
};

export default HomePage;
