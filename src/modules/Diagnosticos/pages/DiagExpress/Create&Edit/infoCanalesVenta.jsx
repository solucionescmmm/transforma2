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

//Componentes
import ModalMediosDigitales from "../../../../Empresarios/components/modalMediosDigitales";
import ModalMediosVetanProductos from "../../../../Empresarios/components/modalMediosVentaProductos";
import SelectListas from "../../../components/selectLista";

const InfoCanalesVenta = ({
    disabled,
    values,
    errors,
    control,
    intIdIdea,
    setValue,
    clearErrors,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        arrMediosDigitales: [],
        arrFormasComercializacion: [],
        strOtrosCanales: "",
        strCualesOtrosCanales: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                intId: values.intId || null,
                arrMediosDigitales: values.arrMediosDigitales || [],
                arrFormasComercializacion:
                    values.arrFormasComercializacion || [],
                strOtrosCanales: values.strOtrosCanales || "",
                strCualesOtrosCanales: values.strCualesOtrosCanales || "",
            });
        }

        setLoading(false);
    }, [values]);

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
            >
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
                            color: errors?.objInfoGeneral
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Canales de ventas
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

            <hr
                style={{
                    borderColor: errors?.objInfoCanalesVenta
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrMediosDigitales}
                            name="objInfoCanalesVenta.arrMediosDigitales"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosDigitales
                                    label="Medios digitales"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoCanalesVenta
                                            ?.arrMediosDigitales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoCanalesVenta
                                            ?.arrMediosDigitales?.message ||
                                        "Selecciona los medios digitales que utilice y registre su ID"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrFormasComercializacion}
                            name="objInfoCanalesVenta.arrFormasComercializacion"
                            render={({ field: { name, value, onChange } }) => (
                                <ModalMediosVetanProductos
                                    label="Formas de comercialización"
                                    name={name}
                                    value={value}
                                    onChange={(value) => onChange(value)}
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoCanalesVenta
                                            ?.arrFormasComercializacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoCanalesVenta
                                            ?.arrFormasComercializacion
                                            ?.message ||
                                        "Selecciona los medios que utilice para la venta de sus productos o servicios"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strOtrosCanales}
                            name="objInfoCanalesVenta.strOtrosCanales"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectListas
                                    label="¿Ha desarrollado otros canales que le apoyen en el crecimiento en ventas?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);
                                        setData((prev) => ({
                                            ...prev,
                                            strOtrosCanales: e.target.value,
                                        }));
                                        setValue(
                                            "objInfoCanalesVenta.strCualesOtrosCanales",
                                            ""
                                        );
                                    }}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoCanalesVenta
                                            ?.strOtrosCanales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoCanalesVenta
                                            ?.strOtrosCanales?.message ||
                                        "Selecciona si la empresa ha desarrollado otros canales que le apoyen en el crecimiento en ventas"
                                    }
                                    strGrupo="Lista_Generica"
                                    strCodigo="SI_NO_N/A"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            defaultValue={data.strCualesOtrosCanales}
                            name="objInfoCanalesVenta.strCualesOtrosCanales"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="¿Cuáles?"
                                    name={name}
                                    value={value}
                                    disabled={
                                        !data.strCualesOtrosCanales || disabled
                                    }
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    minRows={4}
                                    error={
                                        errors?.objInfoCanalesVenta
                                            ?.strCualesOtrosCanales
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoCanalesVenta
                                            ?.strCualesOtrosCanales?.message ||
                                        "Digita tu respuesta"
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

export default InfoCanalesVenta;
