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

import { DateTimePicker, DatePicker } from "@mui/lab";

// Componentes
import SelectListas from "../../../components/selectLista";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const InfoIntereses = ({
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
        strOtroCliCanGusLle: "",
        strPlaPagConveni: "",
        strCualMetaVenMen: "",
        strCuenApalaFinResCor: "",
        strCondiPagConve: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strOtroCliCanGusLle: values.strOtroCliCanGusLle || "",
                strPlaPagConveni: values.strPlaPagConveni || "",
                strCualMetaVenMen: values.strCualMetaVenMen || "",
                strCuenApalaFinResCor: values.strCuenApalaFinResCor || "",
                strCondiPagConve: values.strCondiPagConve || "",
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
                            color: errors?.objInfoIntereses ? "#D33030" : "inherit",
                        }}
                    >
                        Intereses
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
                    borderColor: errors?.objInfoIntereses ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Controller
                            name="objInfoIntereses.strOtroCliCanGusLle"
                            defaultValue={data.strOtroCliCanGusLle}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿A qué otros clientes y/o canales le gustaria llegar?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoIntereses
                                            ?.strOtroCliCanGusLle
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe a qué otros clientes"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Controller
                            name="objInfoIntereses.strPlaPagConveni"
                            defaultValue={data.strPlaPagConveni}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Plazos de pago convenientes"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoIntereses
                                            ?.strPlaPagConveni
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe los plazos"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoIntereses.strCualMetaVenMen"
                            defaultValue={data.strCualMetaVenMen}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="¿Cuáles son las metas de ventas mensuales?"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoIntereses
                                            ?.strCualMetaVenMen
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe las metas"
                                    fullWidth
                                    multiline
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoIntereses.strCuenApalaFinResCor"
                            defaultValue={data.strCuenApalaFinResCor}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Cuenta apalancamiento financiero para responder a negocios corporativos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoIntereses
                                            ?.strCuenApalaFinResCor
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoIntereses
                                            ?.strCuenApalaFinResCor?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoIntereses.strCondiPagConve"
                            defaultValue={data.strCondiPagConve}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Condiciones de pago convenientes (compra y/o consignación)"
                                    name={name}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoIntereses
                                            ?.strCondiPagConve
                                            ? true
                                            : false
                                    }
                                    helperText="Escribe las condiciones"
                                    fullWidth
                                    multiline
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

export default InfoIntereses;
