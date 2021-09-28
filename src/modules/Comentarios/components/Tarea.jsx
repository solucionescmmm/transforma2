import React, { useState, useEffect, memo } from "react";

//Librerias
import { parseISO, format } from "date-fns";

//Componentes de Material UI
import { Paper, Box, Grid, Avatar, Typography } from "@mui/material";

const ComentarioTarea = ({ values }) => {
    const [data, setData] = useState({
        srtMensaje: "",
        dtFechaCreacion: null,
        strUsuario: "",
        strUsuarioAsignado: "",
        strURLImagenUsuario: "",
    });

    useEffect(() => {
        setData({
            srtMensaje: values.srtMensaje || "",
            dtFechaCreacion: values.dtFechaCreacion
                ? format(parseISO(values.dtFechaCreacion), "yyyy-MM-dd")
                : "",
            strUsuario: values.strUsuario || "",
            strUsuarioAsignado: values.strUsuarioAsignado || "",
            strURLImagenUsuario: values.strURLImagenUsuario || "",
        });
    }, [values]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    marginRight: "15px",
                }}
            >
                <Avatar alt={data.strUsuario} src={data.strURLImagenUsuario} />
            </Box>

            <Paper sx={{ padding: "10px" }}>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" component="p">{data.strUsuario}</Typography>
                        <Typography sx={{fontSize: "10px"}}>{data.dtFechaCreacion}</Typography>
                    </Grid>

                    <Grid item xs={12}></Grid>

                    <Grid item xs={12}>
                        <Typography>{data.srtMensaje}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default memo(ComentarioTarea);
