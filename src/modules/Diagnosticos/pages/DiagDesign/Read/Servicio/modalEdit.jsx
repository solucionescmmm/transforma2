import React, { useState, useEffect } from "react";

// Liberias
import { Link as RouterLink } from "react-router-dom";

//Componentes de Material UI
import {
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    LinearProgress,
    CircularProgress,
    Alert,
    AlertTitle,
} from "@mui/material";

//Estilos
import { makeStyles } from "@mui/styles";

const modalRejectStyles = makeStyles(() => ({
    linearProgress: {
        position: "absolute",
        width: "100%",
    },
}));

const ModalEditDiagServ = ({ handleOpenDialog, open, intId }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        intId: null,
    });

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = modalRejectStyles();

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (intId) {
            setData({
                intId,
            });
        }

        setLoading(false);
    }, [intId]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (!data.intId) {
        return (
            <Dialog
                fullScreen={bitMobile}
                open={open}
                onClose={handleOpenDialog}
                PaperProps={{
                    style: {
                        backgroundColor:
                            !loading && !data.intId ? "#FDEDED" : "inherit",
                    },
                }}
            >
                <DialogContent>
                    {loading ? (
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Alert severity="error">
                            <AlertTitle>
                                <b>
                                    No se encontro el identificador del
                                    empresario
                                </b>
                            </AlertTitle>
                            Ha ocurrido un error al momento de seleccionar los
                            datos, por favor escala al área de TI para mayor
                            información.
                        </Alert>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleOpenDialog()} color="inherit">
                        cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <Dialog
            fullScreen={bitMobile}
            open={loading ? true : open}
            onClose={handleOpenDialog}
            fullWidth
        >
            {loading ? (
                <LinearProgress className={classes.linearProgress} />
            ) : null}
            <DialogTitle>{`¿Deseas editar la información del diagnóstico de servicio?`}</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Recuerda que, al momento de editar la información, esta se
                    sobrescribirá automáticamente.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    component={RouterLink}
                    to={`/diagnosticos/diagDesign/service/edit`}
                    color="success"
                >
                    editar
                </Button>

                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    disabled={loading}
                >
                    cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditDiagServ;
