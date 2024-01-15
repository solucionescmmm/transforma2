import React, {
    useState,
    useCallback,
    useRef,
    useEffect,
    useContext,
    memo,
} from "react";

//Context
import { AuthContext } from "../../common/middlewares/Auth";

//Librerias
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import MicrosoftLogin from "react-microsoft-login";

//Componentes de Material UI
import {
    Grid,
    Box,
    Paper,
    Container,
    Typography,
    LinearProgress,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

//Estilos de Material UI
import { makeStyles } from "@mui/styles";

//Imagenes
import LogoImg from "../../static/img/LogoLogin.svg";
import BackGroundImg from "../../static/img/LoginBackground.svg";
import BtnMicrosoft from "../../static/img/Microsoft_logo.svg.png";

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
        [theme.breakpoints.down("md")]: {
            width: "300px",
        },
    },
}));

const Login = () => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token, handlerChangeData } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Referencias ========================================================================================
    //===============================================================================================================================================
    const handlerChangeDataRef = useRef(handlerChangeData);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);
    const [flagSubmit, setFlagSubmit] = useState(false);
    const [data, setData] = useState();

    //===============================================================================================================================================
    //========================================== Funciones  =========================================================================================
    //===============================================================================================================================================
    //#NOTE: variable que se utiliza para aplicar estilos personalizados de material ui
    const classes = loginStyles();

    const onSuccessAuth = (res) => {
        setData((prevState) => ({
            ...prevState,
            ...res,
        }));

        setFlagSubmit(true);
    };

    const onFailureAuth = (error) => {
        toast.error(error.details || "Acceso denegado");
    };

    const submitData = useCallback(
        async (signalSubmitData) => {
            setLoading(true);

            setFlagSubmit(false);

            await axios(
                {
                    method: "POST",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_LOGIN}`,
                    headers: {
                        Authorization: data?.tokenId,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    setLoading(false);

                    localStorage.setItem("token", res.data.data);

                    if (
                        !process.env.REACT_APP_NODE_ENV ||
                        process.env.REACT_APP_NODE_ENV !== "production"
                    ) {
                        Cookies.set("token", res.data.data);
                    } else {
                        Cookies.set("token", res.data.data, {
                            domain: ".demismanos.co",
                        });
                    }

                    handlerChangeDataRef.current("token", res.data.data);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data.msg;
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        console.error(error);
                        setLoading(false);

                        toast.error(msg);
                    }
                });
        },
        [data]
    );

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        if (flagSubmit) {
            submitData(signalSubmitData);
        }

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [flagSubmit, submitData]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

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
                            <LinearProgress
                                className={classes.linearProgress}
                            />
                        ) : null}
                        <Grid
                            container
                            direction="row"
                            style={{ padding: "20px" }}
                        >
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
                                        {process.env.REACT_APP_NODE_ENV ===
                                        "development" || process.env.REACT_APP_NODE_ENV ===
                                        "production" ? (
                                            <MicrosoftLogin
                                                clientId={
                                                    process.env
                                                        .REACT_APP_CLIENT_MICROSOFT
                                                }
                                                buttonText="Ingresar"
                                                authCallback={(err, data) => {
                                                    if (err) {
                                                        onFailureAuth(err);
                                                    } else {
                                                        onSuccessAuth(data);
                                                    }
                                                }}
                                                children={
                                                    <LoadingButton
                                                        startIcon={
                                                            <img
                                                                src={
                                                                    BtnMicrosoft
                                                                }
                                                                width={10}
                                                                height={10}
                                                                alt="btnMicrosoft"
                                                            />
                                                        }
                                                        loading={loading}
                                                    >
                                                        Iniciar sesión
                                                    </LoadingButton>
                                                }
                                            />
                                        ) : (
                                            <LoadingButton
                                                onClick={onSuccessAuth}
                                                startIcon={
                                                    <img
                                                        src={BtnMicrosoft}
                                                        width={10}
                                                        height={10}
                                                        alt="btnMicrosoft"
                                                    />
                                                }
                                                loading={loading}
                                            >
                                                Iniciar sesión
                                            </LoadingButton>
                                        )}
                                    </Grid>
                                </Grid>

                                <Box className={classes.copyright}>
                                    <Box>
                                        <Typography variant="caption">
                                            Todos los derechos reservados - 2021
                                            ©
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
