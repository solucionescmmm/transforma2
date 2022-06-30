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

import { Controller } from "react-hook-form";

// Componentes
import ReturnTypeInput from "../../../components/returnTypeInput";

const InfoAtributos = ({
    disabled,
    values,
    errors,
    control,
    append,
    fields,
}) => {
    const [loading, setLoading] = useState(true);

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        setLoading(true);

        if (values?.length > 0 && fields.length === 0) {

            for (let i = 0; i < values.length; i++) {
                append({ ...values[i], id: shortid.generate() });
            }
        }

        setLoading(false);

        // eslint-disable-next-line
    }, [values, fields]);

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
                                name={`arrAtributos[${index}].${e.strNombreAtributo}`}
                                render={({
                                    field: { name, onChange, value },
                                }) => (
                                    <ReturnTypeInput
                                        name={name}
                                        required
                                        onChange={(e) => onChange(e)}
                                        value={value}
                                        type={e.intIdTipoCampo}
                                        helperText={
                                            errors?.arrAtributos?.[index]?.[
                                                e.strNombreAtributo
                                            ]?.message ||
                                            "Digita o selecciona una opción"
                                        }
                                        error={
                                            !!errors?.arrAtributos?.[index]?.[
                                                e.strNombreAtributo
                                            ]
                                        }
                                        label={e.strNombreAtributo}
                                        disabled={disabled}
                                    />
                                )}
                                control={control}
                                rules={{
                                    required:
                                        "Por favor, digita o selecciona una opción",
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoAtributos;
