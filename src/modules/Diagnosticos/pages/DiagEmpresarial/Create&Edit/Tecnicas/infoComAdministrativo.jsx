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

export const propiedades = [
    {
        name: "strUniProdGenEmple",
        label: "La unidad productiva genera empleo",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "UniProdGenEmple",
    },
    {
        name: "strUniProdGenEmpleDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "UniProdGenEmple",
    },
    {
        name: "strUniProdGenEmpleNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "UniProdGenEmple",
    },
    {
        name: "strEquipTrabEstruct",
        label: "Tengo un equipo de trabajo estructurado",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EquipTrabEstruct",
    },
    {
        name: "strEquipTrabEstructDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EquipTrabEstruct",
    },
    {
        name: "strEquipTrabEstructNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EquipTrabEstruct",
    },
    {
        name: "strEstrucFormaOrganiza",
        label: "Tengo una estructura formal en la organización",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EstrucFormaOrganiza",
    },
    {
        name: "strEstrucFormaOrganizaDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EstrucFormaOrganiza",
    },
    {
        name: "strEstrucFormaOrganizaNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EstrucFormaOrganiza",
    },
    {
        name: "strElabPlanTrabActiv",
        label: "Elaboro planes de trabajo para organizar las actividades",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ElabPlanTrabActiv",
    },
    {
        name: "strElabPlanTrabActivDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ElabPlanTrabActiv",
    },
    {
        name: "strElabPlanTrabActivNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ElabPlanTrabActiv",
    },
    {
        name: "strReaEvalPerioEquipTrab",
        label: "Realizo evalución periodica de el equipo de trabajo",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ReaEvalPerioEquipTrab",
    },
    {
        name: "strReaEvalPerioEquipTrabDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ReaEvalPerioEquipTrab",
    },
    {
        name: "strReaEvalPerioEquipTrabNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "ReaEvalPerioEquipTrab",
    },
    {
        name: "strEmprFormaAcuerNormLab",
        label: "La empresa está formalizada de acuerdo con la normatividad laboral",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EmprFormaAcuerNormLab",
    },
    {
        name: "strEmprFormaAcuerNormLabDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EmprFormaAcuerNormLab",
    },
    {
        name: "strEmprFormaAcuerNormLabNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EmprFormaAcuerNormLab",
    },
    {
        name: "strEmprFormaReqLey",
        label: "Mi empresa está formalizada con los requisitos de ley",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EmprFormaReqLey",
    },
    {
        name: "strEmprFormaReqLeyDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EmprFormaReqLey",
    },
    {
        name: "strEmprFormaReqLeyNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "EmprFormaReqLey",
    },
    {
        name: "strPlaneaEstraEmpPlanPlani",
        label: "Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "PlaneaEstraEmpPlanPlani",
    },
    {
        name: "strPlaneaEstraEmpPlanPlaniDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "PlaneaEstraEmpPlanPlani",
    },
    {
        name: "strPlaneaEstraEmpPlanPlaniNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "PlaneaEstraEmpPlanPlani",
    },
    {
        name: "strMidConstCumpliMetObj",
        label: "Mido constatemente el cumplimiento de mis metas y objetivos",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "MidConstCumpliMetObj",
    },
    {
        name: "strMidConstCumpliMetObjDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "MidConstCumpliMetObj",
    },
    {
        name: "strMidConstCumpliMetObjNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "MidConstCumpliMetObj",
    },
    {
        name: "strCueAcompJuri",
        label: "Cuento con acompañamiento jurídico",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CueAcompJuri",
    },
    {
        name: "strCueAcompJuriDetalle",
        label: "Detalle",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CueAcompJuri",
    },
    {
        name: "strCueAcompJuriNivel",
        label: "Nivel",
        strGrupo: "DiagnosticoTecnico",
        strCodigo: "CueAcompJuri",
    },
];

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
        strUniProdGenEmpleNivel: "",
        strEquipTrabEstruct: "",
        strEquipTrabEstructDetalle: "",
        strEquipTrabEstructNivel: "",
        strEstrucFormaOrganiza: "",
        strEstrucFormaOrganizaDetalle: "",
        strEstrucFormaOrganizaNivel: "",
        strElabPlanTrabActiv: "",
        strElabPlanTrabActivDetalle: "",
        strElabPlanTrabActivNivel: "",
        strReaEvalPerioEquipTrab: "",
        strReaEvalPerioEquipTrabDetalle: "",
        strReaEvalPerioEquipTrabNivel: "",
        strEmprFormaAcuerNormLab: "",
        strEmprFormaAcuerNormLabDetalle: "",
        strEmprFormaAcuerNormLabNivel: "",
        strEmprFormaReqLey: "",
        strEmprFormaReqLeyDetalle: "",
        strEmprFormaReqLeyNivel: "",
        strPlaneaEstraEmpPlanPlani: "",
        strPlaneaEstraEmpPlanPlaniDetalle: "",
        strPlaneaEstraEmpPlanPlaniNivel: "",
        strMidConstCumpliMetObj: "",
        strMidConstCumpliMetObjDetalle: "",
        strMidConstCumpliMetObjNivel: "",
        strCueAcompJuri: "",
        strCueAcompJuriDetalle: "",
        strCueAcompJuriNivel: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strUniProdGenEmple: values.strUniProdGenEmple || "",
                strUniProdGenEmpleDetalle:
                    values.strUniProdGenEmpleDetalle || "",
                strUniProdGenEmpleNivel: values.strUniProdGenEmpleNivel || "",

                strEquipTrabEstruct: values.strEquipTrabEstruct || "",
                strEquipTrabEstructDetalle:
                    values.strEquipTrabEstructDetalle || "",
                strEquipTrabEstructNivel: values.strEquipTrabEstructNivel || "",

                strEstrucFormaOrganiza: values.strEstrucFormaOrganiza || "",
                strEstrucFormaOrganizaDetalle:
                    values.strEstrucFormaOrganizaDetalle || "",
                strEstrucFormaOrganizaNivel:
                    values.strEstrucFormaOrganizaNivel || "",

                strElabPlanTrabActiv: values.strElabPlanTrabActiv || "",
                strElabPlanTrabActivDetalle:
                    values.strElabPlanTrabActivDetalle || "",
                strElabPlanTrabActivNivel:
                    values.strElabPlanTrabActivNivel || "",

                strReaEvalPerioEquipTrab: values.strReaEvalPerioEquipTrab || "",
                strReaEvalPerioEquipTrabDetalle:
                    values.strReaEvalPerioEquipTrabDetalle || "",
                strReaEvalPerioEquipTrabNivel:
                    values.strReaEvalPerioEquipTrabNivel || "",

                strEmprFormaAcuerNormLab: values.strEmprFormaAcuerNormLab || "",
                strEmprFormaAcuerNormLabDetalle:
                    values.strEmprFormaAcuerNormLabDetalle || "",
                strEmprFormaAcuerNormLabNivel:
                    values.strEmprFormaAcuerNormLabNivel || "",

                strEmprFormaReqLey: values.strEmprFormaReqLey || "",
                strEmprFormaReqLeyDetalle:
                    values.strEmprFormaReqLeyDetalle || "",
                strEmprFormaReqLeyNivel: values.strEmprFormaReqLeyNivel || "",

                strPlaneaEstraEmpPlanPlani:
                    values.strPlaneaEstraEmpPlanPlani || "",
                strPlaneaEstraEmpPlanPlaniDetalle:
                    values.strPlaneaEstraEmpPlanPlaniDetalle || "",
                strPlaneaEstraEmpPlanPlaniNivel:
                    values.strPlaneaEstraEmpPlanPlaniNivel || "",

                strMidConstCumpliMetObj: values.strMidConstCumpliMetObj || "",
                strMidConstCumpliMetObjDetalle:
                    values.strMidConstCumpliMetObjDetalle || "",
                strMidConstCumpliMetObjNivel:
                    values.strMidConstCumpliMetObjNivel || "",

                strCueAcompJuri: values.strCueAcompJuri || "",
                strCueAcompJuriDetalle: values.strCueAcompJuriDetalle || "",
                strCueAcompJuriNivel: values.strCueAcompJuriNivel || "",
            });
        }

        setLoading(false);
    }, [values]);

    const getNameWithoutNivel = (name) => {
        const propertyName = name.replace(/^objInfoComAdministrativo\./, '');
        if (propertyName.endsWith("Nivel")) {
            return propertyName.slice(0, -5);
        }
        return propertyName;
    };

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
                key={name}
            >
                <Controller
                    name={`objInfoComAdministrativo.${name}`}
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
                                    errors?.objInfoComAdministrativo?.[name]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComAdministrativo?.[name]
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
                                valueList={data[getNameWithoutNivel(name)]}
                                onChange={(e) => onChange(e)}
                                error={
                                    errors?.objInfoComAdministrativo?.[name]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComAdministrativo?.[name]
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
                                    handlerChangeData(getNameWithoutNivel(name), e.target.value);
                                }}
                                error={
                                    errors?.objInfoComAdministrativo?.[name]
                                        ? true
                                        : false
                                }
                                helperText={
                                    errors?.objInfoComAdministrativo?.[name]
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
                            color: errors?.objInfoComAdministrativo
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente administrativo
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
                    borderColor: errors?.objInfoComAdministrativo
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
