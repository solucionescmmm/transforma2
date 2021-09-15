import React from "react";

//Hooks
import useGetListas from "../hooks/useGetListas";

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

const DropwdownMediosComunicacion = ({
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
    const { data, refreshGetData } = useGetListas({
        strGrupo: "Empresa",
        strCodigo: "MediosComunicacion",
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
                                strCodigo: "MediosComunicacion",
                            });
                        }}
                        size="large">
                        <Tooltip title="Refrescar">
                            <RefreshIcon />
                        </Tooltip>
                    </IconButton>
                }
            >
                <AlertTitle>
                    <b>{data.msg}</b>
                </AlertTitle>
                Ha ocurrido un error al obtener los datos de los medios de comunicación.
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
            noOptionsText="Medio de comunicación no encontrado."
            disabled={disabled}
            fullWidth
            multiple={multiple}
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
                    return option.strCodigoRetorno === value.strCodigoRetorno;
                }
            }}
            getOptionLabel={(option) => option.strCodigoRetorno || option}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.strCodigoRetorno) {
                        return (
                            <Chip
                                key={index}
                                label={option.strCodigoRetorno}
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
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        <ListItemText primary={option.strCodigoRetorno} />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropwdownMediosComunicacion;
