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
    Button,
    Collapse,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";

//Iconos
import {
    Comment as CommentIcon,
    MoreVert as MoreVertIcon,
} from "@mui/icons-material";

//Componentes
import PaperGetRespuestas from "./paperGetRespuestas";
import ModalAddRespuesta from "./modalAddRespuesta";
import ModalDeleteComentario from "./modalDeleteComentario";
import ModalEditComentario from "./modalEditComentario";

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

const Comentario = ({ values, socket }) => {
    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { strInfoUser } = useContext(AuthContext);

    const [openRespuestas, setOpenRespuestas] = useState(false);
    const [openModalAddRespuesta, setOpenModalAddRespuesta] = useState(false);
    const [openModalEditComentario, setOpenModalEditComentario] =
        useState(false);
    const [openModalDeleteComentario, setOpenModalDeleteComentario] =
        useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const openMenu = Boolean(anchorEl);

    const [data, setData] = useState({
        intIdComentario: null,
        intIdIdea: null,
        strMensaje: "",
        dtmCreacion: null,
        strUsuarioCreacion: "",
        strURLImagenUsuario: "",
        arrRespuestas: [],
    });

    const classes = styles();

    const handlerChangeOpenCollapse = () => {
        setOpenRespuestas(!openRespuestas);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOpenModalAddRespuesta = () => {
        setOpenModalAddRespuesta(!openModalAddRespuesta);
    };

    const handleOpenModalDeleteComentario = () => {
        setOpenModalDeleteComentario(!openModalDeleteComentario);
    };

    const handleOpenModalEditComentario = () => {
        setOpenModalEditComentario(!openModalEditComentario);
    };

    useEffect(() => {
        setData({
            intIdComentario: values.intId || null,
            intIdIdea: values.intIdIdea || null,
            strMensaje: values.strMensaje || "",
            dtmCreacion: values.dtmCreacion
                ? format(parseISO(values.dtmCreacion), "yyyy-MM-dd hh:mm")
                : "",
            strUsuarioCreacion: values.strUsuarioCreacion || "",

            strURLImagenUsuario: values.strURLImagenUsuario || "",
            arrRespuestas: values.objRespuesta || [],
        });
    }, [values]);

    return (
        <Fragment>
            <ModalAddRespuesta
                socket={socket}
                onClose={handleOpenModalAddRespuesta}
                open={openModalAddRespuesta}
                values={{
                    intIdComentario: data.intIdComentario,
                    intIdIdea: data.intIdIdea,
                }}
            />

            <ModalDeleteComentario
                socket={socket}
                onClose={handleOpenModalDeleteComentario}
                open={openModalDeleteComentario}
                values={{
                    intId: data.intIdComentario,
                    intIdIdea: data.intIdIdea,
                }}
            />

            <ModalEditComentario
                socket={socket}
                onClose={handleOpenModalEditComentario}
                open={openModalEditComentario}
                values={data}
            />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Box className={classes.avatar}>
                    <Avatar
                        alt={data.strUsuario}
                        src={data.strURLImagenUsuario}
                    />
                </Box>

                <Paper sx={{ padding: "10px", width: "90%" }}>
                    <Grid container direction="row" spacing={0}>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="subtitle2"
                                        component="p"
                                    >
                                        {data.strUsuarioCreacion}
                                    </Typography>
                                    <Typography sx={{ fontSize: "10px" }}>
                                        {data.dtmCreacion}
                                    </Typography>
                                </Box>

                                <Box>
                                    <IconButton
                                        size="small"
                                        onClick={handleOpenMenu}
                                        disabled={
                                            strInfoUser.strUsuario !==
                                            data.strUsuarioCreacion
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
                                        <MenuItem
                                            onClick={() =>
                                                handleOpenModalEditComentario()
                                            }
                                        >
                                            Editar
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() =>
                                                handleOpenModalDeleteComentario()
                                            }
                                        >
                                            Eliminar
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>{data.strMensaje}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                startIcon={<CommentIcon />}
                                size="small"
                                sx={{ fontSize: "10px" }}
                                color="inherit"
                                onClick={() => handleOpenModalAddRespuesta()}
                            >
                                responder
                            </Button>

                            <Button
                                size="small"
                                sx={{ fontSize: "10px" }}
                                color="inherit"
                                onClick={() => handlerChangeOpenCollapse()}
                                disabled={
                                    data.arrRespuestas.length === 0
                                        ? true
                                        : false
                                }
                            >
                                {openRespuestas
                                    ? "Cerrar respuestas"
                                    : " Mostrar respuestas"}{" "}
                                ({data.arrRespuestas.length})
                            </Button>
                        </Grid>

                        <Collapse
                            timeout="auto"
                            in={openRespuestas}
                            sx={{ width: "100%" }}
                        >
                            <Grid container direction="row" spacing={2}>
                                {data.arrRespuestas.map((e, i) => (
                                    <Grid
                                        item
                                        xs={12}
                                        key={i}
                                        sx={{ marginLeft: "25px" }}
                                    >
                                        <PaperGetRespuestas
                                            values={{
                                                ...e,
                                                intIdIdea: data.intIdIdea,
                                            }}
                                            socket={socket}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>
                    </Grid>
                </Paper>
            </Box>
        </Fragment>
    );
};

export default memo(Comentario);
