import React, { Fragment, useState } from "react";

//Librerias
import { Link as RouterLink, useHistory } from "react-router-dom";

// Hooks
import useGetServicios from "../../hooks/useGetServicios";

//Componentes de Material UI
import {
    Grid,
    Box,
    Button,
    Typography,
    Link,
    Breadcrumbs,
    Switch,
} from "@mui/material";

import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";

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
    Delete as DeleteIcon,
    Home as HomeIcon,
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";
import ModalDelete from "./modalDelete";
import ModalState from "./modalState";

//Estilos
import { makeStyles } from "@mui/styles";

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
            title: "",
            render: (rowData) => (
                <Switch
                    checked={
                        rowData.objInfoPrincipal.intIdEstado === 1
                            ? true
                            : false
                    }
                    size="small"
                    onClick={() => {
                        setSelectedData(rowData);
                        handlerOpenModalState();
                    }}
                />
            ),
            width: "5%",
        },
        {
            title: "Id",
            field: "objInfoPrincipal.intId",
            type: "numeric",
            width: "5%",
        },
        {
            title: "Estado",
            field: "objInfoPrincipal.intIdEstado",
            lookup: { 1: "Activo", 2: "En borrador", 3: "Inactivo" },
        },
        {
            title: "Nombre",
            field: "objInfoPrincipal.strNombre",
            type: "string",
        },
        {
            title: "Tipo de servicio",
            field: "objInfoPrincipal.strNombreTipoServicio",
            type: "string",
        },
        {
            title: "Fecha de creación",
            field: "objInfoPrincipal.dtmCreacion",
            type: "date",
        },
        {
            title: "Responsable",
            field: "objInfoPrincipal.strUsuarioCreacion",
            type: "string",
        },
    ]);

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalState, setOpenModalState] = useState(false);
    const [selectedData, setSelectedData] = useState();

    const { data, refreshGetData } = useGetServicios({ autoLoad: true });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const { push } = useHistory();

    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handlerOpenModalState = () => {
        setOpenModalState(!openModalState);
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

            <ModalState
                handleOpenDialog={handlerOpenModalState}
                open={openModalState}
                values={selectedData?.objInfoPrincipal}
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

                        <Link
                            color="inherit"
                            component={RouterLink}
                            to="/transforma/admin/"
                            className={classes.link}
                        >
                            Administración
                        </Link>

                        <Typography color="textPrimary">
                            Gestión de servicios
                        </Typography>
                    </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6">Gestión de servicios</Typography>

                    <hr />
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
                                isLoading={
                                    typeof data === "undefined" ? true : false
                                }
                                data={data || []}
                                columns={objColumns}
                                title="Lista de servicios"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: true,
                                    exportAllData: true,
                                    columnsButton: true,
                                    headerStyle: {
                                        position: "sticky",
                                        top: "0",
                                        backgroundColor: "white",
                                    },
                                    detailPanelColumnStylele: {
                                        fontSize: 12,
                                    },
                                    maxBodyHeight: "520px",
                                    actionsColumnIndex: -1,
                                }}
                                actions={[
                                    (rowData) => {
                                        return {
                                            icon: () => (
                                                <EditIcon
                                                    color={
                                                        rowData.objInfoPrincipal
                                                            .intIdEstado ===
                                                            1 ||
                                                        rowData.objInfoPrincipal
                                                            .intIdEstado === 3
                                                            ? "gray"
                                                            : "success"
                                                    }
                                                    fontSize="small"
                                                />
                                            ),
                                            tooltip: "Editar",
                                            onClick: (event, rowData) => {
                                                push(
                                                    `/transforma/admin/services/edit/${rowData.objInfoPrincipal.intId}`
                                                );
                                            },
                                            disabled:
                                                rowData.objInfoPrincipal
                                                    .intIdEstado === 1 ||
                                                rowData.objInfoPrincipal
                                                    .intIdEstado === 3,
                                        };
                                    },
                                    (rowData) => {
                                        return {
                                            icon: () => (
                                                <DeleteIcon
                                                    color={
                                                        rowData.objInfoPrincipal
                                                            .intIdEstado ===
                                                            1 ||
                                                        rowData.objInfoPrincipal
                                                            .intIdEstado === 3
                                                            ? "gray"
                                                            : "error"
                                                    }
                                                    fontSize="small"
                                                />
                                            ),
                                            tooltip: "Eliminar",
                                            onClick: (event, rowData) => {
                                                setSelectedData(rowData);
                                                handlerOpenModalDelete();
                                            },
                                            disabled:
                                                rowData.objInfoPrincipal
                                                    .intIdEstado === 1 ||
                                                rowData.objInfoPrincipal
                                                    .intIdEstado === 3,
                                        };
                                    },
                                ]}
                                components={{
                                    Toolbar: (props) => (
                                        <div
                                            style={{
                                                paddingRight: "5px",
                                                paddingLeft: "5px",
                                            }}
                                        >
                                            <MTableToolbar {...props} />

                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "row-reverse",
                                                            padding:
                                                                "10px 35px",
                                                        }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            onClick={() =>
                                                                push(
                                                                    "/transforma/admin/services/create"
                                                                )
                                                            }
                                                        >
                                                            Agregar servicio
                                                        </Button>
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
