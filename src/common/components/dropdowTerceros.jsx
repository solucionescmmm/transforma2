import React, { useState, useEffect } from "react";

//Librerias
import { matchSorter } from "match-sorter";

//Hooks

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
import useGetTerceros from "../../modules/Terceros/hook/useGetTerceros";

//Filtro personalizado
const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
        keys: ["strNombres", "strCorreoElectronico"],
    });

const DropdownTerceros = ({
    id,
    value,
    name,
    onChange,
    disabled,
    error,
    helperText,
    label,
    multiple,
    required,
}) => {
    const [options, setOptions] = useState([]);

    const { data, refreshGetData } = useGetTerceros();

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
                personas terceras
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
                        option.strCorreoElectronico ===
                            value.strCorreoElectronico ||
                        option.strNombres === value.strNombres
                    );
                }
            }}
            getOptionLabel={(option) =>
                option?.strNombres + " " + option.strApellidos ||
                option?.strCorreoElectronico ||
                option
            }
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.strNombres) {
                        return (
                            <Chip
                                key={index}
                                label={
                                    option?.strNombres +
                                    " " +
                                    option?.strApellidos
                                }
                                {...getTagProps({ index })}
                            />
                        );
                    }

                    if (option.strCorreoElectronico) {
                        return (
                            <Chip
                                key={index}
                                label={option.strCorreoElectronico}
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
                                option.strNombres + " " + option.strApellidos ||
                                option.strEmail
                            }
                            secondary={`Email: ${option.strCorreoElectronico}`}
                        />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropdownTerceros;
