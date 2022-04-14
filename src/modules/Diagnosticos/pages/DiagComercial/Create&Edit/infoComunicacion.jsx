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
import SelectListasNivel from "../../../components/selectListasNivel";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const InfoComunicacion = ({
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
        strRealCampaPromoDiv: "",
        strRealCampaPromoDivLvl: "",
        strDefiniArguComerComu: "",
        strDefiniArguComerComuLvl: "",
        strEmpreDisCataProdEspe: "",
        strEmpreDisCataProdEspeLvl: "",
        strDesaEstraProComuMed: "",
        strDesaEstraProComuMedLvl: "",
        strReaActiEmpreDeguMues: "",
        strReaActiEmpreDeguMuesLvl: "",
        strCuentPresuRealiMedDifu: "",
        strCuentPresuRealiMedDifuLvl: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    const handlerChangeData = (key, value) => {
        setData((prevState) => ({
            ...prevState,
            [key]: value,
        }));
    };

    useEffect(() => {
        if (values) {
            setData({
                strRealCampaPromoDiv: values.strRealCampaPromoDiv || "",
                strRealCampaPromoDivLvl: values.strRealCampaPromoDivLvl || "",
                strDefiniArguComerComu: values.strDefiniArguComerComu || "",
                strDefiniArguComerComuLvl: values.strDefiniArguComerComuLvl || "",
                strEmpreDisCataProdEspe: values.strEmpreDisCataProdEspe || "",
                strEmpreDisCataProdEspeLvl: values.strEmpreDisCataProdEspeLvl || "",
                strDesaEstraProComuMed: values.strDesaEstraProComuMed || "",
                strDesaEstraProComuMedLvl: values.strDesaEstraProComuMedLvl || "",
                strReaActiEmpreDeguMues: values.strReaActiEmpreDeguMues || "",
                strReaActiEmpreDeguMuesLvl: values.strReaActiEmpreDeguMuesLvl || "",
                strCuentPresuRealiMedDifu: values.strCuentPresuRealiMedDifu || "",
                strCuentPresuRealiMedDifuLvl: values.strCuentPresuRealiMedDifuLvl || "",
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
                            color: errors?.objInfoComunicacion ? "#D33030" : "inherit",
                        }}
                    >
                        Información Mercadeo y Comunicación
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
                    borderColor: errors?.objInfoComunicacion ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoComunicacion.strRealCampaPromoDiv"
                            defaultValue={data.strRealCampaPromoDiv}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="1. Realizo campañas para la promoción y divulgación de la empresa"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        onChange(e);
                                        handlerChangeData(
                                            "strRealCampaPromoDiv",
                                            e.target.value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strRealCampaPromoDiv
                                            ? true
                                            : false
                                    }DiagnosticoTecnico
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strRealCampaPromoDiv?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComunicacion.strRealCampaPromoDivLvl"
                            defaultValue={data.strRealCampaPromoDivLvl}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListasNivel
                                    label="Nivel"
                                    name={name}
                                    value={value}
                                    valueList={
                                        data.strRealCampaPromoDiv
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strRealCampaPromoDivLvl
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strRealCampaPromoDivLvl
                                            ?.message || "Nivel"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoComunicacion.strDefiniArguComerComu"
                            defaultValue={data.strDefiniArguComerComu}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="2. Mi empresa dispone de un catálogo de productos con especificaciones"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strDefiniArguComerComu
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strDefiniArguComerComu?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComunicacion.strDefiniArguComerComuLvl"
                            defaultValue={data.strDefiniArguComerComuLvl}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListasNivel
                                    label="Nivel"
                                    name={name}
                                    value={value}
                                    valueList={
                                        data.strDefiniArguComerComu
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strDefiniArguComerComuLvl
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strDefiniArguComerComuLvl
                                            ?.message || "Nivel"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoComunicacion.strEmpreDisCataProdEspe"
                            defaultValue={data.strEmpreDisCataProdEspe}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="3. Mi empresa dispone de un catálogo de productos con especificaciones"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strEmpreDisCataProdEspe
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strEmpreDisCataProdEspe?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComunicacion.strEmpreDisCataProdEspeLvl"
                            defaultValue={data.strEmpreDisCataProdEspeLvl}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListasNivel
                                    label="Nivel"
                                    name={name}
                                    value={value}
                                    valueList={
                                        data.strEmpreDisCataProdEspe
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strEmpreDisCataProdEspeLvl
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strEmpreDisCataProdEspeLvl
                                            ?.message || "Nivel"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoComunicacion.strDesaEstraProComuMed"
                            defaultValue={data.strDesaEstraProComuMed}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="4. Desarrollo estrategias de promoción, comunicación y/medios de comunicación"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strDesaEstraProComuMed
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strDesaEstraProComuMed?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComunicacion.strDesaEstraProComuMedLvl"
                            defaultValue={data.strDesaEstraProComuMedLvl}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListasNivel
                                    label="Nivel"
                                    name={name}
                                    value={value}
                                    valueList={
                                        data.strDesaEstraProComuMed
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strDesaEstraProComuMedLvl
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strDesaEstraProComuMedLvl
                                            ?.message || "Nivel"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoComunicacion.strReaActiEmpreDeguMues"
                            defaultValue={data.strReaActiEmpreDeguMues}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="5. Realizo activaciones para mi empresa (degustaciones y/o muestras)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strReaActiEmpreDeguMues
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strReaActiEmpreDeguMues?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComunicacion.strReaActiEmpreDeguMuesLvl"
                            defaultValue={data.strReaActiEmpreDeguMuesLvl}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListasNivel
                                    label="Nivel"
                                    name={name}
                                    value={value}
                                    valueList={
                                        data.strReaActiEmpreDeguMues
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strReaActiEmpreDeguMuesLvl
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strReaActiEmpreDeguMuesLvl
                                            ?.message || "Nivel"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Controller
                            name="objInfoComunicacion.strCuentPresuRealiMedDifu"
                            defaultValue={data.strCuentPresuRealiMedDifu}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="6. Cuento con presupuesto para realizar un plan de medios y difusión"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strCuentPresuRealiMedDifu
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strCuentPresuRealiMedDifu?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Controller
                            name="objInfoComunicacion.strCuentPresuRealiMedDifuLvl"
                            defaultValue={data.strCuentPresuRealiMedDifuLvl}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListasNivel
                                    label="Nivel"
                                    name={name}
                                    value={value}
                                    valueList={
                                        data.strCuentPresuRealiMedDifu
                                    }
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComunicacion
                                            ?.strCuentPresuRealiMedDifuLvl
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComunicacion
                                            ?.strCuentPresuRealiMedDifuLvl
                                            ?.message || "Nivel"
                                    }
                                    strGrupo="DiagnosticoTecnico"
                                    strCodigo="EstrCosUniProdDef"
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

export default InfoComunicacion;
