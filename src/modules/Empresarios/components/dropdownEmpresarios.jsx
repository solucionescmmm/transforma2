import React, { useState, useEffect } from "react";

//Librerias
import { matchSorter } from "match-sorter";

//Hooks
import useGetEmpresarios from "../hooks/useGetEmpresarios";

//Componentes de Material UI
import {
    Autocomplete,
    TextField,
    Chip,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    Avatar,
    Tooltip,
    IconButton,
    Checkbox,
} from "@mui/material";

//Iconos
import {
    Refresh as RefreshIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

//Filtro personalizado
const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
        keys: [
            "strNombreCompleto",
            "strApellidos",
            "strNombres",
            "strNroDocto",
        ],
    });

const DropdownEmpresarios = ({
    id,
    intIdIdea,
    value,
    name,
    onChange,
    disabled,
    error,
    principal,
    helperText,
    label,
    multiple,
    required,
}) => {
    const [options, setOptions] = useState([]);

    const { data, refreshGetData } = useGetEmpresarios({ intId: intIdIdea });

    useEffect(() => {
        if (data?.length > 0) {
            let newArrOptions = [];

            data.forEach((e) => {
                let { objEmpresario } = e;

                if (!principal) {
                    objEmpresario.forEach((emp) => {
                        newArrOptions.push({
                            intId: emp.intId,
                            strNombreCompleto:emp.strNombres + " " + emp.strApellidos,
                            strURLFileFoto: emp.strURLFileFoto,
                            strNombres: emp.strNombres,
                            strApellidos: emp.strApellidos,
                            strNroDocto: emp.strNroDocto,
                            strCorreoElectronico: emp.strCorreoElectronico1,
                            strTipoEmpresario: emp.strTipoEmpresario
                        });
                    });
                } else {
                    objEmpresario.forEach((emp) => {
                        if (emp.strTipoEmpresario === "Principal") {
                            newArrOptions.push({
                                intId: emp.intId,
                                strNombreCompleto: emp.strNombres + " " + emp.strApellidos,
                                strURLFileFoto: emp.strURLFileFoto,
                                strNombres: emp.strNombres,
                                strApellidos: emp.strApellidos,
                                strNroDocto: emp.strNroDocto,
                                strCorreoElectronico: emp.strCorreoElectronico1,
                                strTipoEmpresario: emp.strTipoEmpresario
                            });
                        }
                    });
                }
            });

            setOptions(newArrOptions);
        }
    }, [data, principal]);

    if (!data) {
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

    if (data.error) {
        return (
            <Alert
                severity="error"
                action={
                    <IconButton
                        onClick={() => {
                            refreshGetData();
                        }}
                        size="large"
                    >
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>{data.msg}</b>
                </AlertTitle>
                Ha ocurrido un error al obtener los datos del listado de
                personas empresarias
            </Alert>
        );
    }

    return (
        <Autocomplete
            id={id}
            value={value}
            onChange={onChange}
            options={options}
            clearText="Borrar"
            openText="Abrir"
            closeText="Cerrar"
            noOptionsText="Valor no encontrado."
            disabled={disabled}
            fullWidth
            multiple={multiple}
            filterOptions={filterOptions}
            disableCloseOnSelect={multiple ? true : false}
            renderInput={(props) => (
                <TextField
                    label={label}
                    name={name}
                    error={error}
                    required={required}
                    helperText={helperText}
                    variant="standard"
                    {...props}
                />
            )}
            isOptionEqualToValue={(option, value) => {
                if (typeof value === "string") {
                    return option === value;
                } else {
                    return (
                        option === value ||
                        option.strNombreCompleto === value.strNombreCompleto ||
                        option.strNombres === value.strNombres ||
                        option.strApellidos === value.strApellidos ||
                        option.strNroDocto === value.strNroDocto
                    );
                }
            }}
            getOptionLabel={(option) =>
                option?.strNombreCompleto || option?.strNombres || option
            }
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.strNombreCompleto) {
                        return (
                            <Chip
                                key={index}
                                label={option.strNombreCompleto}
                                {...getTagProps({ index })}
                            />
                        );
                    }

                    if (option.strNroDocto) {
                        return (
                            <Chip
                                key={index}
                                label={option.strNroDocto}
                                {...getTagProps({ index })}
                            />
                        );
                    }

                    return (
                        <Chip
                            key={index}
                            label={option}
                            {...getTagProps({ index })}
                        />
                    );
                })
            }
            renderOption={(props, option, { selected }) => (
                <List {...props} disablePadding>
                    <ListItem>
                        {multiple && (
                            <Checkbox
                                icon={
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                }
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                        )}
                        <ListItemAvatar>
                            <Avatar
                                src={option.strURLFileFoto}
                                alt={option.strNombres}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                option.strNombreCompleto || option.strNroDocto
                            }
                            secondary={
                                <div>
                                    <p>{`Doc: ${option?.strNroDocto}`}</p>
                                    <p>{`Tipo de persona empresaria: ${option?.strTipoEmpresario}`}</p>
                                </div>
                            }
                        />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropdownEmpresarios;
