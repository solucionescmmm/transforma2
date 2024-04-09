import React from "react";

// Librerias
//Componentes de Material UI
import { DialogContent, DialogActions, Dialog, Button } from "@mui/material";

import PDF from "./PDF";

const ModalPDF = ({ handleOpenDialog, open, intIdIdea, intIdDiagnostico, values }) => {
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Dialog
            open={open}
            onClose={handleOpenDialog}
            fullScreen
            sx={{ padding: "0px" }}
        >
            <DialogContent sx={{ overflow: "hidden", padding: "0px" }}>
                <PDF intId={intIdIdea} intIdDiagnostico={intIdDiagnostico} values={values} />
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleOpenDialog()} color="inherit">
                    cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPDF;
