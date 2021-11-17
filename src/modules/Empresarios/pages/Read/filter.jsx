import React, { useState, Fragment } from "react";

// Componentes de Material UI
import {
    TextField,
    Grid,
    Collapse,
    Box,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const FiltersEmpresarios = ({ data }) => {
    const [openCollapse, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapse);
    };

    return (
        <div style={{ padding: "10px" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                }}
            >
                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()} size="large">
                        <Tooltip
                            title={openCollapse ? "Contraer detalle" : "Expandir detalle"}
                        >
                            {openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Tooltip>
                    </IconButton>
                </Box>

                <Box>
                    <Typography>Buscador avanzado</Typography>
                </Box>
            </Box>

            <Collapse in={openCollapse} timeout="auto">
                <Grid container direction="row" spacing={2} sx={{ padding: "10px" }}>
                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Nombres"
                            variant="standard"
                            helperText="Nombre de la persona empresaria"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Apellidos"
                            variant="standard"
                            helperText="Apellidos de la persona empresaria"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={1}>
                        <TextField
                            label="Documento"
                            variant="standard"
                            helperText="Documento de la persona empresaria"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Empresa"
                            variant="standard"
                            helperText="Nombre de la empresa de la persona empresaria"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Sede"
                            variant="standard"
                            helperText="Sede donde fue registrada"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <TextField
                            label="Categoria"
                            variant="standard"
                            helperText="Categoria de la empresa"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} md={1}>
                        <TextField
                            label="Estado"
                            variant="standard"
                            helperText="Estado de la persona empresaria"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </div>
    );
};

export default FiltersEmpresarios;
