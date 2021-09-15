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
    Container,
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

//Imagenes
import BackGroundImg from "../../static/img/LoginBackground.svg";

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
        display: "flex",
        position: "relative",
        flexGrow: 1,
        top: "80px",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: "0",
    },

    mainMenuActive: {
        top: "80px",
        display: "flex",
        position: "relative",
        flexGrow: 1,
        [theme.breakpoints.up("sm")]: {
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: "18rem",
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
        backgroundColor: "#00BAB3",
        backgroundImage: `url(${BackGroundImg})`,
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

        localStorage.setItem("bitMenuDrawer", flag);
        setOpenMenu(flag);
    }, []);

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
                                        <MenuIcon htmlColor="white" />
                                    </IconButton>
                                ) : null}
                                <Typography
                                    variant="h6"
                                    style={{ textOverflow: "ellipsis" }}
                                >
                                    <Link className={classes.link} to="/transforma">
                                        Transforma
                                    </Link>
                                </Typography>
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
                                        sx={{ display: { sm: "none", md: "inherit" } }}
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
                                                <MenuItem>
                                                    <a
                                                        href="https://admin.google.com"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            textDecoration: "none",
                                                            color: "black",
                                                        }}
                                                        target="_blank"
                                                    >
                                                        Mi perfil
                                                    </a>
                                                </MenuItem>
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
                </ThemeProvider>
            </StyledEngineProvider>

            <main className={!openMenu ? classes.main : classes.mainMenuActive}>
                <Container>{children}</Container>
            </main>
        </Fragment>
    );
};

export default memo(Main);
