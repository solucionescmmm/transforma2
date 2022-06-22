import React, { useState, useEffect, Fragment } from "react";

//Librerias
import shortid from "shortid";

//Componentes de Material UI
import {
    Grid,
    Collapse,
    Box,
    Typography,
    IconButton,
    Tooltip,
    CircularProgress,
    Alert,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import { Controller, useFieldArray } from "react-hook-form";

// Componentes
import ReturnTypeInput from "../../../components/returnTypeInput";

const InfoAtributos = ({ disabled, values, errors, control }) => {
    const { fields, append } = useFieldArray({
        control,
        name: "arrAtributos",
        keyName: "id",
    });

    const [loading, setLoading] = useState(true);

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values?.length > 0) {
            for (let i = 0; i < values.length; i++) {
                append({ ...values[i], id: shortid.generate() });
            }
        }

        setLoading(false);
    }, [values, append]);

    if (loading) {
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

    if (!values) {
        return (
            <Fragment>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                color: errors?.arrAtributos
                                    ? "#D33030"
                                    : "inherit",
                            }}
                        >
                            Información de atributos
                        </Typography>
                    </Box>

                    <Box>
                        <IconButton
                            onClick={() => handlerChangeOpenCollapse()}
                            size="large"
                        >
                            <Tooltip
                                title={
                                    openCollapese
                                        ? "Contraer detalle"
                                        : "Expandir detalle"
                                }
                            >
                                {openCollapese ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Box>

                <hr
                    style={{
                        borderColor: errors?.arrAtributos
                            ? "#D33030"
                            : "inherit",
                    }}
                />

                <Collapse in={openCollapese} timeout="auto">
                    <Alert severity="info">
                        Por favor selecciona el tipo de servicio
                    </Alert>
                </Collapse>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.arrAtributos ? "#D33030" : "inherit",
                        }}
                    >
                        Información de atributos
                    </Typography>
                </Box>

                <Box>
                    <IconButton
                        onClick={() => handlerChangeOpenCollapse()}
                        size="large"
                    >
                        <Tooltip
                            title={
                                openCollapese
                                    ? "Contraer detalle"
                                    : "Expandir detalle"
                            }
                        >
                            {openCollapese ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <hr
                style={{
                    borderColor: errors?.arrAtributos ? "#D33030" : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    {fields.map((e, index) => (
                        <Grid item xs={12} key={e.id}>
                            <Controller
                                name={`arrModulos[${index}].intIdEstado`}
                                render={({
                                    field: { name, onChange, value },
                                }) => (
                                    <ReturnTypeInput
                                        type={e.intIdTipoCampo}
                                        label={e.strNombreAtributo}
                                    />
                                )}
                                control={control}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoAtributos;
