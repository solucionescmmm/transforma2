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

const ModalDeleteComentario = ({ socket, values, onClose, open }) => {
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

        socket.emit("mdlComentarios:deleteComentario", {
            intId: values.intId,
            intIdEmpresario: values.intIdEmpresario,
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
            <DialogTitle>¿Está seguro de eliminar este comentario?</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Recuerda que, al aceptar, todas las respuestas asociadas a este
                    comentario serán eliminadas de forma permanente.
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

export default ModalDeleteComentario;
