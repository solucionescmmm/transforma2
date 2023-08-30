import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";
import validator from "validator";

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
    MenuItem,
} from "@mui/material";

import NumberFormat from "react-number-format";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectTipoDocumento from "../../Empresarios/components/selectTipoDocumento";
import DropdownLocalizaciones from "../../Empresarios/components/dropdownLocalizaciones";

const InfoPrincipal = ({ disabled, values, errors, control, isEdit }) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strNombres: "",
        strApellidos: "",
        strTipoDocto: "",
        strNroDocto: "",
        strCelular1: "",
        strCorreoElectronico1: "",
        strEstrato: "",
        arrDepartamento: [],
        arrCiudad: [],
    });

    const [openCollapese, setOpenCollapse] = useState(true);

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
        if (isEdit) {
            setOpenCollapse(true);
        }
    }, [isEdit]);

    useEffect(() => {
        if (values) {
            setData({
                intId: values.intId || null,
                strNombres: values.strNombres || "",
                strApellidos: values.strApellidos || "",
                strTipoDocto: values.strTipoDocto || "",
                strNroDocto: values.strNroDocto || "",
                strCelular1: values.strCelular1 || "",
                strCorreoElectronico1: values.strCorreoElectronico1 || "",
                strEstrato: values.strEstrato || "",
                arrDepartamento: values.arrDepartamento || [],
                arrCiudad: values.arrCiudad || [],
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
                            color: errors?.objInfoEmpresarioPr
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información de la persona externa
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
                    borderColor: errors?.objInfoEmpresarioPr
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strNombres}
                            name="objInfoEmpresarioPr.strNombres"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Nombres"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strNombres
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strNombres
                                            ?.message ||
                                        "Digíta el nombre o nombres de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta el nombre o nombres de la persona",

                                validate: (value) => {
                                    if (
                                        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                                            value
                                        )
                                    ) {
                                        return "El nombre no debe contener números ni caracteres especiales";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strApellidos}
                            name="objInfoEmpresarioPr.strApellidos"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Apellidos"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strApellidos
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strApellidos?.message ||
                                        "Digíta los apellidos de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digíta los apellidos de la persona",
                                validate: (value) => {
                                    if (
                                        !/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                                            value
                                        )
                                    ) {
                                        return "Los apellidos no deben contener números ni caracteres especiales";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strTipoDocto}
                            name="objInfoEmpresarioPr.strTipoDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <SelectTipoDocumento
                                    label="Tipo de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strTipoDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strTipoDocto?.message ||
                                        "Selecciona el tipo de documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el tipo de documento",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strNroDocto}
                            name="objInfoEmpresarioPr.strNroDocto"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Número de documento"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    required
                                    disabled={disabled}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strNroDocto
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strNroDocto
                                            ?.message ||
                                        "Digita el número de documento"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número de documento",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Controller
                            defaultValue={data.strEstrato}
                            name="objInfoEmpresarioPr.strEstrato"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Estrato socioeconómico"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    select
                                    required
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    error={
                                        errors?.objInfoEmpresarioPr?.strEstrato
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strEstrato
                                            ?.message ||
                                        "Selecciona el estrato socioeconómico de la persona"
                                    }
                                >
                                    {(() => {
                                        let arrItem = [
                                            { value: 1 },
                                            { value: 2 },
                                            { value: 3 },
                                            { value: 4 },
                                            { value: 5 },
                                            { value: 6 },
                                            { value: "Rural" },
                                        ];

                                        return arrItem.map((e, i) => (
                                            <MenuItem key={i} value={e.value}>
                                                {e.value}
                                            </MenuItem>
                                        ));
                                    })()}
                                </TextField>
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, selecciona el estrato socioeconómico de la persona",
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCelular1}
                            name="objInfoEmpresarioPr.strCelular1"
                            render={({ field: { name, value, onChange } }) => (
                                <NumberFormat
                                    format="### ### ####"
                                    value={value}
                                    customInput={TextField}
                                    name={name}
                                    onChange={(e) => onChange(e)}
                                    label="Celular"
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    required
                                    error={
                                        errors?.objInfoEmpresarioPr?.strCelular1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.strCelular1
                                            ?.message ||
                                        "Digita el número celular de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                required:
                                    "Por favor, digita el número celular de la persona",
                                validate: (value) => {
                                    let strValue = value.replace(/\s/g, "");

                                    if (
                                        !validator.isMobilePhone(
                                            strValue,
                                            "es-CO"
                                        )
                                    ) {
                                        return "El número ingresado no corresponde a un operador válido en Colombia";
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.strCorreoElectronico1}
                            name="objInfoEmpresarioPr.strCorreoElectronico1"
                            render={({ field: { name, value, onChange } }) => (
                                <TextField
                                    label="Correo electrónico"
                                    name={name}
                                    value={value}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    variant="standard"
                                    disabled={disabled}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCorreoElectronico1
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.strCorreoElectronico1?.message ||
                                        "Digita el correo electrónico de la persona"
                                    }
                                />
                            )}
                            control={control}
                            rules={{
                                validate: (value) => {
                                    if (value) {
                                        if (!validator.isEmail(value)) {
                                            return "El valor ingresado no corresponde a un correo electrónico válido";
                                        }
                                    }
                                },
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrDepartamento}
                            name="objInfoEmpresarioPr.arrDepartamento"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Departamento"
                                    strCodigo="departamentos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData(
                                            "arrDepartamento",
                                            value
                                        );
                                    }}
                                    error={
                                        errors?.objInfoEmpresarioPr
                                            ?.arrDepartamento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr
                                            ?.arrDepartamento?.message ||
                                        "Selecciona el departamento de residencia"
                                    }
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            defaultValue={data.arrCiudad}
                            name="objInfoEmpresarioPr.arrCiudad"
                            render={({ field: { name, value, onChange } }) => (
                                <DropdownLocalizaciones
                                    label="Ciudad"
                                    strCodigo="municipios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => {
                                        onChange(value);
                                        handlerChangeData("arrCiudad", value);
                                    }}
                                    error={
                                        errors?.objInfoEmpresarioPr?.arrCiudad
                                            ? true
                                            : false
                                    }
                                    strDepartamento={
                                        data.arrDepartamento?.region_name
                                    }
                                    helperText={
                                        errors?.objInfoEmpresarioPr?.arrCiudad
                                            ?.message ||
                                        "Selecciona la ciudad de residencia"
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

export default InfoPrincipal;
