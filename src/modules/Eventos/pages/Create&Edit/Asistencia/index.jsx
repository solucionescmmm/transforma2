import React, { Fragment, useState } from "react";

//Librerias
//Componentes de Material UI
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
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";

//Componentes
import useGetAsistencia from "../../../hooks/useGetAsistencia";

const ReadAsistencia = ({ isPreview, intIdSesion }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Nombres y Apellidos",
            field: "objDataAsistente.strNombres",
            type: "string",
        },
        {
            title: "Tipo de documento",
            field: "objDataAsistente.strTipoDocto",
            type: "string",
        },
        {
            title: "Documento",
            field: "objDataAsistente.strNroDocto",
            type: "string",
        },
        {
            title: "Correo electronico",
            field: "objDataAsistente.strCorreoElectronico1",
            type: "string",
        },
    ]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data } = useGetAsistencia({
        autoload: true,
        intIdSesion,
    });

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
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
                        title="Asistencia"
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
                            paging: true,
                            pageSizeOptions: [20, 100, 200, 500],
                            pageSize: 20,
                        }}
                        onRowClick={(e, rowData) => {}}
                    />
                </ThemeProvider>
            </StyledEngineProvider>
        </Fragment>
    );
};

export default ReadAsistencia;
