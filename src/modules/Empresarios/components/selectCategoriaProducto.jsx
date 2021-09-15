import React from "react";

//Hooks
import useGetListas from "../hooks/useGetListas";

//Componentes de Material UI
import {
    TextField,
    MenuItem,
    Box,
    CircularProgress,
    Alert,
    AlertTitle,
    IconButton,
    Tooltip,
} from "@mui/material";

//Iconos
import { Refresh as RefreshIcon } from "@mui/icons-material";

const SelectCategoriaProducto = ({
    label,
    name,
    value,
    onChange,
    error,
    helperText,
    disabled,
    required,
}) => {
    const { data, refreshGetData } = useGetListas({
        strGrupo: "Empresa",
        strCodigo: "CategoriaProducto",
    });

    if (data === undefined) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
                                strGrupo: "Empresa",
                                strCodigo: "CategoriaProducto",
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
                    <b>Sin datos</b>
                </AlertTitle>
                No existen datos de categorias de productos.
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
                                strGrupo: "Empresa",
                                strCodigo: "CategoriaProducto",
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
                Ha ocurrido un error al obtener los datos de categorias de productos.
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
                <MenuItem value={e.strCodigoRetorno} key={i}>
                    {e.strCodigoRetorno}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default SelectCategoriaProducto;
