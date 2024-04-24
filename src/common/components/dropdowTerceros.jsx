import React, { useState, useEffect, Fragment } from "react";

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
    Dialog,
} from "@mui/material";

//Iconos
import {
    Refresh as RefreshIcon,
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import useGetTerceros from "../../modules/Terceros/hook/useGetTerceros";
import SearchEmpresario from "../../modules/Terceros/Create&Edit";

import { styled } from "@mui/material/styles";

const StyleDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiContainer-root": {
        padding: 0,
    },
}));

//Filtro personalizado
const filterOptions = (options, { inputValue }) =>
    matchSorter(options, inputValue, {
        keys: [
            "strNombres",
            "strApellidos",
            "strCorreoElectronico",
            "strNroDocto",
        ],
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
    bitActivos,
}) => {
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [strDocRegis, setStrDocRegis] = useState("");

    const handleClose = () => {
        setOpen(!open);
    };

    const { data, refreshGetData } = useGetTerceros({
        btActivo: true,
    });

    useEffect(() => {
        if (data?.length > 0) {
            if (bitActivos) {
                setOptions(data?.filter((e)=>e.strEstado === "Activo"));
            }else{
                setOptions(data);
            }
        }
    }, [data,bitActivos]);

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
        <Fragment>
            <Autocomplete
                id={id}
                value={value}
                onChange={(event, newValue) => {
                    if (
                        newValue.find(
                            (x) => x.register || typeof x === "string"
                        )
                    ) {
                        setTimeout(() => {
                            setStrDocRegis(
                                newValue.find(
                                    (x) => x.register || typeof x === "string"
                                ).inputValue ||
                                    newValue.find(
                                        (x) =>
                                            x.register || typeof x === "string"
                                    )
                            );
                            handleClose();
                        });
                    } else {
                        onChange(event, newValue);
                    }
                }}
                options={options}
                clearText="Borrar"
                openText="Abrir"
                closeText="Cerrar"
                noOptionsText="Valor no encontrado."
                disabled={disabled}
                fullWidth
                multiple={multiple}
                freeSolo
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                filterOptions={(options, params) => {
                    const filtered = filterOptions(options, params);

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            register: true,
                            title: `Registrar a: "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
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
                renderOption={(props, option, { selected }) => {
                    if (option.register) {
                        return (
                            <List {...props}>
                                <ListItemText primary={option.title} />
                            </List>
                        );
                    } else {
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
                                    <ListItemAvatar>
                                        <Avatar
                                            src={option.strURLFileFoto}
                                            alt={option.strNombres}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            option.strNombres +
                                                " " +
                                                option.strApellidos ||
                                            option.strEmail
                                        }
                                        secondary={`Email: ${option.strCorreoElectronico}`}
                                    />
                                </ListItem>
                            </List>
                        );
                    }
                }}
            />
            <StyleDialog open={open} onClose={handleClose} maxWidth="md">
                <SearchEmpresario strDoc={strDocRegis} inModal closeModal={handleClose} resetModal={refreshGetData} />
            </StyleDialog>
        </Fragment>
    );
};

export default DropdownTerceros;
