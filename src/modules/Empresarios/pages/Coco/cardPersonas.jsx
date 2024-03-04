import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const CardPersonas = ({ intId, arrPerson }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================

    const [isLoading, setIsLoading] = useState(false);
    const [arrPersonas, setArrPersonas] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================

    useEffect(() => {
        setIsLoading(true);

        if (arrPerson) {
            setArrPersonas(arrPerson.filter((p)=>p.strTipoEmpresario === "Secundario"));
        }

        setIsLoading(false);
    }, [arrPerson]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />;
            </Box>
        );
    }

    if (arrPersonas.length === 0) {
        return (
            <div
                style={{
                    padding: "0px 5px",
                    textAlign: "center",
                    margin: "auto",
                    width: 800,
                    height: 118,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                No existen personas secundarias registradas
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "0px 5px",
                maxHeight: "100px",
                overflowY: "scroll",
            }}
        >
            {arrPersonas.slice(0, 5).map((p, i) => (
                <Box sx={{ display: "flex", flexDirection:"column" }} key={i}>
                    <p
                        style={{
                            fontSize: "12px",
                        }}
                    >
                    <b>Nombre: </b> {p.strNombres} {p.strApellidos}
                    </p>
                    <p style={{ fontSize: "12px" }}>
                        <b>Número de documento: </b>{p.strNroDocto}
                    </p>
                    <p style={{ fontSize: "12px" }}>
                        <b>Celular: </b>{p.strCelular1}
                    </p>
                    <br/>
                </Box>
            ))}
        </div>
    );
};

export default CardPersonas;
