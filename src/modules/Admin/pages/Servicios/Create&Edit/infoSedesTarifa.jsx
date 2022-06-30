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
    Button,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { CSSTransition, TransitionGroup } from "react-transition-group";

//Componentes
import PaperSedesTarifa from "./paperSedesTarifa";

const InfoSedesTarifa = ({
    disabled,
    values,
    errors,
    control,
    fields,
    append,
    remove,
}) => {
    const [loading, setLoading] = useState(true);

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        setLoading(true);

        if (fields.length === 0) {
            append({
                id: shortid.generate(),
                intIdSede: "",
                intIdTipoTarifa: "",
                dblValor: "",
            });
        }

        setLoading(false);

        // eslint-disable-next-line
    }, [fields]);

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

    return (
        <Fragment>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography
                        style={{
                            fontWeight: "bold",
                            color: errors?.arrSedesTarifas
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Información sedes y tarifas del servicio
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
                    borderColor: errors?.arrSedesTarifas
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <TransitionGroup>
                            {fields.map((e, i) => (
                                <CSSTransition
                                    timeout={800}
                                    classNames={{
                                        enter: "animate__animated",
                                        enterActive:
                                            "animate__animated animate__bounceInLeft",
                                        enterDone: "animate__bounceInLeft",
                                        exit: "animate__animated",
                                        exitActive:
                                            "animate__animated animate__bounceOutRight",
                                        exitDone: "animate__bounceOutRight",
                                    }}
                                    key={e.id}
                                >
                                    <PaperSedesTarifa
                                        control={control}
                                        index={i}
                                        values={e}
                                        errors={errors}
                                        disabled={disabled}
                                        remove={remove}
                                        size={fields.length}
                                    />
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            disabled={disabled}
                            fullWidth
                            type="button"
                            onClick={() =>
                                append({
                                    id: shortid.generate(),
                                    intIdSede: "",
                                    intIdTipoTarifa: "",
                                    dblValor: "",
                                })
                            }
                        >
                            Agregar sede y tarifa
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoSedesTarifa;
