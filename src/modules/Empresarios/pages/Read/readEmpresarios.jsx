import React, { Fragment, useState } from "react";

//Hooks

//Librerias
import { Link as RouterLink, useHistory } from "react-router-dom";

//Componentes de Material UI
import { Grid, Breadcrumbs, Link, Typography } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";

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
    Refresh as RefreshIcon,
    Home as HomeIcon,
} from "@material-ui/icons";

//Table Material UI
import MaterialTable from "@material-table/core";

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
            title: "Empresario",
            field: "strNombre",
            type: "string",
            defaultSort: "desc",
        },
        {
            title: "Sede",
            field: "dtFechaInicio",
            type: "date",
        },
        {
            title: "NIT",
            field: "dtFechaFin",
            type: "date",
        },
        {
            title: "Estado",
            field: "dtFechaReingreso",
            type: "date",
        },
        {
            title: "Categoría",
            field: "dtFechaReingreso",
            type: "date",
        },
    ]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { push } = useHistory();

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
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

                        <Typography color="textPrimary">Empresarios</Typography>
                    </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                    <ThemeProvider
                        theme={createTheme({
                            palette: {
                                mode: "light",
                                primary: {
                                    main: "#007c6a",
                                    dark: "#007c6a",
                                    light: "#0288D1",
                                    contrastText: "#ffff",
                                },
                                secondary: {
                                    main: "#ED6F17",
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
                                    labelDisplayedRows: "{from}-{to} de {count}",
                                    firstTooltip: "Primera página",
                                    previousTooltip: "Página anterior",
                                    nextTooltip: "Siguiente página",
                                    lastTooltip: "Última página",
                                    labelRowsPerPage: "Filas por página:",
                                },
                                toolbar: {
                                    nRowsSelected: "{0} filas seleccionadas",
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
                            // isLoading={data === undefined ? true : false}
                            data={[]}
                            columns={objColumns}
                            title="Lista de Empresarios"
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
                                maxBodyHeight: "320px",
                            }}
                            actions={[
                                {
                                    icon: AddBoxIcon,
                                    tooltip: "Registrar empresario",
                                    isFreeAction: true,
                                    onClick: () =>
                                        push("/transforma/asesor/empresario/create"),
                                },
                                {
                                    icon: RefreshIcon,
                                    tooltip: "Refrescar datos",
                                    isFreeAction: true,
                                    // onClick: () => refreshGetData(),
                                },
                            ]}
                        />
                    </ThemeProvider>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ReadSolicitudesUser;
