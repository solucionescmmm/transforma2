import { useState, useEffect } from "react";

//Componentes de Material UI
import {
    DialogContent,
    DialogActions,
    Dialog,
    Grid,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    Alert,
    AlertTitle,
    IconButton,
    Tooltip,
    Box,
    Collapse,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// Componentes
import ReturnTypeInput from "../../../components/returnTypeInput";

const ModalPreview = ({ values, handleOpenDialog, open, dataAttributes }) => {
    const [state, setState] = useState({ strNombre: "", arrAtributos: [] });

    console.log(dataAttributes);

    const [openCollapese, setOpenCollapse] = useState(true);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        if (values) {
            setState(values);
        }
    }, [values]);

    if (!values?.strNombre || !values?.arrAtributos?.length === 0) {
        return (
            <Dialog
                fullScreen={bitMobile}
                open={open}
                onClose={handleOpenDialog}
                PaperProps={{
                    style: {
                        backgroundColor: "#FDEDED",
                    },
                }}
            >
                <DialogContent>
                    <Alert severity="error">
                        <AlertTitle>
                            <b>Faltan datos para previsualizar</b>
                        </AlertTitle>
                        Ha ocurrido un error al momento de previsualizar los
                        datos, asegurate que rellenaste los campos
                        correspondientes del formulario
                    </Alert>
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
            open={open}
            onClose={handleOpenDialog}
            maxWidth="lg"
        >
            <DialogContent>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Typography
                            align="center"
                            style={{ fontWeight: "bold" }}
                            color="primary"
                            variant="h6"
                        >
                            {state.strNombre}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="caption">
                            Todos los campos marcados con (*) son obligatorios.
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sx={{ marginBottom: "30px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Información principal
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() => handlerChangeOpenCollapse()}
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapese
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapese ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <hr />

                        <Collapse in={openCollapese} timeout="auto">
                            <Grid container direction="row" spacing={2}>
                                {state.arrAtributos.map((v, i) => (
                                    <Grid item xs={12} key={i}>
                                        <ReturnTypeInput
                                            label={
                                                dataAttributes
                                                    .filter(
                                                        (a) =>
                                                            a.intId ===
                                                            v.intIdAtributo
                                                    )
                                                    ?.at(0)?.strNombre || ""
                                            }
                                            type={
                                                dataAttributes
                                                    .filter(
                                                        (a) =>
                                                            a.intId ===
                                                            v.intIdAtributo
                                                    )
                                                    ?.at(0)?.intIdTipoCampo ||
                                                ""
                                            }
                                            helperText="Digita o selecciona una opción"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Información de los módulos
                                </Typography>
                            </Box>
                        </Box>

                        <hr />

                        <Alert severity="warning">
                            Los módulos no están disponibles en el modo
                            previsualización
                        </Alert>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Responsables del servicio
                                </Typography>
                            </Box>
                        </Box>

                        <hr />

                        <Alert severity="warning">
                            Los responsables del servicio no están disponibles
                            en el modo previsualización
                        </Alert>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => handleOpenDialog()} color="inherit">
                    cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPreview;
