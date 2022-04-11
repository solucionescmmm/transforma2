import React from "react";

import { Link as RouterLink } from "react-router-dom";

//Componentes de Material UI
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Grid,
    useTheme,
    useMediaQuery,
} from "@mui/material";

// Iconos
import { Article as ArticleIcon } from "@mui/icons-material";

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
            <DialogTitle>Resumen de diagnóstico empresarial</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Selecciona el resumen que desea visualizar
                </DialogContentText>

                <Grid container direction="row" spacing={2} style={{marginTop: "15px"}}>
                    <Grid item xs={6}>
                        <Button
                            component={RouterLink}
                            to={`/diagnosticos/diagDesign/product/read/${values.intIdProducto}`}
                            color="primary"
                            disabled={!values?.intGeneral}
                            startIcon={<ArticleIcon />}
                        >
                            General
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            component={RouterLink}
                            to={`/diagnosticos/diagDesign/product/read/${values.intIdProducto}`}
                            color="primary"
                            disabled={!values?.intIdHumano}
                            startIcon={<ArticleIcon />}
                        >
                            Competencias Humanas
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            component={RouterLink}
                            to={`/diagnosticos/diagDesign/product/read/${values.intIdProducto}`}
                            color="primary"
                            disabled={!values?.intIdProducto}
                            startIcon={<ArticleIcon />}
                        >
                            Competencias Técnicas
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => onClose()} color="inherit">
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalResumen;
