import React, { useState } from "react";

//Librerias
import { parseISO, format, differenceInCalendarYears } from "date-fns";

//Componentes de Material UI
import {
    Grid,
    Typography,
    Paper,
    Avatar,
    Box,
    Collapse,
    IconButton,
    Tooltip,
} from "@mui/material";

//Iconos
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const CardInfoEmpresario = ({ values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [openCollapseInfoPrincipal, setOpenCollapseInfoPrincipal] = useState(false);
    const [openCollapseInfoContacto, setOpenCollapseInfoContacto] = useState(false);
    const [openCollapseInfoEmpresa, setOpenCollapseInfoEmpresa] = useState(false);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenCollapseInfoPrincipal = () => {
        setOpenCollapseInfoPrincipal(!openCollapseInfoPrincipal);
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Paper sx={{ padding: "10px" }}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    marginTop: "-40px",
                    float: "left",
                }}
            >
                <Avatar
                    sx={{ width: 130, height: 130 }}
                    alt={`${values.objEmpresario.strNombres} ${values.objEmpresario.strApellidos}`}
                    src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${values.objEmpresario.strUrlFoto}`}
                />
            </Box>

            <Grid container direction="row">
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Typography>
                            {`${values.objEmpresario.strNombres} ${values.objEmpresario.strApellidos}`}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Typography
                            sx={{
                                textTransform: "uppercase",
                                color:
                                    values.objEmpresario.strEstado === "Activo"
                                        ? "#00BAB3"
                                        : "inherit",
                            }}
                        >
                            {`${values.objEmpresario.strEstado}`}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} sx={{ marginTop: "45px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>Información principal</Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() => handlerChangeOpenCollapseInfoPrincipal()}
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoPrincipal
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoPrincipal ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={openCollapseInfoPrincipal} timeout="auto">
                        <Grid container direction="row">
                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Fecha de vinculación:{" "}
                                    </span>
                                    {values.objEmpresario.dtFechaVinculacion
                                        ? format(
                                              parseISO(
                                                  values.objEmpresario.dtFechaVinculacion
                                              ),
                                              "yyyy-MM-dd"
                                          )
                                        : "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Tipo de vinculación:{" "}
                                    </span>
                                    {values.objEmpresario.strTipoEmpresario ||
                                        "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Etapa del proceso:{" "}
                                    </span>
                                    {values.objEmpresario.strEtapa || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Etapa de desarrollo:{" "}
                                    </span>
                                    {values.objEmpresario.strEtapa || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Sede:{" "}
                                    </span>
                                    {values.objEmpresario.strSede || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Tipo de documento:{" "}
                                    </span>
                                    {values.objEmpresario.strTipoDocto || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Número de documento:{" "}
                                    </span>
                                    {values.objEmpresario.strNroDocto || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Género:{" "}
                                    </span>
                                    {values.objEmpresario.strSexo || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Edad:{" "}
                                    </span>
                                    {values.objEmpresario.dtFechaNacimiento
                                        ? differenceInCalendarYears(
                                              new Date(),
                                              parseISO(
                                                  values.objEmpresario.dtFechaNacimiento
                                              )
                                          )
                                        : "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Dirección:{" "}
                                    </span>
                                    {values.objEmpresario.strDireccion || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Barrio:{" "}
                                    </span>
                                    {values.objEmpresario.strDireccion || "No disponible"}
                                </p>
                            </Grid>

                            <Grid item xs={12}>
                                <p
                                    style={{
                                        margin: "0px",
                                        fontSize: "14px",
                                    }}
                                >
                                    <span
                                        style={{
                                            color: "#00BAB3",
                                        }}
                                    >
                                        Estrato:{" "}
                                    </span>
                                    {values.objEmpresario.strDireccion || "No disponible"}
                                </p>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>Información de contacto</Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() => handlerChangeOpenCollapseInfoPrincipal()}
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoPrincipal
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoPrincipal ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>Información de la empresa</Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() => handlerChangeOpenCollapseInfoPrincipal()}
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoPrincipal
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoPrincipal ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CardInfoEmpresario;
