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
        strURLSFotos: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);
    const [openCollapeseImg, setOpenCollapseImg] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeOpenCollapseImg = () => {
        setOpenCollapseImg(!openCollapeseImg);
    };

    useEffect(() => {
        if (values) {
            setData({
                strConclusiones: values.strConclusiones || "",
                strURLSFotos: values.strURLSFotos || "",
            });
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
                        Conclusiones y observaciones
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
                </Grid>
            </Collapse>

            <Box sx={{ display: "flex", alignItems: "center", paddingTop: "15px" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.objInfoAdicional ? "#D33030" : "inherit",
                        }}
                    >
                        Registro fotográfico
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapseImg()} size="large">
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

            <Collapse in={openCollapeseImg} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strURLSFotos}
                            name="objInfoAdicional.strURLSFotos"
                            render={({ field: { name, onChange, value } }) => (
                                <Dropzone
                                    label="Registro fotográfico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(url) => onChange(url)}
                                    maxFiles={10}
                                    type="Imagen"
                                    setError={setError}
                                    clearErrors={clearErrors}
                                    error={
                                        errors?.objInfoAdicional?.strURLSFotos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoAdicional?.strURLSFotos?.message ||
                                        "Selecciona las fotografías del registro"
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
