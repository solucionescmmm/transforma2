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
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";

const InfoComMercadeo = ({
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
        strPartReuPerioSociSoli: "",
        strPartReuPerioSociSoliDetalle: "",
        strConApliEstOrgSociSoli: "",
        strConApliEstOrgSociSoliDetalle: "",
        strAsociEmpoOrgAdmin: "",
        strAsociEmpoOrgAdminDetalle: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({
                strPartReuPerioSociSoli: values.strPartReuPerioSociSoli || "",
                strConApliEstOrgSociSoli: values.strConApliEstOrgSociSoli || "",
                strAsociEmpoOrgAdmin: values.strAsociEmpoOrgAdmin || "",
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
                            color: errors?.objInfoComAsociativo
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente financiero
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
                    borderColor: errors?.objInfoComAsociativo ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComAsociativo.strPartReuPerioSociSoli"
                            defaultValue={data.strPartReuPerioSociSoli}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Participo en las reuniones periódicas de la organización social y solidaria (asociación)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAsociativo
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAsociativo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComAsociativo.strConApliEstOrgSociSoli"
                            defaultValue={data.strConApliEstOrgSociSoli}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Conozco y aplico estatutos de la organización social y solidaria"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAsociativo
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAsociativo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComAsociativo.strAsociEmpoOrgAdmin"
                            defaultValue={data.strAsociEmpoOrgAdmin}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Los asociados están empoderados y cuentan con órganos de administración y control"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAsociativo
                                            ?.strProporcion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAsociativo
                                            ?.strProporcion?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
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

export default InfoComMercadeo;
