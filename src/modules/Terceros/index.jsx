import React, { Fragment, useContext, useState } from "react";

//Hooks
import useGetTerceros from "./hook/useGetTerceros";

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
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";

//Componentes
import PanelEmpresarios from "./components/panelTerceros";
import { AbilityContext, Can } from "../../common/functions/can";

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
            title: "Nombres y Apellidos",
            render: (rowData) =>
                rowData?.strNombres + " " + rowData?.strApellidos,
        },
        {
            title: "Tipo de documento del tercero",
            field: "strTipoDocto",
            type: "string",
        },
        {
            title: "Documento del tercero",
            field: "strNroDocto",
            type: "string",
        },
        {
            title: "Email del tercero",
            field: "strCorreoElectronico",
            type: "string",
        },
        {
            title: "Numero celular del tercero",
            field: "strCelular",
            type: "string",
        },
    ]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { push } = useHistory();
    const { data } = useGetTerceros({ autoload: true });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const ability = useContext(AbilityContext);
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

                        <Typography color="textPrimary">Terceros</Typography>
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
                                        searchTooltip:
                                            "Buscar por documento, celular o email",
                                        searchPlaceholder:
                                            "Buscar por documento",
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
                                title="Terceros"
                                actions={[
                                    (rowData) => {
                                        if (ability.can("update", "Terceros")) {
                                            return {
                                                icon: () => (
                                                    <EditIcon
                                                        color={
                                                            rowData.intIdEstado ===
                                                            3
                                                                ? "gray"
                                                                : "success"
                                                        }
                                                        fontSize="small"
                                                    />
                                                ),
                                                tooltip: "Editar",
                                                disabled:
                                                    rowData.intIdEstado === 3
                                                        ? true
                                                        : false,
                                                onClick: (event, rowData) => {
                                                    push(
                                                        `/transforma/asesor/terceros/edit/${rowData.intId}`
                                                    );
                                                },
                                            };
                                        }
                                    },
                                ]}
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: ability.can("search", "Terceros"),
                                    exportAllData: true,
                                    columnsButton: true,
                                    headerStyle: {
                                        position: "sticky",
                                        top: "0",
                                        backgroundColor: "#cff3f2",
                                        zIndex: 1,
                                    },
                                    detailPanelColumnStylele: {
                                        fontSize: 12,
                                    },
                                    maxBodyHeight: "520px",
                                    paging: true,
                                    pageSizeOptions: [20, 100, 200, 500],
                                    pageSize: 20,
                                    actionsColumnIndex: -1,
                                }}
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
                                                    <PanelEmpresarios
                                                        data={data}
                                                    />
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
                                                            a="Terceros"
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    push(
                                                                        "/transforma/asesor/terceros/create"
                                                                    )
                                                                }
                                                                variant="contained"
                                                            >
                                                                Agregar tercero
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
