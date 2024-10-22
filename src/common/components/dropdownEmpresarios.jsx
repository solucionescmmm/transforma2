import React, { useState, useEffect } from "react";

//Librerias
//import { matchSorter } from "match-sorter";

//Hooks
// import useGetEmpresarios from "../hooks/useGetEmpresarios";
import useGetEmpresarioEvento from "../hooks/useGetEmpresarioEvento";

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
    createFilterOptions
} from "@mui/material";

//Iconos
import {
    Refresh as RefreshIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from "@mui/icons-material";

//Filtro personalizado
// const filterOptions = (options, { inputValue }) =>
//     matchSorter(options, inputValue, {
//         keys: ["strNombres", "strApellidos", "strNroDocto", "strCorreoElectronico1"],
// });

const filterLimits = createFilterOptions({
    limit: 50
})


const DropdownEmpresarios = ({
    id,
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
    defaultOptions,
    bitActivos
}) => {
    const [options, setOptions] = useState([]);

    const { data, refreshGetData } = useGetEmpresarioEvento({
        autoLoad: defaultOptions ? false : true,
    });

    useEffect(() => {
        if (data?.length > 0 && !defaultOptions) {
            if (bitActivos) {
                setOptions(data?.filter((e) => e.strEstado === "Activo"));
            } else {
                setOptions(data);
            }
        }
    }, [data, defaultOptions, bitActivos]);

    useEffect(() => {
        if (defaultOptions) {
            setOptions(defaultOptions);
        }
    }, [defaultOptions]);

    if (!data && !defaultOptions) {
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

    if (data?.error) {
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
            filterOptions={filterLimits}
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
                        option.strNroDocto === value.strNroDocto ||
                        option.strNombreIdea === value.strNombreIdea
                    );
                }
            }}
            getOptionLabel={(option) =>
                option?.strNombreCompleto +
                `(${option?.strNroDocto} - ${option?.strNombreIdea})` || option
            }
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    if (option.strNombres) {
                        return (
                            <Chip
                                key={index}
                                label={
                                    option.strNombres +
                                    " " +
                                    option.strApellidos
                                }
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
                                src={option.strUrlFileFoto}
                                alt={option.strNombres}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                `${option?.strNombreCompleto} (${option.strNombreIdea})`
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
