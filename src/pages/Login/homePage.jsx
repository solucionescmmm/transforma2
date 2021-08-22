import React, { useState, useCallback, useRef, useEffect, useContext, memo } from "react";

//Context
import { AuthContext } from "../../common/middlewares/Auth";
import { AppContext } from "../../app";

//Librerias
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import GoogleLogin from "react-google-login";

//Componentes de Material UI
import {
    Grid,
    Box,
    Paper,
    Container,
    Typography,
    LinearProgress,
} from "@material-ui/core";

import { LoadingButton } from "@material-ui/lab";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

//Imagenes
import LogoImg from "../../static/img/LogoLogin.svg";
import BackGroundImg from "../../static/img/LoginBackground.svg";
import BtnGoogle from "../../static/img/btnGoogle.png";

const loginStyles = makeStyles((theme) => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
    },
    copyright: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        marginRight: "auto",
        marginLeft: "auto",
        textAlign: "center",
    },
    gridOne: {
        padding: theme.spacing(3),
        position: "relative",
    },
    backImage: {
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BackGroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        overflow: "hidden",
        position: "absolute",
    },
    container: {
        display: "relative",
        height: "100vh",
    },
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    logo: {
        width: "500px",
        [theme.breakpoints.down("sm")]: {
            width: "300px",
        },
    },
}));

const Login = () => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, handlerChangeData } = useContext(AuthContext);
    const { push } = useHistory();

    //===============================================================================================================================================
    //========================================== Referencias ========================================================================================
    //===============================================================================================================================================
    const handlerChangeDataRef = useRef(handlerChangeData);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);

    //===============================================================================================================================================
    //========================================== Funciones  =========================================================================================
    //===============================================================================================================================================
    const onSuccessAuth = (res) => {
        push("/transforma");
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    //#NOTE: variable que se utiliza para aplicar estilos personalizados de material ui
    const classes = loginStyles();

    if (token) {
        return <Redirect to="/transforma" />;
    }

    return (
        <div className={classes.backImage}>
            <Container className={classes.container}>
                <Box
                    sx={{
                        height: "inherit",
                        width: "inherit",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Paper elevation={3} className={classes.paper}>
                        {loading ? (
                            <LinearProgress className={classes.linearProgress} />
                        ) : null}
                        <Grid container direction="row" style={{ padding: "20px" }}>
                            <Grid item xs={12}>
                                <Grid container direction="row" spacing={2}>
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <img
                                                src={LogoImg}
                                                className={classes.logo}
                                                alt="logo choucair"
                                            />
                                        </Box>
                                    </Grid>

                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <GoogleLogin
                                            clientId="870993995291-7sl6msiqqecem5178c71iqt9i6i0h0lp.apps.googleusercontent.com"
                                            buttonText="Ingresar"
                                            render={({ onClick, disabled }) => (
                                                <LoadingButton
                                                    onClick={onClick}
                                                    startIcon={
                                                        <img
                                                            src={BtnGoogle}
                                                            alt="btnGoogle"
                                                        />
                                                    }
                                                    loading={loading}
                                                    disabled={disabled}
                                                >
                                                    Iniciar sesión
                                                </LoadingButton>
                                            )}
                                            onSuccess={onSuccessAuth}
                                            // onFailure={responseError}
                                            // hostedDomain={domain}
                                            //onRequest={setLoading(true)}
                                        />
                                    </Grid>
                                </Grid>

                                <Box className={classes.copyright}>
                                    <Box>
                                        <Typography variant="caption">
                                            Todos los derechos reservados - 2021 ©
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default memo(Login);
