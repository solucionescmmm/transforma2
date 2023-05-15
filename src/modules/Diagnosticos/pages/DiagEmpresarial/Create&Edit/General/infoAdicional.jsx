import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Grid,
    Collapse,
    Box,
    Typography,
    IconButton,
    Tooltip,
    CircularProgress,
    TextField,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import Dropzone from "../../../../../../common/components/dropzone";

const InfoAdicional = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    clearErrors,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strConclusiones: "",
        strURLSFotosProducto: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({});
        }

        setLoading(false);
    }, [values]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress size={30} />
            </Box>
        );
    }

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.objInfoAdicional ? "#D33030" : "inherit",
                        }}
                    >
                        Información adicional (Concluciones, observaciones y registro
                        fotográfico)
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()} size="large">
                        <Tooltip
                            title={
                                openCollapese ? "Contraer detalle" : "Expandir detalle"
                            }
                        >
                            {openCollapese ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <hr
                style={{
                    borderColor: errors?.objInfoAdicional ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strConclusiones}
                            name="objInfoAdicional.strConclusiones"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Conclusiones y observaciones"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    multiline
                                    minRows={4}
                                    variant="outlined"
                                    error={
                                        errors?.objInfoAdicional?.strConclusiones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strConclusiones
                                            ?.message ||
                                        "Digita detalladamente tu respuesta"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required: "Por favor, digita detalladamente tu respuesta",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strURLSFotosProducto}
                            name="objInfoAdicional.strURLSFotosProducto"
                            render={({ field: { name, onChange, value } }) => (
                                <Dropzone
                                    label="Registro fotográfico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(url) => onChange(url)}
                                    maxFiles={1}
                                    type="Imagen"
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    error={
                                        errors?.objInfoAdicional?.strURLSFotosProducto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strURLSFotosProducto
                                            ?.message ||
                                        "Selecciona las fotografias del registro del producto"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoAdicional;
