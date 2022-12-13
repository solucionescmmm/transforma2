import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import useGetRutas from "../../hooks/useGetRutas";

// Iconos
import { ListAlt as ListAltIcon } from "@mui/icons-material";

const CardRutas = ({ intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================

    const [isLoading, setIsLoading] = useState(false);
    const [arrRutas, setArrRutas] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetRutas({ autoload: true, intIdIdea });

    useEffect(() => {
        setIsLoading(true);

        if (data) {
            setArrRutas(data);
        }

        setIsLoading(false);
    }, [data]);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (arrRutas.length === 0) {
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
                No existen acompañamientos registrados
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
            {arrRutas.slice(0, 5).map((p) => (
                <Box sx={{ display: "flex" }}>
                    <p
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            fontSize: "12px",
                        }}
                    >
                        <ListAltIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                                marginRight: "5px",
                            }}
                        />
                        {p.objInfoPrincipal.strNombre}
                    </p>
                    <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                        {p.objInfoPrincipal.strEstadoRuta}
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardRutas;
