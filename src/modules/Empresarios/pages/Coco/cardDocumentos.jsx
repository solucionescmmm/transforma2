import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

import useGetDocumentos from "../../hooks/useGetDocumentos";

// Iconos
import { ListAlt as ListAltIcon } from "@mui/icons-material";

const CardDocumentos = ({ intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================

    const [isLoading, setIsLoading] = useState(false);
    const [arrDocumentos, setArrDocumentos] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetDocumentos({ autoload: true, intIdIdea });

    useEffect(() => {
        setIsLoading(true);

        if (data) {
            setArrDocumentos(data);
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
            {arrDocumentos.slice(0, 5).map((p) => (
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
                        {p.strNombre}
                    </p>
                    <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                        <a
                            href={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${p.strUrlDocumento}`}
                            alt=""
                            target="_blank"
                            rel="noreferrer"
                        >
                            Abrir
                        </a>
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardDocumentos;
