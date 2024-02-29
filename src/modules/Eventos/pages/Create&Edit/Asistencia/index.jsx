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
    Save as SaveIcon,
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
import useGetMatriculas from "../../../hooks/useGetMatriculas";
import ModalState from "./modalState";
import { Button } from "@mui/material";

const ReadAsistencia = ({ isPreview, intIdSesion, intIdEvento }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Asistencia",
            field: "btAsistio",
            type: "boolean",
            width: "5%",
        },
        {
            title: "Nombres y Apellidos",
            field: "strNombre",
            type: "string",
        },
        {
            title: "Tipo de documento",
            field: "strTipoDocto",
            type: "string",
        },
        {
            title: "Documento",
            field: "strNroDocto",
            type: "string",
        },
        {
            title: "Correo electronico",
            field: "strCorreoElectronico",
            type: "string",
        },
    ]);
    const [selectedData, setSelectedData] = useState();
    const [openModalState, setOpenModalState] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetMatriculas({
        autoload: true,
        intIdSesion,
        intIdEvento,
    });

    const handlerOpenModalState = () => {
        setOpenModalState(!openModalState);
    };
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <ModalState
                handleOpenDialog={handlerOpenModalState}
                open={openModalState}
                values={{ ...selectedData, intIdSesion, intIdEvento }}
                refresh={refreshGetData}
            />

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
                            selection: true,
                            selectionProps: (rowData) => ({
                                disabled: rowData.btAsistio,
                                color: "primary",
                            }),
                            grouping: true,
                            title: true,
                            filtering: false,
                            search: true,
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
                            actionsColumnIndex: -1,
                            paging: true,
                            pageSizeOptions: [20, 100, 200, 500],
                            pageSize: 20,
                        }}
                        actions={[
                            {
                                tooltip: "registrar asistencia",
                                icon: SaveIcon,
                                color: "primary",
                                onClick: (_, rowData) => {
                                    setSelectedData({ arrData: rowData });
                                    handlerOpenModalState();
                                },
                            },
                        ]}
                        components={{
                            Action: (props) => (
                                <Button
                                    onClick={(event) =>
                                        props.action.onClick(event, props.data)
                                    }
                                    color="primary"
                                    variant="contained"
                                    style={{ textTransform: "none" }}
                                    size="small"
                                >
                                    registrar asistencia
                                </Button>
                            ),
                        }}
                    />
                </ThemeProvider>
            </StyledEngineProvider>
        </Fragment>
    );
};

export default ReadAsistencia;
