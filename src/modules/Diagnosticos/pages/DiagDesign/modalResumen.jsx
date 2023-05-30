import React from "react";

//Componentes de Material UI
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    useTheme,
    useMediaQuery,
} from "@mui/material";

const ModalResumen = ({ onClose, open, values }) => {
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("md"));

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            fullScreen={bitMobile}
        >
            <DialogTitle>Resumen de diagnóstico de diseño</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Selecciona el resumen que desea visualizar
                </DialogContentText>

                <DialogContentText sx={{ marginTop: "30px", fontSize: "15px" }}>
                    Nota: Recuerda que solo se habilitaran los diagnosticos que
                    se encuentren registrados y asociados a esta persona
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    color="primary"
                    disabled={!values?.intIdProducto}
                >
                    producto
                </Button>
                <Button
                    color="primary"
                    disabled={!values?.intIdServicio}
                >
                    servicio
                </Button>
                <Button onClick={() => onClose()} color="inherit">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalResumen;
