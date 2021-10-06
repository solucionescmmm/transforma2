import React, { useEffect, useState } from "react";

//Componentes de Material UI
import { Typography, Grid } from "@mui/material";

//Componentes
import Tarea from "./Tarea";
import Alerta from "./Alerta";
import Sugerencia from "./Sugerencia";
import Comentario from "./Comentario";
import Critica from "./Critica";

const PaperGetComentarios = ({ socket }) => {
    const [arrComentarios, setArrComentarios] = useState([]);

    useEffect(() => {
        socket.on("mdlComentarios:getComentarios", (data) => {
            if (data) {
                setArrComentarios(data);
            }
        });

        socket.on("mdlComentarios:setComentario", (data) => {
            if (data) {
                setArrComentarios(data);
            }
        });
    }, [socket]);

    if (arrComentarios.length === 0) {
        return (
            <Typography align="center">
                La persona empresaria todavia no ha recibido comentarios
            </Typography>
        );
    }

    return (
        <Grid
            container
            direction="row"
            spacing={2}
            sx={{ maxHeight: "635px", overflowY: "scroll", paddingBottom: "15px" }}
        >
            {arrComentarios.map((e, i) => {
                if (e.strTipo === "Tarea") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Tarea values={e} />
                        </Grid>
                    );
                }

                if(e.strTipo === "Alerta") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Alerta values={e} />
                        </Grid>
                    );
                }

                if(e.strTipo === "Sugerencia") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Sugerencia values={e} />
                        </Grid>
                    );
                }

                if(e.strTipo === "Comentario") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Comentario values={e} />
                        </Grid>
                    );
                }

                if(e.strTipo === "Situación Crítica") {
                    return (
                        <Grid item xs={12} key={i}>
                            <Critica values={e} />
                        </Grid>
                    );
                }

                return null;
            })}
        </Grid>
    );
};

export default PaperGetComentarios;
