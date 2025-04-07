import React from "react";

//Librerias
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Can } from "../../functions/can";

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
    //Equalizer as EqualizerIcon,
    ListAlt as ListAltIcon,
    People as PeopleIcon,
    SupervisedUserCircle,
    //Report as ReportIcon,
    Engineering as EngineeringIcon,
    Stadium as StadiumIcon
} from "@mui/icons-material";

//Hooks
import useGetListas from "../../hooks/useGetLinkReporte";


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

    const { data, refreshGetData } = useGetListas({
        strGrupo: "BI",
        strCodigo: "Informes BI",
    });

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
                    location.pathname.startsWith(
                        "/transforma/asesor/empresario/"
                    )
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
                <ListItemText primary="Personas Empresarias" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/transforma/asesor/terceros/read/all"
                selected={
                    location.pathname.startsWith(
                        "/transforma/asesor/terceros/"
                    )
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
                    <SupervisedUserCircle />
                </ListItemIcon>
                <ListItemText primary="Terceros" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/transforma/asesor/eventos/read/all"
                selected={
                    location.pathname.startsWith(
                        "/transforma/asesor/eventos/"
                    )
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
                    <StadiumIcon />
                </ListItemIcon>
                <ListItemText primary="Eventos" />
            </ListItem>

            <ListItem
                button
                onClick={(e) => {
                    window.open(data[0]?.strCodigoRetorno, '_blank');
                    if (movil) {
                        toggleDrawer(e, false);
                    }
                }}
            >
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Reportes" />
            </ListItem>

            {/* <ListItem
                // button
                // component={RouterLink}
                // to="/transforma/asesor/empresario/read/all"
                // selected={
                //     location.pathname.startsWith(
                //         "/transforma/asesor/estadisticas/"
                //     )
                //         ? true
                //         : false
                // }
                // onClick={(e) => {
                //     if (movil) {
                //         toggleDrawer(e, false);
                //     }
                // }}
            >
                <ListItemIcon>
                    <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Estadísticas" />
            </ListItem> */}

            <Divider />

            {/* <ListItem
                // button
                // component={RouterLink}
                // to="/transforma/asesor/empresario/read/all"
                // selected={
                //     location.pathname.startsWith(
                //         "/transforma/asesor/estadisticas/"
                //     )
                //         ? true
                //         : false
                // }
                // onClick={(e) => {
                //     if (movil) {
                //         toggleDrawer(e, false);
                //     }
                // }}
            >
                <ListItemIcon>
                    <ReportIcon />
                </ListItemIcon>
                <ListItemText primary="Reportar una situación" />
            </ListItem> */}

            <Can
                I="manage"
                a="all"
            >
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
            </Can>
        </List>
    );
};

export default ListMenuUser;
