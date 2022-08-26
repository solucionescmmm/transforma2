import { Alert, Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

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

    return (
        <div style={{ padding: "0px 5px" }}>
            {`Existe un total de ${arrComentarios.length} comentarios`}
        </div>
    );
};

export default CardComentarios;
