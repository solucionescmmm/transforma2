import React, { memo, useContext, useEffect } from "react";

//Context
import { AuthContext } from "../../middlewares/Auth";
import { AbilityContext } from "../../config/Can";

//Librerias
import defineRulesFor from "../../config/Permissions";

//Componentes de Material UI
import {
    Drawer,
    Box,
    Typography,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery,
} from "@material-ui/core";

//Estilos de Material UI
import { makeStyles } from "@material-ui/styles";

//Iconos de Material UI
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons/";

//Imagenes
import Logo from "../../../static/img/LogoMenu.svg";
import BackGroundImg from "../../../static/img/LoginBackground.svg";

//Componentes
import GetListUser from "./getListUser";

const menuStyles = makeStyles((theme) => ({
    paper: {
        width: "275.84px !important",
        overflowX: "hidden",
        backgroundImage: `url(${BackGroundImg})`,
        backgroundColor: "#00BAB3",
        borderRadius: "0 0 250px 0",
    },
    bntCloseMenu: {
        marginBottom: "11.6px",
        marginTop: "11.6px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: "7.5px",
            marginTop: "7.5px",
        },
    },
    box: {
        height: "inherit",
        width: "inherit",
    },
}));

const Menu = ({ open, toggleDrawer }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);
    const ability = useContext(AbilityContext);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const movil = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (strInfoUser) {
            let rules = defineRulesFor(strInfoUser.strRolApp, "TRANSFORMA");

            ability.update(rules);
        }
    }, [strInfoUser, ability]);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = menuStyles();

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={(e) => toggleDrawer(e, false)}
            PaperProps={{ className: classes.paper }}
            variant={movil ? "temporary" : "persistent"}
        >
            <Box
                className={classes.bntCloseMenu}
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <IconButton onClick={(e) => toggleDrawer(e, false)}>
                    <ChevronLeftIcon htmlColor="white" />
                </IconButton>
            </Box>

            <Divider />

            <Box
                className={classes.box}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minWidth: "inherit",
                }}
            >
                <Box sx={{ flexGrow: 1, minWidth: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={Logo}
                            alt="Icono choucair"
                            style={{
                                width: "60px",
                                height: "60px",
                                marginTop: "20px",
                                backgroundColor: "white",
                                borderRadius: "50%",
                            }}
                        />
                    </Box>

                    <Box>
                        <GetListUser />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="caption">
                        {process.env.REACT_APP_VERSION}
                    </Typography>
                </Box>
            </Box>
        </Drawer>
    );
};

export default memo(Menu);
