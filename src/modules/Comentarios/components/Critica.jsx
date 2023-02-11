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
    Checkbox,
    Tooltip,
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
import ModalCheckComentario from "./modalCheckComentario";

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

const ComentarioCritico = ({ values, socket }) => {
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
    const [openModalCheckComentario, setOpenModalCheckComentario] =
        useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const openMenu = Boolean(anchorEl);

    const [data, setData] = useState({
        intIdComentario: null,
        intIdEmpresario: null,
        strMensaje: "",
        dtmActualizacion: null,
        strUsuario: "",
        strUsuarioAsignado: "",
        strURLImagenUsuario: "",
        arrRespuestas: [],
        btResuelto: false,
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

    const handleOpenModalCheckComentario = () => {
        setOpenModalCheckComentario(!openModalCheckComentario);
    };

    useEffect(() => {
        setData({
            intIdComentario: values.intId || null,
            intIdEmpresario: values.intIdEmpresario || null,
            strMensaje: values.strMensaje || "",
            dtmActualizacion: values.dtmActualizacion
                ? format(parseISO(values.dtmActualizacion), "yyyy-MM-dd hh:mm")
                : "",
            strUsuario: values.strUsuario || "",
            strUsuarioAsignado: values.strUsuarioAsignado || "",
            strURLImagenUsuario: values.strURLImagenUsuario || "",
            arrRespuestas: values.objRespuesta || [],
            strTipo: values.strTipo || "",
            btResuelto: values.btResuelto,
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
                    intIdEmpresario: data.intIdEmpresario,
                }}
            />

            <ModalCheckComentario
                socket={socket}
                onClose={handleOpenModalCheckComentario}
                open={openModalCheckComentario}
                values={data}
            />

            <ModalDeleteComentario
                socket={socket}
                onClose={handleOpenModalDeleteComentario}
                open={openModalDeleteComentario}
                values={{
                    intId: data.intIdComentario,
                    intIdEmpresario: data.intIdEmpresario,
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

                <Paper sx={{ width: "90%" }}>
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ flexGrow: 1, padding: "10px" }}>
                            <Grid container direction="row" spacing={0}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="subtitle2"
                                                component="p"
                                            >
                                                {data.strUsuario}
                                            </Typography>
                                            <Typography
                                                sx={{ fontSize: "10px" }}
                                            >
                                                {data.dtmActualizacion}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography
                                                sx={{ fontSize: "12px" }}
                                            >
                                                Crítico
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <IconButton
                                                size="small"
                                                onClick={handleOpenMenu}
                                                disabled={
                                                    strInfoUser.strUsuario !==
                                                    data.strUsuario
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

                                        <Box>
                                            <Tooltip title="Marcar como completada">
                                                <Checkbox
                                                    size="small"
                                                    checked={data.btResuelto}
                                                    onChange={() =>
                                                        handleOpenModalCheckComentario()
                                                    }
                                                />
                                            </Tooltip>
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
                                        onClick={() =>
                                            handleOpenModalAddRespuesta()
                                        }
                                    >
                                        responder
                                    </Button>

                                    <Button
                                        size="small"
                                        sx={{ fontSize: "10px" }}
                                        color="inherit"
                                        onClick={() =>
                                            handlerChangeOpenCollapse()
                                        }
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
                                                        intIdEmpresario:
                                                            data.intIdEmpresario,
                                                    }}
                                                    socket={socket}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Collapse>
                            </Grid>
                        </Box>

                        <Box
                            sx={{
                                width: "5px",
                                backgroundColor: (theme) =>
                                    data.btResuelto === false ||
                                    data.btResuelto === null
                                        ? theme.palette.error.light
                                        : theme.palette.success.light,
                                borderRadius: "0px 4px 4px 0px",
                            }}
                        ></Box>
                    </Box>
                </Paper>
            </Box>
        </Fragment>
    );
};

export default memo(ComentarioCritico);
