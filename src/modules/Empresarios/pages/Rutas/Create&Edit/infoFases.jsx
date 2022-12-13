import React, { Fragment, useState, useEffect } from "react";

//Librerias
import { useFieldArray } from "react-hook-form";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import shortid from "shortid";
import "animate.css";

//Componentes de Material UI
import {
    Box,
    CircularProgress,
    Typography,
    IconButton,
    Tooltip,
    Collapse,
    Button,
    Grid,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import PaperFase from "./paperFase";

const InfoFases = ({
    disabled,
    setValue,
    arrayValues,
    errors,
    control,
    fields,
    append,
    remove,
    isEdit
}) => {
    const [loading, setLoading] = useState(false);

    const [openCollapese, setOpenCollapse] = useState(true);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        setLoading(true);

        if (arrayValues?.length > 0) {
            for (let i = 0; i < arrayValues.length; i++) {
                append({ ...arrayValues[i], Id: shortid.generate() });
            }
        } else {
            if (fields.length === 0) {
                append({
                    Id: shortid.generate(),
                    intEstado: "",
                    intDiagnostico: "",
                    strResponsable: "",
                    strObservaciones: "",
                    arrObjetivos: [],
                    arrPaquetes: [],
                    arrServicios: [],
                    objTarifa: "",
                    dblValorRef: "",
                    dblValorFase: "",
                });
            }
        }

        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrayValues, append]);

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
                            color: errors?.arrInfoFases ? "#D33030" : "inherit",
                        }}
                    >
                        Información fases
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
                    borderColor: errors?.arrInfoFases ? "#D33030" : "inherit",
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
                                    key={e.Id || e.intId || e.strId}
                                >
                                    <PaperFase
                                        control={control}
                                        index={i}
                                        values={e}
                                        setValue={setValue}
                                        errors={errors}
                                        isEdit={isEdit}
                                        disabled={disabled}
                                        remove={remove}
                                        length={fields.length}
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
                                    Id: shortid.generate(),
                                    intEstado: "",
                                    intDiagnostico: "",
                                    strResponsable: "",
                                    strObservaciones: "",
                                    arrObjetivos: [],
                                    arrPaquetes: [],
                                    arrServicios: [],
                                    objTarifa: "",
                                    dblValorRef: "",
                                    dblValorFase: "",
                                })
                            }
                        >
                            Agregar fase
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoFases;
