import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import useGetTareas from "../../hooks/useGetTareas";

// Iconos
import {ListAlt as ListAltIcon} from "@mui/icons-material"

const CardTareas = ({ intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================

    const [isLoading, setIsLoading] = useState(false);
    const [arrTareas, setArrTareas] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetTareas({ autoload: true, intIdIdea });

    useEffect(() => {
        setIsLoading(true);

        if (data) {
            setArrTareas(data);
        }

        setIsLoading(false);
    }, [data]);

    if (isLoading || !data) {
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

    return (
        <div style={{padding: "0px 5px"}}>
            {arrTareas.slice(0, 5).map((p) => (
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
                        {p.strTarea}
                    </p>
                    <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                        {p.btFinalizada === true ? "Completada" : "Sin completar"}
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardTareas;
