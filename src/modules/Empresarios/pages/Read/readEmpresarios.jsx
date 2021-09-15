import React, { Fragment, useState } from "react";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

//Librerias
import { Link as RouterLink, useHistory } from "react-router-dom";

//Componentes de Material UI
import { Grid, Breadcrumbs, Link, Typography, Avatar } from "@mui/material";

import { ThemeProvider, StyledEngineProvider, createTheme } from "@mui/material/styles";

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
    Refresh as RefreshIcon,
    Home as HomeIcon,
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";

//Componentes
import PanelEmpresarios from "../../components/panelEmpresarios";

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
            title: "Foto",
            render: (rowData) => (
                <Avatar
                    alt={rowData.strNombres + rowData.strApellidos}
                    src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${rowData.strUrlFoto}`}
                />
            ),
            width: "0%",
        },
        {
            title: "Nombres",
            field: "strNombres",
            type: "string",
            defaultSort: "desc",
        },
        {
            title: "Apellidos",
            field: "strApellidos",
            type: "string",
            defaultSort: "desc",
        },
        {
            title: "NIT",
            field: "strNroDocto",
            type: "string",
        },
        {
            title: "Sede",
            field: "strSede",
            type: "string",
        },
        {
            title: "Fecha de vinculación",
            field: "dtFechaVinculacion",
            type: "date",
        },
        {
            title: "Estado",
            field: "strEstado",
            type: "string",
        },
    ]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { push } = useHistory();
    const { data, refreshGetData } = useGetEmpresarios({ autoload: true });

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
                    <PanelEmpresarios data={data} />
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
                                isLoading={data === undefined ? true : false}
                                data={!data?.error && data ? data : []}
                                columns={objColumns}
                                title="Lista de Empresarios"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: true,
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
                                    maxBodyHeight: "420px",
                                }}
                                actions={[
                                    {
                                        icon: () => <AddBoxIcon color="success" />,
                                        tooltip: "Registrar empresario",
                                        isFreeAction: true,
                                        onClick: () =>
                                            push("/transforma/asesor/empresario/create"),
                                    },
                                    {
                                        icon: RefreshIcon,
                                        tooltip: "Refrescar datos",
                                        isFreeAction: true,
                                        onClick: () => refreshGetData(),
                                    },
                                ]}
                                onRowClick={(e, rowData) => {
                                    push(
                                        `/transforma/asesor/empresario/read/${rowData.intId}`
                                    );
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
