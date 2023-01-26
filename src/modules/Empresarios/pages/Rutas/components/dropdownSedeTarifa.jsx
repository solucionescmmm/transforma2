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
        keys: ["intId", "intIdSede", "intIdTipoTarifa", "strSede", "strTarifa"],
    });
};

const DropdownSedeTarifa = ({
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
                    return (
                        option.strSede === value.strSede &&
                        option.strTarifa === value.strTarifa
                    );
                }
            }}
            getOptionLabel={(option) =>
                `${option.strSede} - ${option.strTarifa}` || option
            }
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.strSede) {
                        return (
                            <Chip
                                key={index}
                                label={`${option.strSede} - ${option.strTarifa}`}
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
                        <ListItemText
                            primary={`${option.strSede} - ${option.strTarifa}`}
                            secondary={`Valor: ${new Intl.NumberFormat(
                                "es-ES",
                                {
                                    style: "currency",
                                    currency: "COP",
                                }
                            )
                                .format(option.Valor)
                                .toString()}`}
                        />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropdownSedeTarifa;
