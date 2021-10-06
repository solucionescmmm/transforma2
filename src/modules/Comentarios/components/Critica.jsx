import React, { useState, useEffect, memo } from "react";

//Librerias
import { parseISO, format } from "date-fns";

//Componentes de Material UI
import { Paper, Box, Grid, Avatar, Typography, Button } from "@mui/material";

//Iconos
import { Comment as CommentIcon } from "@mui/icons-material";

const ComentarioCritico = ({ values }) => {
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

            <Paper sx={{ padding: "10px", backgroundColor: "#F16360", width: "90%" }}>
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle2" component="p">
                                    {data.strUsuario}
                                </Typography>
                                <Typography sx={{ fontSize: "10px" }}>
                                    {data.dtFechaCreacion}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography sx={{ fontSize: "12px" }}>Crítico</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography>{data.srtMensaje}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            startIcon={<CommentIcon />}
                            size="small"
                            sx={{ fontSize: "10px" }}
                            color="inherit"
                        >
                            responder
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default memo(ComentarioCritico);
