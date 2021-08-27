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
import { Link, useHistory } from "react-router-dom";
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
} from "@material-ui/core";

import { Menu as MenuIcon } from "@material-ui/icons";

//Estilos de Material UI
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

//Iconos de Material UI
import { Person as PersonIcon } from "@material-ui/icons";

//Imagenes
import BackGroundImg from "../../static/img/LoginBackground.svg";

//Componentes
import MenuDrawer from "./Menu";

const themeOptions = createTheme({
    palette: {
        mode: "light",
    },
});

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
            width: `calc(100% - 17rem)`,
            marginLeft: "17rem",
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
        [theme.breakpoints.down("sm")]: {
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
    const { push } = useHistory();

    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [openMenu, setOpenMenu] = useState(false);
    const [openMenuProfile, setOpenMenuProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState();

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

    useEffect(() => {
        if (localStorage.getItem("bitMenuDrawer")) {
            let bitMenuDrawer = typeConvertor(localStorage.getItem("bitMenuDrawer"));
            setOpenMenu(bitMenuDrawer);
        }
    }, []);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
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
                                <IconButton onClick={(e) => toggleDrawer(e, true)}>
                                    <MenuIcon htmlColor="white" />
                                </IconButton>
                            ) : null}
                            <Typography variant="h6" style={{ textOverflow: "ellipsis" }}>
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
                                    {strInfoUser ? strInfoUser.strUsuario : "undefined"}
                                </Typography>
                            </Box>

                            <IconButton
                                onClick={(e) => {
                                    toggleProfile();
                                    handleProfile(e);
                                }}
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
                                                    href="https://wilson.choucairtesting.com/"
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
                                                    push("/");
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

            <main className={!openMenu ? classes.main : classes.mainMenuActive}>
                <Container>{children}</Container>
            </main>
        </Fragment>
    );
};

export default memo(Main);
