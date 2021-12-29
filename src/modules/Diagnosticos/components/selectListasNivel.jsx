import React, { useEffect, useState } from "react";

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
} from "@mui/material";

//Iconos
import { Refresh as RefreshIcon } from "@mui/icons-material";

const SelectListasNivel = ({
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
    valueList,
}) => {
    const { data, refreshGetData } = useGetListas({
        strGrupo,
        strCodigo,
    });

    const [nivel, setNivel] = useState("");

    useEffect(() => {
        if (data?.length > 0) {
            const arrFilter = data.filter((e) => e.strCodigoRetorno === valueList);

            setNivel(arrFilter[0]?.strNivel || "");
        }
    }, [data, valueList]);

    useEffect(() => {
        onChange(nivel);
    }, [nivel, onChange]);

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
                No existen datos de por mostrar del servicio de niveles
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
                Ha ocurrido un error al obtener los datos del listado de niveles
            </Alert>
        );
    }

    return (
        <TextField
            label={label}
            name={name}
            value={value}
            helperText={helperText}
            error={error}
            disabled
            required={required}
            variant="standard"
            fullWidth
        />
    );
};

export default SelectListasNivel;
