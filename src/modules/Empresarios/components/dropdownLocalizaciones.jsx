import React from "react";

//Hooks
import useGetLocalizaciones from "../hooks/useGetLocalizaciones";

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
    Alert,
    AlertTitle,
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

const DropdownLocalizaciones = ({
    id,
    value,
    name,
    onChange,
    disabled,
    error,
    helperText,
    label,
    multiple,
    strCodigo,
    strDepartamento,
    strCiudad,
    required,
}) => {
    const { data, refreshGetData } = useGetLocalizaciones({
        strCodigo,
        strDepartamento,
        strCiudad,
    });

    if (!data) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
                            refreshGetData({
                                strGrupo: "Empresa",
                                strCodigo: "EnteroCorporacion",
                            });
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
                Ha ocurrido un error al obtener los datos del listado de localización.
            </Alert>
        );
    }

    return (
        <Autocomplete
            id={id}
            value={value}
            onChange={onChange}
            options={data}
            clearText="Borrar"
            openText="Abrir"
            closeText="Cerrar"
            noOptionsText="Valor no encontrado."
            disabled={disabled}
            fullWidth
            multiple={multiple}
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
                    if (option.region_name) {
                        return option.region_name === value.region_name;
                    }

                    if (option.city_name) {
                        return option.city_name === value.city_name;
                    }
                }
            }}
            getOptionLabel={(option) => option?.region_name || option?.city_name || option}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.region_name) {
                        return (
                            <Chip
                                key={index}
                                label={option.region_name}
                                {...getTagProps({ index })}
                            />
                        );
                    }

                    if (option.city_name) {
                        return (
                            <Chip
                                key={index}
                                label={option.city_name}
                                {...getTagProps({ index })}
                            />
                        );
                    }

                    return (
                        <Chip key={index} label={option} {...getTagProps({ index })} />
                    );
                })
            }
            renderOption={(props, option, { selected }) => (
                <List {...props} disablePadding>
                    <ListItem>
                        {multiple && (
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                            />
                        )}
                        <ListItemText primary={option.region_name || option.city_name} />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropdownLocalizaciones;
