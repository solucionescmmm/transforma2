import React, { useState, useEffect, useContext, memo } from "react";

//Context
import { AuthContext } from "../../../common/middlewares/Auth";

//Librerias
import { parseISO, format } from "date-fns";

//Componentes de Material UI
import {
    Paper,
    Box,
    Grid,
    Avatar,
    Typography,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";

//Iconos
import { MoreVert as MoreVertIcon } from "@mui/icons-material";

const Comentario = ({ values }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(false);

    const openMenu = Boolean(anchorEl);

    const [data, setData] = useState({
        intIdComentario: null,
        intIdComentarioPr: "",
        strComentario: "",
        dtFechaCreacion: null,
        strUsuario: "",
        strURLImagenUsuario: "",
    });

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setData({
            intId: values.intId || null,
            intIdComentarioPr: values.intIdComentario || "",
            strComentario: values.strMensaje || "",
            dtFechaCreacion: values.dtFechaCreacion
                ? format(parseISO(values.dtFechaCreacion), "yyyy-MM-dd")
                : "",
            strUsuario: values.strUsuario || "",
            strURLImagenUsuario: values.strURLImagenUsuario || "",
        });
    }, [values]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
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

            <Paper sx={{ padding: "10px", width: "90%" }}>
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
                                <IconButton
                                    size="small"
                                    onClick={handleOpenMenu}
                                    disabled={
                                        strInfoUser.strUsuario !== data.strUsuario
                                            ? true
                                            : false
                                    }
                                >
                                    <MoreVertIcon />
                                </IconButton>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={handleCloseMenu}
                                >
                                    <MenuItem>Editar</MenuItem>
                                    <MenuItem>Eliminar</MenuItem>
                                </Menu>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography>{data.strComentario}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default memo(Comentario);
