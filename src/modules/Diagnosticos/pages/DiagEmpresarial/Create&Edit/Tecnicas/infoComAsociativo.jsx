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
import SelectListas from "../../../../components/selectLista";
import SelectListasNivel from "../../../../components/selectListasNivel";

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
        strPartReuPerioSociSoliNivel: "",
        strConApliEstOrgSociSoli: "",
        strConApliEstOrgSociSoliDetalle: "",
        strConApliEstOrgSociSoliNivel: "",
        strAsociEmpoOrgAdmin: "",
        strAsociEmpoOrgAdminDetalle: "",
        strAsociEmpoOrgAdminNivel: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strPartReuPerioSociSoli: values.strPartReuPerioSociSoli || "",
                strPartReuPerioSociSoliDetalle:
                    values.strPartReuPerioSociSoliDetalle || "",
                strPartReuPerioSociSoliNivel: "",
                strConApliEstOrgSociSoli: values.strConApliEstOrgSociSoli || "",
                strConApliEstOrgSociSoliDetalle:
                    values.strConApliEstOrgSociSoliDetalle || "",
                strConApliEstOrgSociSoliNivel: "",
                strAsociEmpoOrgAdmin: values.strAsociEmpoOrgAdmin || "",
                strAsociEmpoOrgAdminDetalle:
                    values.strAsociEmpoOrgAdminDetalle || "",
                strAsociEmpoOrgAdminNivel: "",
            });
        }

        setLoading(false);
    }, [values]);

    const propiedades = [
        {
            name: "strPartReuPerioSociSoli",
            label: "Participo en las reuniones periódicas de la organización social y solidaria (asociación)",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "PartReuPerioSociSoli",
        },
        {
            name: "strPartReuPerioSociSoliDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "PartReuPerioSociSoli",
        },
        {
            name: "strPartReuPerioSociSoliNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "PartReuPerioSociSoli",
        },
        {
            name: "strConApliEstOrgSociSoli",
            label: "Conozco y aplico estatutos de la organización social y solidaria",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "ConApliEstOrgSociSoli",
        },
        {
            name: "strConApliEstOrgSociSoliDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "ConApliEstOrgSociSoli",
        },
        {
            name: "strConApliEstOrgSociSoliNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "ConApliEstOrgSociSoli",
        },
        {
            name: "strAsociEmpoOrgAdmin",
            label: "Los asociados están empoderados y cuentan con órganos de administración y control",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "AsociEmpoOrgAdmin",
        },
        {
            name: "strAsociEmpoOrgAdminDetalle",
            label: "Detalle",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "AsociEmpoOrgAdmin",
        },
        {
            name: "strAsociEmpoOrgAdminNivel",
            label: "Nivel",
            strGrupo: "DiagnosticoTecnico",
            strCodigo: "AsociEmpoOrgAdmin",
        },
    ];

    const handlerChangeData = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    const render = (datos) => {
        return datos.map(({ name, label, strGrupo, strCodigo }) => (
            <Grid
                item
                xs={12}
                md={label === "Detalle" ? 3 : label === "Nivel" ? 2 : 7}
            >
                <Controller
                    name={`objInfoComAsociativo.${name}`}
                    defaultValue={data[name]}
                    render={({ field: { name, value, onChange } }) =>
                        label === "Detalle" ? (
                            <TextField
                                label={label}
                                autoFocus
                                name={name}
                                value={value}
                                disabled={disabled}
                                onChange={(e) => onChange(e)}
                                error={
                                    errors?.objInfoComAsociativo?.[name]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComAsociativo?.[name]
                                        ?.message ||
                                    "Digita el detalle en caso de que aplique"
                                }
                                fullWidth
                                variant="standard"
                            />
                        ) : label === "Nivel" ? (
                            <SelectListasNivel
                                label={label}
                                name={name}
                                value={value}
                                valueList={data[name]}
                                onChange={(e) => onChange(e)}
                                error={
                                    errors?.objInfoComAsociativo?.[name]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComAsociativo?.[name]
                                        ?.message || "Nivel"
                                }
                                strGrupo={strGrupo}
                                strCodigo={strCodigo}
                            />
                        ) : (
                            <SelectListas
                                label={label}
                                name={name}
                                value={value}
                                disabled={disabled}
                                onChange={(e) => {
                                    onChange(e);
                                    handlerChangeData(strGrupo, e.target.value);
                                }}
                                error={
                                    errors?.objInfoComAsociativo?.[name]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComAsociativo?.[name]
                                        ?.message || "Seleccione una opción"
                                }
                                strGrupo={strGrupo}
                                strCodigo={strCodigo}
                            />
                        )
                    }
                    control={control}
                />
            </Grid>
        ));
    };

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
                        Componente Asociativo
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
                    borderColor: errors?.objInfoComAsociativo
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    {render(propiedades)}
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoComMercadeo;
