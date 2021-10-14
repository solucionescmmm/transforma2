import React from "react";

//Librerias
import { parseISO, format, differenceInCalendarYears } from "date-fns";

//Componentes de Material UI
import { Grid, Paper } from "@mui/material";

//Iconos
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    AddLocation as AddLocationIcon,
} from "@mui/icons-material";

const PerfilEmpresario = ({ values }) => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Grid container direction="row" spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: "15px" }}>
                    <b style={{ marginBottom: "15px", display: "block" }}>
                        Datos de contacto
                    </b>

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
                        }}
                    >
                        <span
                            style={{
                                color: "#00BAB3",
                            }}
                        >
                            <EmailIcon sx={{ marginRight: "5px" }} />
                        </span>
                        {values.objEmpresario.strCorreoElectronico1 || "No disponible"}
                    </p>

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
                        }}
                    >
                        <span
                            style={{
                                color: "#00BAB3",
                            }}
                        >
                            <PhoneIcon sx={{ marginRight: "5px" }} />
                        </span>
                        {values.objEmpresario.strCelular1 || "No disponible"}
                    </p>

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
                        }}
                    >
                        <span
                            style={{
                                color: "#00BAB3",
                            }}
                        >
                            <AddLocationIcon sx={{ marginRight: "5px" }} />
                        </span>
                        {values.objEmpresario.strDireccionResidencia || "No disponible"}
                    </p>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: "15px" }}>
                    <b style={{ marginBottom: "15px", display: "block" }}>
                        Información personal
                    </b>

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
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

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
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

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
                        }}
                    >
                        <span
                            style={{
                                color: "#00BAB3",
                            }}
                        >
                            Género:{" "}
                        </span>
                        {values.objEmpresario.strGenero || "No disponible"}
                    </p>

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
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
                                  parseISO(values.objEmpresario.dtFechaNacimiento)
                              )
                            : "No disponible"}
                    </p>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: "15px" }}>
                    <b style={{ marginBottom: "15px", display: "block" }}>
                        Acompañamiento De Mis Manos
                    </b>

                    <p
                        style={{
                            margin: "0px",
                            fontSize: "14px",
                            display: "flex",
                            alignContent: "center",
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
                                  parseISO(values.objEmpresario.dtFechaVinculacion),
                                  "yyyy-MM-dd"
                              )
                            : "No disponible"}
                    </p>

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
                        {values.objEmpresario.strTipoVinculacion || "No disponible"}
                    </p>

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
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: "15px" }}>
                    <b style={{ marginBottom: "15px", display: "block" }}>
                        Información de la empresa
                    </b>

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
                            Categoría:{" "}
                        </span>
                        {values.objInfoEmpresa.strCategoriaProducto ||
                            values.objInfoEmpresa.strCategoriaServicio ||
                            "No disponible"}
                    </p>

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
                            Año de creación:{" "}
                        </span>
                        {values.objInfoEmpresa.dtFechaFundacion
                            ? format(
                                  parseISO(values.objInfoEmpresa.dtFechaFundacion),
                                  "yyyy-MM-dd"
                              )
                            : "No disponible"}
                    </p>

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
                            Dedicación:{" "}
                        </span>
                        {values.objInfoEmpresa.strTiempoDedicacion || "No disponible"}
                    </p>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PerfilEmpresario;
