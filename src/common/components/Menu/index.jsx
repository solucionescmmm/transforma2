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
} from "@mui/material";

//Estilos de Material UI
import { makeStyles } from "@mui/styles";

//Iconos de Material UI
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material/";

//Imagenes
import Logo from "../../../static/img/LogoMenu.svg";
import BackGroundImg from "../../../static/img/LoginBackground.svg";

//Componentes
import GetListUser from "./getListUser";

const menuStyles = makeStyles((theme) => ({
    paper: {
        width: "200px !important",
        overflowX: "hidden",
        backgroundColor: "#fff",
        borderColor: "#ffff",
    },
    bntCloseMenu: {
        marginBottom: "3.5px",
        marginTop: "11.6px",
        [theme.breakpoints.down("md")]: {
            marginBottom: "3.8px",
            marginTop: "3.8px",
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
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = menuStyles();

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (strInfoUser) {
            let rules = defineRulesFor(strInfoUser.strRolApp, "TRANSFORMA");

            ability.update(rules);
        }
    }, [strInfoUser, ability]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={(e) => toggleDrawer(e, false)}
            PaperProps={{ className: classes.paper }}
            variant={isMobile ? "temporary" : "persistent"}
        >
            <Box
                className={classes.bntCloseMenu}
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <IconButton onClick={(e) => toggleDrawer(e, false)} size="large">
                    <ChevronLeftIcon htmlColor="#00BAB3" />
                </IconButton>
            </Box>

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
                    <Box>
                        <GetListUser toggleDrawer={toggleDrawer} movil={true} />
                    </Box>
                </Box>
            </Box>
        </Drawer>
    );
};

export default memo(Menu);
