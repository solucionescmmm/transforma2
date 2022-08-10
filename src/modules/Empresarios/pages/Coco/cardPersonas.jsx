import { Avatar, Box, CircularProgress, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import useGetEmpresarios from "../../hooks/useGetEmpresarios";

import { Edit as EditIcon } from "@mui/icons-material";

const CardPersonas = ({ intId }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================

    const [isLoading, setIsLoading] = useState(false);
    const [arrPersonas, setArrPersonas] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetEmpresarios({ autoload: true, intId });

    useEffect(() => {
        setIsLoading(true);

        if (data) {
            setArrPersonas(data[0].objEmpresario);
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
        <div>
            {arrPersonas.map((p) => (
                <Box sx={{ display: "flex" }}>
                    <p
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: "20px",
                                height: "20px",
                                marginRight: "5px",
                            }}
                        />
                        {p.strNombres} {p.strApellidos}
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardPersonas;
