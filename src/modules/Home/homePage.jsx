import React, { useContext } from "react";

//Componentes de Material UI
import {
    Grid,
    Typography,
    Paper,
    Breadcrumbs,
    Card,
    CardContent,
    Avatar,
    Box,
    Button,
    CardActionArea,
} from "@mui/material";

//Iconos
import {
    Home as HomeIcon,
    CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";

//Estilos de Material UI
import { makeStyles } from "@mui/styles";

//Context
import { AuthContext } from "../../common/middlewares/Auth";
import useGetLastEmpresarios from "../../common/hooks/useGetEmpLogin";
import { format, parseISO } from "date-fns";
import { useHistory } from "react-router-dom";

import useGetLastEventos from "../../common/hooks/useGetEventLogin";

const homeStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        backgroundColor: "#00BAB3",
        position: "relative",
        color: "white",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
    iconPaper1: {
        position: "absolute",
        width: "80px",
        top: 0,
        right: 0,
        marginTop: "-10px",
    },
    iconPaper2: {
        position: "absolute",
        width: "80px",
        top: 0,
        right: 35,
        marginTop: "-10px",
    },
}));

const HomePage = () => {
    const { strInfoUser } = useContext(AuthContext);
    const history = useHistory();

    const { data: dataLastEmp } = useGetLastEmpresarios({ autoLoad: true });
    const { data: dataLastEvents } = useGetLastEventos({ autoLoad: true });
    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = homeStyles();

    return (
        <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary" className={classes.link}>
                        <HomeIcon fontSize="inherit" className={classes.icon} />
                        Inicio
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography
                        style={{ fontWeight: "bold" }}
                        variant="subtitle1"
                    >
                        {`${strInfoUser?.strNombre} ${strInfoUser?.strApellidos || ""}`}
                    </Typography>

                    <Typography>
                        ¡Te damos la bienvenida, eres parte de la
                        Transformación!
                    </Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} display="table">
                <Grid
                    item
                    xs={12}
                    md={8}
                    display="table-cell"
                    style={{
                        backgroundColor: "#f3f2f1",
                        padding: "15px",
                        height: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", paddingBottom:2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                sx={{ color: "#3b7678", fontWeight: "bold" }}
                            >
                                Conoce las nuevas personas emprendedoras
                            </Typography>
                        </Box>

                        <Box>
                            <Button
                                onClick={() =>
                                    history.push(
                                        "/transforma/asesor/empresario/read/all"
                                    )
                                }
                                size="small"
                                sx={{ color: "#3b7678", fontSize: "11px", fontWeight: "bold" }}
                            >
                                Ver todo
                            </Button>
                        </Box>
                    </Box>
                    <Grid container direction="row" spacing={2}>

                        {dataLastEmp?.map((e, i) => (
                            <Grid item xs={6} md={4} sx={{ flex: "1" }} key={i}>
                                <Card sx={{ height: "100%" }}>
                                    <CardActionArea
                                        sx={{ height: "100%" }}
                                        onClick={() =>
                                            history.push(
                                                `/transforma/asesor/empresario/read/${e.intId}`
                                            )
                                        }
                                    >
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: 70,
                                                        height: 70,
                                                    }}
                                                    src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST
                                                        }${process.env.REACT_APP_API_BACK_PORT}${e.objEmpresario
                                                            .filter((p) => p.strTipoEmpresario === "Principal")
                                                            ?.at(0)?.strUrlFileFoto}`
                                                    }
                                                >
                                                    {e.objEmpresario
                                                        ?.find(
                                                            (e) =>
                                                                e.strTipoEmpresario ===
                                                                "Principal"
                                                        )
                                                        ?.strNombres.charAt(0)}
                                                </Avatar>
                                            </Box>

                                            <Box sx={{ width: "100%" }}>
                                                <Typography
                                                    align="center"
                                                    sx={{
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {e.strNombre}
                                                </Typography>
                                            </Box>

                                            <Box sx={{ width: "100%" }}>
                                                <Typography
                                                    align="center"
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    {e.objEmpresario?.find(
                                                        (e) =>
                                                            e.strTipoEmpresario ===
                                                            "Principal"
                                                    )?.strNombres +
                                                        " " +
                                                        e.objEmpresario?.find(
                                                            (e) =>
                                                                e.strTipoEmpresario ===
                                                                "Principal"
                                                        )?.strApellidos}
                                                </Typography>
                                            </Box>

                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    marginTop: "15px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "#38c9c4",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        Sede:{" "}
                                                        {
                                                            e.objInfoPrincipal
                                                                ?.strSede
                                                        }
                                                    </span>
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    Estado: {e.strEstado}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    Vinculación:{" "}
                                                    {e?.dtFechaVinculacion ? format(
                                                        parseISO(e?.dtFechaVinculacion),
                                                        "yyyy-MM-dd"
                                                    ) : null}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: "13px",
                                                    }}
                                                >
                                                    Tipo:{" "}
                                                    {
                                                        e.objInfoPrincipal
                                                            ?.strTipoVinculacion
                                                    }
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid
                    item
                    display="table-cell"
                    xs={12}
                    md={4}
                    sx={{
                        backgroundColor: "#03787c",
                        height: "100%",
                        padding: "15px",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography
                                sx={{ color: "#fff", fontWeight: "bold" }}
                            >
                                Próximos eventos
                            </Typography>
                        </Box>

                        <Box>
                            <Button
                                onClick={() =>
                                    history.push(
                                        "/transforma/asesor/eventos/read/all"
                                    )
                                }
                                size="small"
                                sx={{ color: "#fff", fontSize: "11px" }}
                            >
                                Ver todo
                            </Button>
                        </Box>
                    </Box>

                    <Box>
                        <Button
                            onClick={() =>
                                history.push(
                                    "/transforma/asesor/eventos/create"
                                )
                            }
                            size="small"
                            sx={{ color: "#fff", fontSize: "10px" }}
                        >
                            + Agregar evento
                        </Button>
                    </Box>

                    <Box
                        display="flex"
                        marginTop="20px"
                        onClick={() =>
                            history.push("/transforma/asesor/eventos/create")
                        }
                    >
                        <Box
                            flexGrow={1}
                            maxWidth={50}
                            width="90%"
                            display="flex"
                            sx={{ backgroundColor: "#026d70" }}
                            padding="1px"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <CalendarTodayIcon htmlColor="#fff" />
                        </Box>

                        <Box marginLeft="10px">
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            >
                                Crear un evento
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#fff",
                                }}
                            >
                                al agregar un evento, aparecerá aquí, donde los
                                lectores puedan verlo.
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" width="100%" flexDirection="column">
                        {dataLastEvents?.map((e, i) => (
                            <Box key={i} display="flex" width="100%" marginTop="20px">
                                <Box
                                    flexGrow={1}
                                    maxWidth={50}
                                    width="45%"
                                    display="flex"
                                    sx={{ backgroundColor: "#fff" }}
                                    padding="1px"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Mes
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {Number(
                                                format(
                                                    parseISO(e.FechaInicial),
                                                    "MM"
                                                )
                                            )}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box marginLeft="10px">
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            color: "#fff",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {e.Nombre}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "11px",
                                            color: "#fff",
                                        }}
                                    >
                                        {(() => {
                                            const diasSemana = [
                                                "Domingo",
                                                "Lunes",
                                                "Martes",
                                                "Miércoles",
                                                "Jueves",
                                                "Viernes",
                                                "Sábado",
                                            ];

                                            const ahora = parseISO(
                                                e.FechaInicial
                                            );

                                            const diaSemana =
                                                diasSemana[ahora.getDay()];

                                            const formatoFechaHora = `${diaSemana}, ${format(
                                                parseISO(e.FechaInicial),
                                                "dd"
                                            )} del año ${format(
                                                parseISO(e.FechaInicial),
                                                "yyyy"
                                            )}`;

                                            return formatoFechaHora;
                                        })()}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: "11px",
                                            color: "#fff",
                                        }}
                                    >
                                        Responsable: {e.Responsable?.strNombre}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HomePage;
