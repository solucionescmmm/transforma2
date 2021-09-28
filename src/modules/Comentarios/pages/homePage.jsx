import React, { useState, useEffect, Fragment } from "react";

//Librerias
import io from "socket.io-client";

//Componentes de Material UI
import { Grid } from "@mui/material";

//Componentes
import PageError from "../../../common/components/Error";
import Loader from "../../../common/components/Loader";
import PaperAddComentario from "../components/paperAddComentario";
import PaperGetComentarios from "../components/paperGetComentarios";

const Comentarios = () => {
    const [socket, setSocket] = useState();
    const [loading, setLoadig] = useState(true);
    const [error, setError] = useState({ flag: false, msg: "" });

    useEffect(() => {
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

        setLoadig(false);

        return () => {
            newSocket.close();
        };
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error.flag) {
        return (
            <PageError
                severity="error"
                title={error.msg}
                msg="No ha sido posible conectarse con el servicio de comentario, por favor, escala al área de TI para más información."
            />
        );
    }

    return (
        <Grid container direction="row" spacing={3}>
            <Grid item xs={12}>
                <PaperGetComentarios socket={socket} />
            </Grid>

            <Grid item xs={12}>
                <PaperAddComentario socket={socket} />
            </Grid>
        </Grid>
    );
};

export default Comentarios;
