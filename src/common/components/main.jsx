import React, {
    useState,
    useCallback,
    useContext,
    useEffect,
    memo,
    Fragment,
} from "react";

//Context
import { AuthContext } from "../middlewares/Auth";

//Librerias
import { Link } from "react-router-dom";
import typeConvertor from "string-type-convertor";

//Componentes de Material UI
import {
    AppBar,
    Toolbar,
    Menu,
    MenuItem,
    Avatar,
    IconButton,
    Typography,
    Box,
    adaptV4Theme,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";

//Estilos de Material UI
import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

//Iconos de Material UI
import { Person as PersonIcon } from "@mui/icons-material";

//Componentes
import MenuDrawer from "./Menu";

const themeOptions = createTheme(
    adaptV4Theme({
        palette: {
            mode: "light",
        },
    })
);

const mainStyles = makeStyles((theme) => ({
    avatarInterno: {
        width: "90px",
        height: "90px",
    },
    avatar: {
        width: "30px",
        height: "30px",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarMenuActive: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - 12rem)`,
            marginLeft: "12rem",
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
    main: {
        display: "block",
        position: "relative",
        flexGrow: 1,
        top: "80px",
        margin: "0 25px 0 25px",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down("sm")]: {
            margin: "0px",
            paddingRight: "10px",
            paddingLeft: "10px",
        },
    },

    mainMenuActive: {
        top: "80px",
        display: "flex",
        position: "relative",
        margin: "0 25px 0 25px",
        flexGrow: 1,
        [theme.breakpoints.down("sm")]: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            margin: "0",
            paddingRight: "10px",
            paddingLeft: "10px",
        },

        [theme.breakpoints.up("sm")]: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: "14rem",
        },
    },

    hiddenElements: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },

    link: {
        textDecoration: "none",
        color: "white",
    },

    appColor: {
        backgroundColor: "#fff",
        boxShadow: "none",
    },
}));

const Main = ({ children }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser, cerrarSesion } = useContext(AuthContext);

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [openMenu, setOpenMenu] = useState(false);
    // const [openMenuNotification, setOpenMenuNotificacion] = useState(false);
    const [openMenuProfile, setOpenMenuProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState();

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = mainStyles();

    const toggleDrawer = useCallback((e, flag) => {
        if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
            return;
        }

        setOpenMenu(flag);
    }, []);

    // const toggleDrawerNotificacion = useCallback((e, flag) => {
    //     if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
    //         return;
    //     }

    //     setOpenMenuNotificacion(flag);
    // }, []);

    const toggleProfile = useCallback(() => {
        setOpenMenuProfile(!openMenuProfile);
    }, [openMenuProfile]);

    const handleProfile = useCallback((e) => {
        setAnchorEl(e.currentTarget);
    }, []);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (localStorage.getItem("bitMenuDrawer") && !isMobile) {
            let bitMenuDrawer = typeConvertor(localStorage.getItem("bitMenuDrawer"));
            setOpenMenu(bitMenuDrawer);
        }
    }, [isMobile]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themeOptions}>
                    <AppBar
                        className={!openMenu ? classes.appBar : classes.appBarMenuActive}
                        classes={{ root: classes.appColor }}
                    >
                        <Toolbar>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                {!openMenu ? (
                                    <IconButton
                                        onClick={(e) => toggleDrawer(e, true)}
                                        size="large"
                                    >
                                        <MenuIcon htmlColor="#00BAB3" />
                                    </IconButton>
                                ) : null}
                                <Typography
                                    variant="h6"
                                    style={{ textOverflow: "ellipsis", color: "#00BAB3" }}
                                >
                                    <Link
                                        className={classes.link}
                                        to="/transforma"
                                        style={{ color: "#00BAB3" }}
                                    >
                                        Transforma
                                    </Link>
                                </Typography>
                                <img
                                    style={{ marginLeft: "5px" }}
                                    className={classes.hiddenElements}
                                    src="https://demismanos.org/wp-content/uploads/2020/07/Copia-de-Logo-DMM-Horizontal-300x91.png"
                                    alt="Logo"
                                    width="80px"
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box className={classes.hiddenElements}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            display: {
                                                sm: "none",
                                                md: "inherit",
                                                color: "#00BAB3",
                                            },
                                        }}
                                    >
                                        {strInfoUser
                                            ? strInfoUser.strUsuario
                                            : "undefined"}
                                    </Typography>
                                </Box>

                                <IconButton
                                    onClick={(e) => {
                                        toggleProfile();
                                        handleProfile(e);
                                    }}
                                    size="large"
                                >
                                    <Avatar
                                        className={classes.avatar}
                                        src={strInfoUser?.strURLImagen}
                                    >
                                        <PersonIcon />
                                    </Avatar>
                                </IconButton>



                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenuProfile}
                                    onClose={toggleProfile}
                                    variant="menu"
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "0px 15px",
                                        }}
                                    >
                                        <Box>
                                            <Avatar
                                                className={classes.avatarInterno}
                                                src={strInfoUser?.strURLImagen}
                                            >
                                                <PersonIcon
                                                    className={classes.avatarInterno}
                                                />
                                            </Avatar>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    padding: "6px 16px",
                                                    maxWidth: "200px",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Typography noWrap>
                                                    <b>
                                                        {`${
                                                            strInfoUser
                                                                ? strInfoUser.strNombre
                                                                : undefined
                                                        } ${
                                                            strInfoUser
                                                                ? strInfoUser.strApellidos
                                                                : undefined
                                                        }`}
                                                    </b>
                                                </Typography>
                                                <Typography variant="caption" noWrap>
                                                    {strInfoUser
                                                        ? strInfoUser.strEmail
                                                        : undefined}
                                                </Typography>
                                            </Box>
                                            <Box>

                                                <MenuItem
                                                    onClick={() => {
                                                        cerrarSesion();
                                                    }}
                                                >
                                                    Cerrar sesión
                                                </MenuItem>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <MenuDrawer open={openMenu} toggleDrawer={toggleDrawer} />

                    {/* <NotificacionsDrawer
                        open={openMenuNotification}
                        toggleDrawer={toggleDrawerNotificacion}
                    /> */}
                </ThemeProvider>
            </StyledEngineProvider>

            <main className={!openMenu ? classes.main : classes.mainMenuActive}>
                {children}
            </main>
        </Fragment>
    );
};

export default memo(Main);
