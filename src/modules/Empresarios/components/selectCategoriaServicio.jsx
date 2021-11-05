import React from "react";

//Hooks
import useGetListas from "../hooks/useGetListas";

//Componentes de Material UI
import {
    MenuItem,
    TextField,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    Tooltip,
    IconButton,
} from "@mui/material";

//Iconos
import { Refresh as RefreshIcon } from "@mui/icons-material";

const SelectCategoriaServicio = ({
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
        strCodigo: "CategoriaServicio",
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
                                strCodigo: "CategoriaServicio",
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
                Ha ocurrido un error al obtener los datos de las categorías de servicios.
            </Alert>
        );
    }

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            helperText={helperText}
            error={error}
            disabled={disabled}
            required={required}
            variant="standard"
            fullWidth
            select
        >
            {data.map((e, i) => (
                <MenuItem
                    value={e.strCodigoRetorno === "Ninguna" ? "" : e.strCodigoRetorno}
                    key={i}
                >
                    {e.strCodigoRetorno}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default SelectCategoriaServicio;
