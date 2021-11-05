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
import PaperEmpresarioSec from "./paperEmpresarioSec";

const InformacionEmpresarioSec = ({ disabled, arrayValues, errors, control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "arrInfoEmpresarioSec",
    });

    const [loading, setLoading] = useState(true);

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (arrayValues) {
            for (let i = 0; i < arrayValues.length; i++) {
                append({ ...arrayValues[i], strId: shortid.generate() });
            }
        }

        setLoading(false);
    }, [arrayValues, append]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
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
                            color: errors?.arrInfoEmpresarioSec ? "#D33030" : "inherit",
                        }}
                    >
                        Información de personas empresarias secundarias
                    </Typography>
                </Box>

                <Box>
                    <IconButton onClick={() => handlerChangeOpenCollapse()} size="large">
                        <Tooltip
                            title={
                                openCollapese ? "Contraer detalle" : "Expandir detalle"
                            }
                        >
                            {openCollapese ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>

            <hr
                style={{
                    borderColor: errors?.arrInfoEmpresarioSec ? "#D33030" : "inherit",
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
                                    key={e.Id || e.intId}
                                >
                                    <PaperEmpresarioSec
                                        control={control}
                                        index={i}
                                        values={e}
                                        errors={errors}
                                        disabled={disabled}
                                        remove={remove}
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
                                    strTipoRelacion: "",
                                    strNombres: "",
                                    strApellidos: "",
                                    strTipoDocto: "",
                                    strNroDocto: "",
                                    strLugarExpedicionDocto: "",
                                    dtFechaExpedicionDocto: null,
                                    dtFechaNacimiento: null,
                                    strGenero: "",
                                    strCelular: "",
                                    strCorreoElectronico: "",
                                })
                            }
                        >
                            Agregar persona empresaria secundaria
                        </Button>
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InformacionEmpresarioSec;
