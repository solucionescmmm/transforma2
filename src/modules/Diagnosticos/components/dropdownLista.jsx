import React from "react";

//Hooks
import useGetListas from "../hooks/useGetListas";

//Componentes de Material UI
import {
    TextField,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    IconButton,
    Tooltip,
    List,
    ListItem,
    Checkbox,
    Chip,
    Autocomplete,
    ListItemText,
} from "@mui/material";

//Iconos
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { matchSorter } from "match-sorter";

//Iconos
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

//Filtro personalizado
const filterOptions = (options, state) => {
    const { inputValue } = state;

    return matchSorter(options, inputValue, {
        keys: ["strCodigoRetorno"],
    });
};

const DropdownLista = ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
    strGrupo,
    strCodigo,
    multiple,
}) => {
    const { data, refreshGetData } = useGetListas({
        strGrupo,
        strCodigo,
    });

    if (data === undefined) {
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

    if (data === null) {
        return (
            <Alert
                severity="info"
                action={
                    <IconButton
                        onClick={() => {
                            refreshGetData({
                                strGrupo,
                                strCodigo,
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
                    <b>Sin datos</b>
                </AlertTitle>
                No existen datos de por mostrar del servicio de listas
            </Alert>
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
                                strGrupo,
                                strCodigo,
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
                Ha ocurrido un error al obtener los datos del listado de listas
            </Alert>
        );
    }

    return (
        <Autocomplete
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
                        option?.strCodigoRetorno ===
                        value?.strCodigoRetorno
                    );
                }
            }}
            getOptionLabel={(option) =>
                `${option.strCodigoRetorno}` ||
                option
            }
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
                            primary={`${option.strCodigoRetorno}`}
                        />
                    </ListItem>
                </List>
            )}
        />
    );
};

export default DropdownLista;
