import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

// Iconos
import { ListAlt as ListAltIcon } from "@mui/icons-material";
import useGetAcomp from "../../hooks/useGetAcomp";
import { format, parseISO } from "date-fns";

const CardAcom = ({ intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================

    const [isLoading, setIsLoading] = useState(false);
    const [arrAcom, setArrAcom] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetAcomp({ autoload: true, intIdIdea });

    useEffect(() => {
        setIsLoading(true);

        if (data) {
            setArrAcom(data);
            setIsLoading(false);
        }
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

    if (arrAcom.length === 0 || !arrAcom.length) {
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
            {arrAcom?.slice(0, 5).map((p) => (
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
                        {p.objInfoPrincipal.strTipoAcompañamiento}
                    </p>
                    <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                        {format(
                            parseISO(p.objInfoPrincipal.dtmCreacion),
                            "yyyy-MM-dd"
                        )}
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardAcom;
