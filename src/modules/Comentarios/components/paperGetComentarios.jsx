import React, { useEffect, useState } from "react";

//Componentes de Material UI
import { Typography, Grid } from "@mui/material";

//Componentes
import Tarea from "./Tarea";
import Alerta from "./Alerta";
import Sugerencia from "./Sugerencia";
import Comentario from "./Comentario";
import Critica from "./Critica";

const PaperGetComentarios = ({ socket, values }) => {
    const [arrComentarios, setArrComentarios] = useState([]);

    useEffect(() => {
        socket.emit("mdlComentarios:getComentarios", {
            intIdEmpresario: values?.intIdEmpresario,
        });

        socket.on("mdlComentarios:getComentarios", (res) => {
            if (res.data) {
                setArrComentarios(res.data);

                console.log(res.data)
            }
        });

        socket.on("mdlComentarios:setComentario", (res) => {
            if (res.data) {
                setArrComentarios(res.data);
            }
        });
    }, [socket, values]);

    if (arrComentarios.length === 0) {
        return (
            <Typography align="center">
                La persona empresaria todavia no ha recibido comentarios
            </Typography>
        );
    }

    return (
        <Grid container direction="row" spacing={2} sx={{ paddingBottom: "15px" }}>
            {arrComentarios.map((e, i) => {
                if (e.strTipo === "Tarea") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Tarea values={e} socket={socket} />
                        </Grid>
                    );
                }

                if (e.strTipo === "Alerta") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Alerta values={e} socket={socket} />
                        </Grid>
                    );
                }

                if (e.strTipo === "Sugerencia") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Sugerencia values={e} socket={socket} />
                        </Grid>
                    );
                }

                if (e.strTipo === "Comentario") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Comentario values={e} socket={socket} />
                        </Grid>
                    );
                }

                if (e.strTipo === "Situación Crítica") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Critica values={e} socket={socket} />
                        </Grid>
                    );
                }

                return null;
            })}
        </Grid>
    );
};

export default PaperGetComentarios;
