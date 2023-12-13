import React, { Fragment, useContext, useState } from "react";

//Librerias
import { Link as RouterLink, useHistory } from "react-router-dom";

//Componentes de Material UI
import {
    Grid,
    Breadcrumbs,
    Link,
    Typography,
    Box,
    Button,
} from "@mui/material";

import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";

import { makeStyles } from "@mui/styles";

//Iconos
import {
    ViewColumn as ViewColumnIcon,
    Edit as EditIcon,
    Clear as ClearIcon,
    DeleteOutline as DeleteOutlineIcon,
    Search as SearchIcon,
    SaveAlt as SaveAltIcon,
    ArrowDownward as ArrowDownwardIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    Check as CheckIcon,
    FilterList as FilterListIcon,
    Remove as RemoveIcon,
    AddBox as AddBoxIcon,
    Home as HomeIcon,
    Delete as DeleteIcon,
    Cancel as CancelIcon,
    PlayArrow as PlayIcon,
    Stop as StopIcon,
    Pause as PauseIcon,
    RemoveRedEye as RemoveRedEyeIcon,
    Edit,
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";

//Componentes
import Panel from "../components/panel";
import useGetEventos from "../hooks/useGetEventos";
import ModalCancelacion from "./modalCancelacion";
import ModalFinalizacion from "./modalFinalizacion"
import ModalEjecucion from "./modalEjecucion";
import ModalSuspencion from "./modalSuspencion";
import ModalDelete from "./modalDelete";
import { AbilityContext, Can } from "../../../common/functions/can";

const styles = makeStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const ReadSolicitudesUser = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Nombre del evento",
            field: "strNombre",
            type: "string",
        },
        {
            title: "Tipo de Evento",
            field: "strNombreTipo",
            type: "string",
        },
        {
            title: "Responsable",
            field: "strResponsable.strNombre",
            type: "string",
        },
        {
            title: "Servicio",
            field: "strNombreServicio",
            type: "string",
        },
        {
            title: "Estado",
            field: "strNombreEstado",
            type: "string",
        },
        {
            title: "Fecha de Inicio",
            field: "dtFechaIni",
            type: "date",
        },
        {
            title: "Fecha fin",
            field: "dtFechaFin",
            type: "date",
        },
        {
            title: "Número de Sesiones",
            field: "intNumSesiones",
            type: "number",
        },
    ]);

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCancelacion, setOpenModalCancelacion] = useState(false);
    const [openModalEjecucion, setOpenModalEjecucion] = useState(false);
    const [openModalSuspencion, setOpenModalSuspencion] = useState(false);
    const [openModalFinalizacion, setOpenModalFinalizacion] = useState(false);
    const [selectedData, setSelectedData] = useState();

    const ability = useContext(AbilityContext);
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { push } = useHistory();
    const { data, refreshGetData } = useGetEventos({ autoload: true });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handlerOpenModalCancelacion = () => {
        setOpenModalCancelacion(!openModalCancelacion);
    };

    const handlerOpenModalEjecucion = () => {
        setOpenModalEjecucion(!openModalEjecucion);
    };

    const handlerOpenModalSuspencion = () => {
        setOpenModalSuspencion(!openModalSuspencion);
    };

    const handlerOpenModalFinalizacion = () => {
        setOpenModalFinalizacion(!openModalFinalizacion);
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <ModalDelete
                handleOpenDialog={handlerOpenModalDelete}
                open={openModalDelete}
                intId={selectedData?.intId}
                refresh={refreshGetData}
            />

            <ModalCancelacion
                handleOpenDialog={handlerOpenModalCancelacion}
                open={openModalCancelacion}
                intId={selectedData?.intId}
                refresh={refreshGetData}
            />

            <ModalEjecucion
                handleOpenDialog={handlerOpenModalEjecucion}
                open={openModalEjecucion}
                intId={selectedData?.intId}
                refresh={refreshGetData}
            />

            <ModalSuspencion
                handleOpenDialog={handlerOpenModalSuspencion}
                open={openModalSuspencion}
                intId={selectedData?.intId}
                refresh={refreshGetData}
            />

            <ModalFinalizacion
                handleOpenDialog={handlerOpenModalFinalizacion}
                open={openModalFinalizacion}
                intId={selectedData?.intId}
                refresh={refreshGetData}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            color="inherit"
                            component={RouterLink}
                            to="/transforma"
                            className={classes.link}
                        >
                            <HomeIcon className={classes.icon} />
                            Inicio
                        </Link>

                        <Typography color="textPrimary">
                            Eventos Grupales
                        </Typography>
                    </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider
                            theme={createTheme({
                                palette: {
                                    mode: "light",
                                    primary: {
                                        main: "#00BAB3",
                                        dark: "#007c6a",
                                        light: "#0288D1",
                                        contrastText: "#ffff",
                                    },
                                    secondary: {
                                        main: "#FF4160",
                                    },
                                    divider: "#BDBDBD",
                                },
                                typography: { fontSize: 13.2 },
                                components: {
                                    MuiTableBody: {
                                        styleOverrides: {
                                            root: {
                                                fontSize: 13.2,
                                            },
                                        },
                                    },
                                    MuiTableCell: {
                                        styleOverrides: {
                                            root: {
                                                padding: "5px",
                                            },
                                        },
                                    },
                                },
                            })}
                        >
                            <MaterialTable
                                icons={{
                                    Add: AddBoxIcon,
                                    Clear: ClearIcon,
                                    Check: CheckIcon,
                                    Delete: DeleteOutlineIcon,
                                    Edit: EditIcon,
                                    DetailPanel: ChevronRightIcon,
                                    Export: SaveAltIcon,
                                    Filter: FilterListIcon,
                                    FirstPage: FirstPageIcon,
                                    LastPage: LastPageIcon,
                                    NextPage: ChevronRightIcon,
                                    PreviousPage: ChevronLeftIcon,
                                    Search: SearchIcon,
                                    ResetSearch: ClearIcon,
                                    SortArrow: ArrowDownwardIcon,
                                    ThirdStateCheck: RemoveIcon,
                                    ViewColumn: ViewColumnIcon,
                                }}
                                localization={{
                                    pagination: {
                                        labelRowsSelect: "filas",
                                        labelDisplayedRows:
                                            "{from}-{to} de {count}",
                                        firstTooltip: "Primera página",
                                        previousTooltip: "Página anterior",
                                        nextTooltip: "Siguiente página",
                                        lastTooltip: "Última página",
                                        labelRowsPerPage: "Filas por página:",
                                    },
                                    toolbar: {
                                        nRowsSelected:
                                            "{0} filas seleccionadas",
                                        searchTooltip: "Buscar",
                                        searchPlaceholder: "Buscar",
                                    },
                                    header: {
                                        actions: "Acciones",
                                    },
                                    body: {
                                        emptyDataSourceMessage:
                                            "No existe información por mostrar",
                                        filterRow: {
                                            filterTooltip: "Filtro",
                                        },
                                        editRow: {
                                            deleteText:
                                                "Esta seguro de eliminar el registro?",
                                        },
                                    },
                                    selector: {
                                        okLabel: "aceptar",
                                        cancelLabel: "Cancelar",
                                        clearLabel: "Clear",
                                        todayLabel: "Hoy",
                                    },
                                    grouping: {
                                        placeholder:
                                            "Arrasta el nombre de la columna para agrupar los campos",
                                        groupedBy: "Datos agrupados por: ",
                                    },
                                }}
                                isLoading={data === undefined ? true : false}
                                data={!data?.error && data ? data : []}
                                columns={objColumns}
                                title="Eventos Grupales"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: ability.can("search", "Eventos"),
                                    exportAllData: true,
                                    columnsButton: true,
                                    headerStyle: {
                                        position: "sticky",
                                        top: "0",
                                        backgroundColor: "#cff3f2",
                                    },
                                    detailPanelColumnStylele: {
                                        fontSize: 12,
                                    },
                                    maxBodyHeight: "520px",
                                    actionsColumnIndex: -1,
                                    paging: true,
                                    pageSizeOptions: [20, 100, 200, 500],
                                    pageSize: 20,
                                }}
                                actions={[
                                    (rowData) => {
                                        if (ability.can("update", "Eventos")) {
                                            return {
                                                icon: () => (rowData.strNombreEstado === "Cancelado" || rowData.strNombreEstado === "Finalizado" ? (
                                                    <RemoveRedEyeIcon
                                                        color="gray"
                                                        fontSize="small" 
                                                    />
                                                ) : (
                                                    <Edit
                                                        color={
                                                            rowData.btFinalizada ===
                                                                true
                                                                ? "gray"
                                                                : "success"
                                                        }
                                                        fontSize="small"
                                                    />
                                                )),
                                                tooltip: "Editar",
                                                onClick: (event, rowData) => {
                                                    push(
                                                        `/transforma/asesor/eventos/edit/${rowData.intId}`
                                                    );
                                                },
                                                disabled:
                                                    rowData.btFinalizada ===
                                                    true,
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("cancel", "Eventos")) {
                                            return {
                                                icon: () => (
                                                    <PlayIcon
                                                        color={
                                                            rowData.strNombreEstado === "En ejecución" ||
                                                            rowData.strNombreEstado === "Finalizado" ||
                                                            rowData.strNombreEstado === "Cancelado"
                                                                ? "gray"
                                                                : "success"
                                                        }
                                                        fontSize="small"
                                                    />
                                                ),
                                                disabled:
                                                    rowData.strNombreEstado === "En ejecución" ||
                                                    rowData.strNombreEstado === "Finalizado" ||
                                                    rowData.strNombreEstado === "Cancelado",
                                                onClick: (event, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalEjecucion();
                                                },
                                                tooltip: "Ejecutar",
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("cancel", "Eventos")) {
                                            return {
                                                icon: () => (
                                                    <StopIcon
                                                        color={
                                                            rowData.strNombreEstado === "Planeado" ||
                                                            rowData.strNombreEstado === "Suspendido" ||
                                                            rowData.strNombreEstado === "Finalizado" ||
                                                            rowData.strNombreEstado === "Cancelado"
                                                                ? "gray"
                                                                : "error"
                                                        }
                                                        fontSize="small"
                                                    />
                                                ),
                                                disabled:
                                                    rowData.strNombreEstado === "Planeado" ||
                                                    rowData.strNombreEstado === "Suspendido" ||
                                                    rowData.strNombreEstado === "Finalizado" ||
                                                    rowData.strNombreEstado === "Cancelado",
                                                onClick: (event, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalFinalizacion();
                                                },
                                                tooltip: "Finalizar",
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("cancel", "Eventos")) {
                                            return {
                                                icon: () => (
                                                    <PauseIcon
                                                        color={
                                                            rowData.strNombreEstado === "Planeado" ||
                                                            rowData.strNombreEstado === "Suspendido" ||
                                                            rowData.strNombreEstado === "Finalizado" ||
                                                            rowData.strNombreEstado === "Cancelado"
                                                                ? "gray"
                                                                : "warning"
                                                        }
                                                        fontSize="small"
                                                    />
                                                ),
                                                disabled:
                                                    rowData.strNombreEstado === "Planeado" ||
                                                    rowData.strNombreEstado === "Suspendido" ||
                                                    rowData.strNombreEstado === "Finalizado" ||
                                                    rowData.strNombreEstado === "Cancelado",
                                                onClick: (event, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalSuspencion();
                                                },
                                                tooltip: "Suspender",
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("cancel", "Eventos")) {
                                            return {
                                                icon: () => (
                                                    <CancelIcon
                                                        color={
                                                            rowData.strNombreEstado === "Finalizado" ||
                                                            rowData.strNombreEstado === "Cancelado"
                                                                ? "gray"
                                                                : "error"
                                                        }
                                                        fontSize="small"
                                                    />
                                                ),
                                                disabled:
                                                    rowData.strNombreEstado === "Finalizado" ||
                                                    rowData.strNombreEstado === "Cancelado",
                                                onClick: (event, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalCancelacion();
                                                },
                                                tooltip: "Cancelar",
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("delete", "Eventos")) {
                                            return {
                                                icon: () => (
                                                    <DeleteIcon
                                                        color={
                                                            rowData.strNombreEstado === "En ejecución" ||
                                                            rowData.strNombreEstado === "Finalizado" ||
                                                            rowData.strNombreEstado === "Suspendido"
                                                                ? "gray"
                                                                : "error"
                                                        }
                                                        fontSize="small"
                                                    />
                                                ),
                                                disabled:
                                                    rowData.strNombreEstado === "En ejecución" ||
                                                    rowData.strNombreEstado === "Finalizado" ||
                                                    rowData.strNombreEstado === "Suspendido",
                                                onClick: (event, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalDelete();
                                                },
                                                tooltip: "Eliminar",
                                            };
                                        }
                                    },
                                ]}
                                // onRowClick={(e, rowData) => {
                                //     push(
                                //         `/transforma/asesor/eventos/read/${rowData.intId}`
                                //     );
                                // }}
                                components={{
                                    Toolbar: (props) => (
                                        <div
                                            style={{
                                                paddingRight: "5px",
                                                paddingLeft: "5px",
                                            }}
                                        >
                                            <MTableToolbar {...props} />

                                            <Grid container direction="row">
                                                <Grid item xs={12} md={6}>
                                                    <Panel data={data} />
                                                </Grid>

                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    sx={{ margin: "auto" }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row-reverse",
                                                        }}
                                                    >
                                                        <Can
                                                            I="create"
                                                            a="Eventos"
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    push(
                                                                        "/transforma/asesor/eventos/create"
                                                                    )
                                                                }
                                                                variant="contained"
                                                            >
                                                                Agregar evento
                                                            </Button>
                                                        </Can>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ),
                                }}
                            />
                        </ThemeProvider>
                    </StyledEngineProvider>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ReadSolicitudesUser;
