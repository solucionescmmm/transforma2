import React from "react";

//Librerias
import { Link as RouterLink, useLocation } from "react-router-dom";

//Componentes de Material UI
import {
    List,
    ListItem as MuiListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from "@mui/material";

import { withStyles } from "@mui/styles";

//Iconos de Material UI
import {
    Home as HomeIcon,
    Equalizer as EqualizerIcon,
    ListAlt as ListAltIcon,
    People as PeopleIcon,
    Report as ReportIcon,
    Engineering as EngineeringIcon,
} from "@mui/icons-material";

const ListItem = withStyles({
    root: {
        color: "black",
        "& .MuiListItemIcon-root": {
            color: "black",
        },
        "&$selected": {
            backgroundColor: "#00BAB3",
            color: "white",
            borderRadius: "0px 20px 20px 0px",
            "& .MuiListItemIcon-root": {
                color: "white",
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
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Personas Iniciativas" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/transforma/asesor/empresario/read/all"
                selected={
                    location.pathname.startsWith("/transforma/asesor/actividades/")
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
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Actividades" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/transforma/asesor/empresario/read/all"
                selected={
                    location.pathname.startsWith("/transforma/asesor/estadisticas/")
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
                    <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Estadísticas" />
            </ListItem>

            <Divider />

            <ListItem
                button
                component={RouterLink}
                to="/transforma/asesor/empresario/read/all"
                selected={
                    location.pathname.startsWith("/transforma/asesor/estadisticas/")
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
                    <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Reportar una situación" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/transforma/admin"
                selected={
                    location.pathname.startsWith("/transforma/admin")
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
                    <EngineeringIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
            </ListItem>
        </List>
    );
};

export default ListMenuUser;
