import React, { useState, useEffect, useContext, memo, Fragment } from "react";

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

//Componentes
import ModalDelete from "./modalDeleteRespuesta";
import ModalEditRespuesta from "./modalEditRespuesta";

//Estilos
import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
    avatar: {
        height: "100%",
        display: "flex",
        marginRight: "15px",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const PaperGetRespuestas = ({ values, socket }) => {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(false);

    const openMenu = Boolean(anchorEl);

    const [data, setData] = useState({
        intId: null,
        intIdEmpresario: null,
        intIdComentario: null,
        intIdComentarioPr: "",
        strComentario: "",
        dtFechaCreacion: null,
        strUsuario: "",
        strURLImagenUsuario: "",
    });

    const classes = styles();

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handleOpenModalUpdate = () => {
        setOpenModalUpdate(!openModalUpdate);
    };

    useEffect(() => {
        setData({
            intId: values.intId || null,
            intIdEmpresario: values.intIdEmpresario || null,
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
        <Fragment>
            <ModalDelete
                socket={socket}
                onClose={handleOpenModalDelete}
                open={openModalDelete}
                values={{
                    intId: data.intId,
                    intIdEmpresario: data.intIdEmpresario,
                }}
            />

            <ModalEditRespuesta
                socket={socket}
                onClose={handleOpenModalUpdate}
                open={openModalUpdate}
                values={data}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <Box className={classes.avatar}>
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
                                        <MenuItem onClick={() => handleOpenModalUpdate()}>
                                            Editar
                                        </MenuItem>
                                        <MenuItem onClick={() => handleOpenModalDelete()}>
                                            Eliminar
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    whiteSpace: "normal",
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                            >
                                {data.strComentario}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Fragment>
    );
};

export default memo(PaperGetRespuestas);
