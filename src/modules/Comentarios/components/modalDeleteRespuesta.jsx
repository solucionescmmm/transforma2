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

const ModalDeleteRespuesta = ({ socket, values, onClose, open }) => {
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

        socket.emit("mdlComentarios:deleteRespuesta", {
            intId: values.intId,
            intIdIdea: values.intIdIdea
        });

        socket.on("mdlComentarios:deleteRespuesta", () => {
            onClose();
            setLoading(false);
        });
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================

    return (
        <Dialog
            open={loading || open}
            onClose={onClose}
            maxWidth="md"
            fullScreen={bitMobile}
            PaperProps={{
                component: "form",
                noValidate: "noValidate",
                onSubmit: handleSubmit(onSubmit)
            }}
        >
            <DialogTitle>¿Está seguro de eliminar está respuesta?</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Al aceptar, la información se eliminara de forma permanente.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <LoadingButton loading={loading} type="submit" color="error">
                    si
                </LoadingButton>

                <Button onClick={() => onClose()} disabled={loading} color="inherit">
                    no
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDeleteRespuesta;
