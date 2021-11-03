import React, { useState } from "react";

//Librerias
import { useForm } from "react-hook-form";

//Componentes de Material UI
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    useTheme,
    useMediaQuery,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";

const ModalCheckComentario = ({ socket, values, onClose, open }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

    const { handleSubmit } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const onSubmit = () => {
        setLoading(true);

        socket.emit("mdlComentarios:checkComentario", {
            intId: values.intId,
            intIdEmpresario: values.intIdEmpresario,
            btResuelto: !values.btResuelto,
            strTipo: values.strTipo,
            strMensaje: values.strMensaje,
            strUsuario: values.strUsuario,
            arrUsuarioAsignado: values.arrUsuarioAsignado,
            strURLImagenUsuario: values.strURLImagenUsuario,
        });

        setLoading(false);

        onClose();
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullScreen={bitMobile}
            PaperProps={{
                component: "form",
                noValidate: "noValidate",
                onSubmit: handleSubmit(onSubmit),
                style: {
                    backgroundColor: !loading ? "#FDEDED" : "inherit",
                },
            }}
        >
            <DialogTitle>
                {values.btResuelto === true
                    ? "¿Está seguro de desmarcar como completado?"
                    : "¿Está seguro de marcar como completado?"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Recuerda que, al aceptar, se actualizara el comentario.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <LoadingButton loading={loading} type="submit" color="error">
                    si
                </LoadingButton>

                <Button onClick={() => onClose()} color="inherit">
                    no
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalCheckComentario;
