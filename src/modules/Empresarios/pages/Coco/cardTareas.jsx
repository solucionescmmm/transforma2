import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import useGetTareas from "../../hooks/useGetTareas";

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
        <div style={{ padding: "0px 5px" }}>
            {arrTareas.filter((t) => t.bitFinalizado === false).length > 0
                ? `Existen ${
                      arrTareas.filter((t) => t.bitFinalizado === false).length
                  } tareas sin finalizar`
                : "No existen nuevas tareas por finalizar"}
        </div>
    );
};

export default CardTareas;
