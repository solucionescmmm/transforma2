import { Avatar, Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import useGetEmpresarios from "../../hooks/useGetEmpresarios";

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
        <div
            style={{
                padding: "0px 5px",
                maxHeight: "100px",
                overflowY: "scroll",
            }}
        >
            {arrPersonas.slice(0, 5).map((p) => (
                <Box sx={{ display: "flex" }}>
                    <p
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            fontSize: "12px",
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
                    <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                        {p.strTipoEmpresario}
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardPersonas;
