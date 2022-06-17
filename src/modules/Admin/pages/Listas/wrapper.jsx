import React from "react";

import { Alert } from "@mui/material";
import Areas from "./Areas";
import Sedes from "./Sedes";
import Tarifas from "./Tarifas";
import Atributos from "./Atributos";
import TiporServicio from "./TipoServicio";

const Wrapper = ({ type }) => {
    if (type === "Áreas") {
        return <Areas />;
    }

    if (type === "Atributos") {
        return <Atributos />;
    }

    if (type === "Sedes") {
        return <Sedes />;
    }

    if (type === "Tipos de tarifa") {
        return <Tarifas />;
    }

    if (type === "Tipos de servicio") {
        return <TiporServicio />;
    }

    if (type !== "") {
        return (
            <Alert severity="error">
                Lo sentimos el campo seleccionado no esta disponible en el
                sistema por el momento
            </Alert>
        );
    }

    return (
        <Alert severity="info">
            Por favor selecciona un elemento de la lista para cargar los datos
            correspondientes
        </Alert>
    );
};

export default Wrapper;
