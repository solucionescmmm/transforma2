import React, { useState, useEffect } from "react";

//Librerias
import { matchSorter } from "match-sorter";

//Componentes de Material UI
import {
    Autocomplete,
    TextField,
    Chip,
    List,
    ListItem,
    ListItemText,
    Box,
    CircularProgress,
    Checkbox,
} from "@mui/material";

//Iconos
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

//Filtro personalizado
const filterOptions = (options, state) => {
    const { inputValue } = state;

    return matchSorter(options, inputValue, {
        keys: [
            "objPaquete.objInfoPrincipal.strNombre",
            "objPaquete.objInfoPrincipal.intId",
        ],
    });
};

const DropdownPaquetes = ({
    id,
    value,
    name,
    onChange,
    disabled,
    error,
    helperText,
    label,
    multiple,
    data,
    required,
}) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (data?.length > 0) {
            setOptions(data);
        }
    }, [data]);

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
                    const { objPaquete } = option;

                    if (objPaquete) {
                        const { objInfoPrincipal } = objPaquete;

                        return (
                            objInfoPrincipal.strNombre ===
                            value.objPaquete.objInfoPrincipal.strNombre
                        );
                    }
                }
            }}
            getOptionLabel={(option) => {
                const { objPaquete } = option;

                if (objPaquete) {
                    const { objInfoPrincipal } = objPaquete;

                    return objInfoPrincipal.strNombre;
                }

                return option;
            }}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const { objPaquete } = option;

                    if (objPaquete) {
                        const { objInfoPrincipal } = objPaquete;

                        return (
                            <Chip
                                key={index}
                                label={`${objInfoPrincipal.strNombre}`}
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
            renderOption={(props, option, { selected }) => {
                const { objPaquete } = option;

                if (objPaquete) {
                    const { objInfoPrincipal } = objPaquete;

                    return (
                        <List {...props} disablePadding>
                            <ListItem>
                                {multiple && (
                                    <Checkbox
                                        icon={
                                            <CheckBoxOutlineBlankIcon fontSize="small" />
                                        }
                                        checkedIcon={
                                            <CheckBoxIcon fontSize="small" />
                                        }
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                )}
                                <ListItemText
                                    primary={`${objInfoPrincipal.strNombre}`}
                                />
                            </ListItem>
                        </List>
                    );
                }

                return (
                    <List {...props} disablePadding>
                        <ListItem>
                            {multiple && (
                                <Checkbox
                                    icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                    }
                                    checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                    }
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                            )}
                            <ListItemText primary={`${option}`} />
                        </ListItem>
                    </List>
                );
            }}
        />
    );
};

export default DropdownPaquetes;
