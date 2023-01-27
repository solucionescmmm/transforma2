import { Alert, Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { ListAlt as ListAltIcon } from "@mui/icons-material";

const CardComentarios = ({ intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [socket, setSocket] = useState();
    const [error, setError] = useState({ flag: false, msg: "" });

    const [isLoading, setIsLoading] = useState(false);
    const [arrComentarios, setArrComentarios] = useState([]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setIsLoading(true);

        const newSocket = io(
            `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`
        );

        newSocket.on("connect_error", (err) =>
            setError({ flag: true, msg: err.message })
        );

        newSocket.on("connect_failed", (err) =>
            setError({ flag: true, msg: err.message })
        );

        setSocket(newSocket);

        setIsLoading(false);

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit("mdlComentarios:getComentarios", {
                intIdIdea,
            });

            socket.on("mdlComentarios:getComentarios", (res) => {
                setArrComentarios(res.data || []);
            });
        }
    }, [socket, intIdIdea]);

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

    if (error.flag) {
        <Alert severity="error">
            Ha ocurrido un error al contabilizar los comentarios
        </Alert>;
    }

    console.log(arrComentarios);

    if (arrComentarios.length === 0) {
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
                No existen comentarios registrados
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
            {arrComentarios.slice(0, 5).map((p) => (
                <Box sx={{ display: "flex" }}>
                    <p
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            fontSize: "12px",
                            maxWidth: "260px",
                            marginRight: "5px",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <ListAltIcon
                            sx={{
                                width: "20px",
                                height: "20px",
                                marginRight: "5px",
                            }}
                        />
                        {p.strMensaje}
                    </p>
                    <p style={{ fontSize: "12px", paddingRight: "5px" }}>
                        {p.strUsuarioCreacion}
                    </p>
                </Box>
            ))}
        </div>
    );
};

export default CardComentarios;
