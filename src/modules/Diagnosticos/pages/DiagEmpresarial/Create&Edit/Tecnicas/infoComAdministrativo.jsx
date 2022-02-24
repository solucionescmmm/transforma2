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
        strUniProdGenEmple: "",
        strUniProdGenEmpleDetalle: "",
        strEquipTrabEstruct: "",
        strEquipTrabEstructDetalle: "",
        strEstrucFormaOrganiza: "",
        strEstrucFormaOrganizaDetalle: "",
        strElabPlanTrabActiv: "",
        strElabPlanTrabActivDetalle: "",
        strReaEvalPerioEquipTrab: "",
        strReaEvalPerioEquipTrabDetalle: "",
        strEmprFormaAcuerNormLab: "",
        strEmprFormaAcuerNormLabDetalle: "",
        strEmprFormaReqLey: "",
        strEmprFormaReqLeyDetalle: "",
        strPlaneaEstraEmpPlanPlani: "",
        strPlaneaEstraEmpPlanPlaniDetalle: "",
        strMidConstCumpliMetObj: "",
        strMidConstCumpliMetObjDetalle: "",
        strCueAcompJuri: "",
        strCueAcompJuriDetalle: "",
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
                strUniProdGenEmple: values.strUniProdGenEmple || "",
                strEquipTrabEstruct: values.strEquipTrabEstruct || "",
                strEstrucFormaOrganiza: values.strEstrucFormaOrganiza || "",
                strElabPlanTrabActiv: values.strElabPlanTrabActiv || "",
                strReaEvalPerioEquipTrab: values.strReaEvalPerioEquipTrab || "",
                strEmprFormaAcuerNormLab: values.strEmprFormaAcuerNormLab || "",
                strEmprFormaReqLey: values.strEmprFormaReqLey || "",
                strPlaneaEstraEmpPlanPlani: values.strPlaneaEstraEmpPlanPlani || "",
                strMidConstCumpliMetObj: values.strMidConstCumpliMetObj || "",
                strCueAcompJuri: values.strCueAcompJuri || "",
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
                            color: errors?.objInfoComAdministrativo
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente Administrativo
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
                    borderColor: errors?.objInfoComAdministrativo ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComAdministrativo.strUniProdGenEmple"
                            defaultValue={data.strUniProdGenEmple}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="La unidad productiva genera empleo"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strUniProdGenEmple
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strUniProdGenEmple?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoComAdministrativo.strEquipTrabEstruct"
                            defaultValue={data.strEquipTrabEstruct}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo un equipo de trabajo estructurado"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strEquipTrabEstruct
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strEquipTrabEstruct?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strEstrucFormaOrganiza"
                            defaultValue={data.strEstrucFormaOrganiza}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo una estructura formal en la organización"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strEstrucFormaOrganiza
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strEstrucFormaOrganiza?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strElabPlanTrabActiv"
                            defaultValue={data.strElabPlanTrabActiv}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Elaboro planes de trabajo para organizar las actividades"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strElabPlanTrabActiv
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strElabPlanTrabActiv?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strReaEvalPerioEquipTrab"
                            defaultValue={data.strReaEvalPerioEquipTrab}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Realizo evalución periodica de el equipo de trabajo"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strReaEvalPerioEquipTrab
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strReaEvalPerioEquipTrab?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strEmprFormaAcuerNormLab"
                            defaultValue={data.strEmprFormaAcuerNormLab}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi empresa está formalizada de acuerdo con la normatividad laboral"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strEmprFormaAcuerNormLab
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strEmprFormaAcuerNormLab?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strEmprFormaReqLey"
                            defaultValue={data.strEmprFormaReqLey}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mi empresa está formalizada con los requisitos de ley"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strEmprFormaReqLey
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strEmprFormaReqLey?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strPlaneaEstraEmpPlanPlani"
                            defaultValue={data.strPlaneaEstraEmpPlanPlani}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strPlaneaEstraEmpPlanPlani
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strPlaneaEstraEmpPlanPlani?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strMidConstCumpliMetObj"
                            defaultValue={data.strMidConstCumpliMetObj}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Mido constatemente el cumplimiento de mis metas y objetivos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strMidConstCumpliMetObj
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strMidConstCumpliMetObj?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoProducto"
                                    strCodigo="ProporcionEstetica"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoComAdministrativo.strCueAcompJuri"
                            defaultValue={data.strCueAcompJuri}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Cuento con acompañamiento jurídico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoComAdministrativo
                                            ?.strCueAcompJuri
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoComAdministrativo
                                            ?.strCueAcompJuri?.message ||
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
