import React from "react";

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

const ModalResumen = ({ onClose, open, values, onChangeRoute }) => {
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
            <DialogTitle>Detalle de diagnóstico empresarial</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Selecciona el detalle que desea visualizar
                </DialogContentText>

                <Grid
                    container
                    direction="row"
                    spacing={2}
                    style={{ marginTop: "15px" }}
                >
                    <Grid item xs={6}>
                        <Button
                            onClick={() =>
                                onChangeRoute("DiagEmpresarialRead", {
                                    intIdIdea: values.intIdIdea,
                                    intIdDiagnostico: values.intIdDiagnostico,
                                })
                            }
                            color="primary"
                            disabled={!values?.objResumen.bitResumenGen}
                            startIcon={<ArticleIcon />}
                        >
                            General
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            onClick={() =>
                                onChangeRoute("DiagEmpresarialHumRead", {
                                    intIdIdea: values.intIdIdea,
                                    intIdDiagnostico: values.intIdDiagnostico,
                                })
                            }
                            color="primary"
                            disabled={!values?.objResumen.bitResumenHumano}
                            startIcon={<ArticleIcon />}
                        >
                            Competencias Humanas
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button
                            color="primary"
                            disabled={!values?.objResumen.bitResumenTec}
                            onClick={() =>
                                onChangeRoute("DiagEmpresarialTecRead", {
                                    intIdIdea: values.intIdIdea,
                                    intIdDiagnostico: values.intIdDiagnostico,
                                })
                            }
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
