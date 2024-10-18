import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

// Iconos
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

    if (arrAcom.length === 0  || !arrAcom.length) {
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
                <div>
                    <Box sx={{ display: "flex" }}>
                        <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                            {p.arrSesionAcompañamiento[0]?.dtmFechaInicial ? format(
                                parseISO(p.arrSesionAcompañamiento[0].dtmFechaInicial),
                                "yyyy-MM-dd"
                            ): "No registro"}
                        </p>
                        <p
                            style={{
                                fontSize: "12px",
                                paddingRight: "5px"
                            }}
                        >
                            - {p.objInfoPrincipal.strTipoAcompañamiento}
                        </p>
                        <p
                            style={{
                                fontSize: "12px",
                            }}
                        >
                            - {p.arrSesionAcompañamiento[0]?.strNombreServicio ? p.arrSesionAcompañamiento[0].strNombreServicio : ""}
                        </p>
                    </Box>
                    <hr style={{color: "black"}}/>
                </div>
            ))}
        </div>
    );
};

export default CardAcom;
