import React, { useState, useEffect, Fragment } from "react";

//Librerias
import { Controller } from "react-hook-form";

//Componentes de Material UI
import {
    Grid,
    Collapse,
    Box,
    Typography,
    IconButton,
    Tooltip,
    CircularProgress,
    TextField,
    Card,
    CardContent,
} from "@mui/material";

//Iconos de Material UI
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

//Componentes
import SelectListas from "../../../../components/selectLista";
import DropdownLista from "../../../../components/dropdownLista";
import { blue } from "@mui/material/colors";

const InfoEncuestaHumanas = ({
    disabled,
    values,
    errors,
    control,
    setValue,
    clearErrors,
    setError,
}) => {
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState({
        strTomaDesiciones: "",
        strMotivaciones: "",
        strNivelVida: "",
        strRedesApoyoOtros: [],
        strProyectoVidaEmpresa: "",
        strHabilidadesAutonomia: "",
        strHabilidadesCapacidad: "",
        strHabilidadesComunicacion: "",
        strProyectoVidaEmprendimiento: "",
        strHabilidadesCreatividad: "",
        strConfianza: "",
        strEquilibrioVida: [],
        strRedesApoyoPropia: "",
        strActividadesDisminuyenActProductiva: "",
        strSituacionesDesistirEmprendimiento: [],
        strObservaciones: "",
    });

    const [openCollapese, setOpenCollapse] = useState(false);

    const handlerChangeOpenCollapse = () => {
        setOpenCollapse(!openCollapese);
    };

    useEffect(() => {
        if (values) {
            setData({
                strTomaDesiciones: values.strTomaDesiciones || "",
                strMotivaciones: values.strMotivaciones || "",
                strNivelVida: values.strNivelVida || "",
                strRedesApoyoOtros: values.strRedesApoyoOtros || [],
                strProyectoVidaEmpresa: values.strProyectoVidaEmpresa || "",
                strHabilidadesAutonomia: values.strHabilidadesAutonomia || "",
                strHabilidadesCapacidad: values.strHabilidadesCapacidad || "",
                strHabilidadesComunicacion:
                    values.strHabilidadesComunicacion || "",
                strProyectoVidaEmprendimiento:
                    values.strProyectoVidaEmprendimiento || "",
                strHabilidadesCreatividad:
                    values.strHabilidadesCreatividad || "",
                strConfianza: values.strConfianza || "",
                strEquilibrioVida: values.strEquilibrioVida || [],
                strRedesApoyoPropia: values.strRedesApoyoPropia || "",
                strActividadesDisminuyenActProductiva:
                    values.strActividadesDisminuyenActProductiva || "",
                strSituacionesDesistirEmprendimiento:
                    values.strSituacionesDesistirEmprendimiento || [],
                strObservaciones: values.strObservaciones || "",
            });
        }

        setLoading(false);
    }, [values]);

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
                            color: errors?.objInfoEncuestaHumanas
                                ? "#D33030"
                                : "inherit",
                        }}
                    >
                        Componente humano
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
                    borderColor: errors?.objInfoEncuestaHumanas
                        ? "#D33030"
                        : "inherit",
                }}
            />

            <Collapse in={openCollapese} timeout="auto">
                <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Motivación
                                </Typography>
                                <Typography variant="body2">
                                    Todas las personas cuando emprenden tienen diferentes motivaciones para hacerlo, pero siempre
                                    hay una razón principal que es el impulso para llevar a cabo el emprendimiento.
                                    Teniendo presente esta definición evalúa en que nivel te encuentras para la siguiente pregunta
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strMotivaciones"
                            defaultValue={data.strMotivaciones}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cuál es tú principal motivación para emprender?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strMotivaciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strMotivaciones?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="Motivaciones"
                                />
                            )}
                            control={control}
                        />
                    </Grid>
         
                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Habilidades personales para emprender
                                </Typography>
                                <Typography variant="body2">
                                    Las personas empresarias siempre desean
                                    contar con todas las habilidades que se
                                    requieren para su desarrollo empresarial,
                                    sin embargo, el desarrollo de estas es un
                                    proceso que está en permanente desarrollo.
                                    Teniendo presente esta definición evalúa en
                                    qué nivel te encuentras para las siguientes
                                    preguntas:{" "}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesAutonomia"
                            defaultValue={data.strHabilidadesAutonomia}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Autonomía para el manejo de su negocio"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesAutonomia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesAutonomia
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesAutonomia"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesCapacidad"
                            defaultValue={data.strHabilidadesCapacidad}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Capacidad de adaptarse a los cambios"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCapacidad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCapacidad
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesCapacidad"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesCreatividad"
                            defaultValue={data.strHabilidadesCreatividad}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Creatividad en productos y en procesos productivos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCreatividad
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesCreatividad
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesCreatividad"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strHabilidadesComunicacion"
                            defaultValue={data.strHabilidadesComunicacion}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Comunicación efectiva con los clientes, con los empleados, los proveedores"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesComunicacion
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strHabilidadesComunicacion
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="HabilidadesComunicacion"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Toma de decisiones
                                </Typography>
                                <Typography variant="body2">
                                    Los negocios se enfrentan a permanentes
                                    cambios, a innovaciones y no siempre es
                                    fácil tomar e implementar las decisiones con
                                    oportunidad. Teniendo presente esta
                                    definición evalúa en qué nivel te encuentras
                                    para las siguiente pregunta:
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strTomaDesiciones"
                            defaultValue={data.strTomaDesiciones}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Cómo se siente al momento de tomar las decisiones en su emprendimiento? "
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strTomaDesiciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strTomaDesiciones?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="TomaDesiciones"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Confianza
                                </Typography>
                                <Typography variant="body2">
                                    La capacitación, el conocimiento, y las
                                    experiencias adquiridas, van generando
                                    certezas que permiten construir confianza y
                                    facilitan el actuar certero de la persona
                                    empresaria. Teniendo presente esta
                                    definición evalúa en qué nivel te encuentras
                                    para las siguiente pregunta:
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strConfianza"
                            defaultValue={data.strConfianza}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="De acuerdo con las experiencias y el conocimiento adquirido en su actuar empresarial, en la siguiente escala en qué nivel confianza se ubicaría"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strConfianza
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strConfianza?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="Confianza"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Apoyo del entorno
                                </Typography>
                                <Typography variant="body2">
                                    Crear y utilizar redes de apoyo con la familia, con amigos, con otras personas 
                                    empresarias, es importante para avanzar en mejores prácticas, en innovación, en la búsqueda de logros.
                                    Teniendo presente esta definición evalúa en qué nivel te encuentras para la siguiente pregunta:
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
   
                    <Grid item xs={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strRedesApoyoPropia"
                            defaultValue={data.strRedesApoyoPropia}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Evalúe su capacidad, su actitud para crear redes"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoPropia
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoPropia?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="RedesApoyoPropia"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strRedesApoyoOtros"
                            defaultValue={data.strRedesApoyoOtros}
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownLista
                                    label="¿En quiénes ha encontrado apoyo para salir adelante con su emprendimiento?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => onChange(value)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoOtros
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strRedesApoyoOtros?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="RedesApoyoOtros"
                                    multiple
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Proyecto de vida
                                </Typography>
                                <Typography variant="body2">
                                    Lo que uno crea, por ejemplo, una empresa, tiene mas posibilidades
                                    de triunfar sí se convierte en parte del proyecto de vida.
                                    Teniendo presente esta definición evalúa en qué nivel te encuentras
                                    para la siguiente pregunta:
                                    
                                     </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
   
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strProyectoVidaEmpresa"
                            defaultValue={data.strProyectoVidaEmpresa}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿En su momento actual de desarrollo, cuánto diría que su empresa se ha convertido en su proyecto de vida?"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmpresa
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmpresa?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="ProyectoVidaEmpresa"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strProyectoVidaEmprendimiento"
                            defaultValue={data.strProyectoVidaEmprendimiento}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="Consideras que el emprendimiento, te permite cumplir tus aspiraciones y proyectos"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strProyectoVidaEmprendimiento
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="ProyectoVidaEmprendimiento"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                   Influencia al entorno
                                </Typography>
                                <Typography variant="body2">
                                    Lo que hacemos siempre tiene un impacto en diferentes niveles (personal, familiar y social) y el emprendimiento se convierte en la búsqueda 
                                    de mejorar el nivel de vida. Teniendo presente esta definición evalúa en qué nivel te encuentras para la siguiente pregunta:
                                    
                                     </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strNivelVida"
                            defaultValue={data.strNivelVida}
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label="¿Desde que inició su empresa hasta hoy, cuánto ha influido en el nivel de vida de su familia (ingresos, salud, educación…)"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strNivelVida
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strNivelVida?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="NivelVida"
                                />
                            )}
                            control={control}
                        />
                    </Grid>


                    <Grid item xs={12}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: blue[50] }}
                        >
                            <CardContent>
                                <Typography
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        fontWeight: "bold",
                                        paddingBottom: "5px",
                                    }}
                                >
                                   Equilibrio de vida
                                </Typography>
                                <Typography variant="body2">
                                    El equilibrio entre la vida laboral y personal se da cuando logramos dedicar tiempo a ambos aspectos.
                                    Teniendo presente esta definición evalúa en qué nivel te encuentras para la siguiente pregunta:
                                     </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strEquilibrioVida"
                            defaultValue={data.strEquilibrioVida}
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownLista
                                    label="Seleccione las actividades que en tú rutina realizas para el descanso y esparcimiento"
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => onChange(value)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strEquilibrioVida
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strEquilibrioVida?.message ||
                                        "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="EquilibrioVida"
                                    multiple
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    {/* <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strActividadesDisminuyenActProductiva"
                            defaultValue={
                                data.strActividadesDisminuyenActProductiva
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <SelectListas
                                    label=" "
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strActividadesDisminuyenActProductiva
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strActividadesDisminuyenActProductiva
                                            ?.message || "Seleccione una opción"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="ActividadesDisminuyenActProductiva"
                                />
                            )}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strSituacionesDesistirEmprendimiento"
                            defaultValue={
                                data.strSituacionesDesistirEmprendimiento
                            }
                            render={({ field: { name, onChange, value } }) => (
                                <DropdownLista
                                    label="¿Cuáles son las situaciones que te podrían llevar a desistir del emprendimiento? "
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e, value) => onChange(value)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strSituacionesDesistirEmprendimiento
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strSituacionesDesistirEmprendimiento
                                            ?.message ||
                                        "Seleccione una o varias opciones"
                                    }
                                    strGrupo="DiagnosticoHumanoSocial"
                                    strCodigo="SituacionesDesistirEmprendimiento"
                                    multiple
                                />
                            )}
                            control={control}
                        />
                    </Grid> */}

                    <Grid item xs={12} md={12}>
                        <Controller
                            name="objInfoEncuestaHumanas.strObservaciones"
                            defaultValue={data.strObservaciones}
                            render={({ field: { name, onChange, value } }) => (
                                <TextField
                                    label="Conclusiones y observaciones "
                                    name={name}
                                    value={value}
                                    disabled={disabled}
                                    onChange={(e) => onChange(e)}
                                    error={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strObservaciones
                                            ? true
                                            : false
                                    }
                                    helperText={
                                        errors?.objInfoEncuestaHumanas
                                            ?.strObservaciones?.message ||
                                        "Digita tu respuesta"
                                    }
                                    multiline
                                    fullWidth
                                    rows={4}
                                />
                            )}
                            control={control}
                        />
                    </Grid>
                </Grid>
            </Collapse>
        </Fragment>
    );
};

export default InfoEncuestaHumanas;
