import React from "react";

//Hooks
import useGetRutas from "../hooks/useGetRutas";

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

const DropwdownRutas = ({
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
    intIdIdea,
}) => {
    const { data, refreshGetData } = useGetRutas({ intIdIdea });

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
                            refreshGetData({ intIdIdea });
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
                Ha ocurrido un error al obtener los datos de rutas
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
            noOptionsText="Ruta no encontrada."
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
                    return option.objInfoPrincipal.strNombre === value.objInfoPrincipal.strNombre;
                }
            }}
            getOptionLabel={(option) => option.objInfoPrincipal.strNombre || option}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.objInfoPrincipal.strNombre) {
                        return (
                            <Chip
                                key={index}
                                label={option.objInfoPrincipal.strNombre}
                                {...getTagProps({ index })}
                            />
                        );
                    } else {
                        return (
                            <Chip
                                key={index}
                                label={option}
                                {...getTagProps({ index })}
                            />
                        );
                    }
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
                        <ListItemText primary={option.objInfoPrincipal.strNombre} />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropwdownRutas;
