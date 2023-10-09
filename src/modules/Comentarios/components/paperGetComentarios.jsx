import React, { useEffect, useState } from "react";

//Librerias
import { toast } from "react-hot-toast";

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
            intIdIdea: values?.intIdIdea,
        });

        socket.on("mdlComentarios:getComentarios", (res) => {
            console.log(res.data)
            setArrComentarios(res.data || []);
        });

        socket.on("mdlComentarios:setComentario", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });

        socket.on("mdlComentarios:deleteComentario", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });

        socket.on("mdlComentarios:updateComentario", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });

        socket.on("mdlComentarios:setRespuesta", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });

        socket.on("mdlComentarios:deleteRespuesta", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });

        socket.on("mdlComentarios:updateRespuesta", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });

        socket.on("mdlComentarios:checkComentario", (res) => {
            if (!res.error) {
                toast.success(res.msg);
            }
        });
    }, [socket, values]);

    if (arrComentarios.length === 0) {
        return (
            <Typography align="center">
               todavia no se han recibido comentarios
            </Typography>
        );
    }

    return (
        <Grid container direction="row" spacing={2} sx={{ paddingBottom: "15px" }}>
            {arrComentarios.slice(0).reverse().map((e, i) => {
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

                return (
                    <Grid item xs={12} key={i}>
                        <Comentario values={e} socket={socket} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PaperGetComentarios;
