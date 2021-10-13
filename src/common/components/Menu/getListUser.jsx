import React from "react";

//Librerias
import { Link as RouterLink, useLocation } from "react-router-dom";

//Componentes de Material UI
import {
    List,
    ListItem as MuiListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

import { withStyles } from "@mui/styles";

//Iconos de Material UI
import { Home as HomeIcon, Business as BusinessIcon } from "@mui/icons-material";

const ListItem = withStyles({
    root: {
        color: "white",
        "& .MuiListItemIcon-root": {
            color: "white",
        },
        "&$selected": {
            backgroundColor: "white",
            color: "#00BAB3",
            "& .MuiListItemIcon-root": {
                color: "#00BAB3",
            },
        },
        "&$selected:hover": {
            backgroundColor: "white",
            color: "#00BAB3",
            "& .MuiListItemIcon-root": {
                color: "#00BAB3",
            },
        },
        "&:hover": {
            backgroundColor: "white",
            color: "#00BAB3",
            "& .MuiListItemIcon-root": {
                color: "#00BAB3",
            },
        },
    },
    selected: {},
})(MuiListItem);

const ListMenuUser = ({ toggleDrawer, movil }) => {
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const location = useLocation();

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <List component="nav">
            <ListItem
                button
                component={RouterLink}
                to="/transforma"
                selected={
                    location.pathname === "/transforma" ||
                    location.pathname === "/transforma/"
                }
                onClick={(e) => {
                    if (movil) {
                        toggleDrawer(e, false);
                    }
                }}
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/transforma/asesor/empresario/read/all"
                selected={
                    location.pathname.startsWith("/transforma/asesor/empresario/")
                        ? true
                        : false
                }
                onClick={(e) => {
                    if (movil) {
                        toggleDrawer(e, false);
                    }
                }}
            >
                <ListItemIcon>
                    <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Empresas" />
            </ListItem>
        </List>
    );
};

export default ListMenuUser;
