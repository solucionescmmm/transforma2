import {
    Breadcrumbs,
    Button,
    Container,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";

//Iconos
import {
    Home as HomeIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";

const styles = makeStyles((theme) => ({
    containerPR: {
        [theme.breakpoints.down("sm")]: {
            paddingRigth: "0px",
            paddingLeft: "0px",
        },
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: 0,
    },
    container: {
        position: "relative",
        display: "flex",
        width: "inherit",
        height: "70vh",
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
}));

const SearchEmpresario = () => {
    const [documento, setDocumento] = useState("");
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const { goBack } = useHistory();

    const handleChangeDocumento = (value) => {
        setDocumento(value);
    };

    return (
        <Grid container direction="row" spacing={3}>
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
                        to="/transforma/asesor/empresario/read/all"
                        className={classes.link}
                    >
                        Empresarios
                    </Link>

                    <Typography color="textPrimary" className={classes.link}>
                        Registro
                    </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={() => goBack()}
                    startIcon={<ChevronLeftIcon />}
                    size="small"
                    color="inherit"
                >
                    regresar
                </Button>
            </Grid>

            <Grid item xs={12}>
                <Container className={classes.containerPR}>
                    <Paper className={classes.paper}>
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                            style={{ padding: "25px" }}
                        >
                            <Grid item xs={12}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Typography
                                            align="center"
                                            style={{ fontWeight: "bold" }}
                                            color="primary"
                                            variant="h6"
                                        >
                                            REGISTRAR PERSONA INICIATIVA
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={10}>
                                <TextField
                                    name="documento"
                                    label="Documento"
                                    helperText="Digita el documento de la persona"
                                    fullWidth
                                    value={documento}
                                    onChange={(e) =>
                                        handleChangeDocumento(e.target.value)
                                    }
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Button variant="contained" size="small">
                                    Buscar
                                </Button>
                            </Grid>

                            
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};

export default SearchEmpresario;
