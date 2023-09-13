import React, { Fragment, useState } from "react";

//Librerias
//Componentes de Material UI
import { Grid, Box, Button } from "@mui/material";

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
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";

//Componentes
import ModalDelete from "./modalDelete";
import useGetSesiones from "../../../hooks/useGetSesiones";
import ModalCEdit from "./modalCreate&Edit";

const ReadSesiones = ({ intIdEvento, isPreview }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Id",
            field: "intId",
            type: "number",
        },
        {
            title: "Nombre del módulo",
            field: "strNombreModulo",
            type: "string",
        },
        {
            title: "Área responsable",
            field: "strArea.strNombre",
            type: "string",
        },
        {
            title: "Responsable",
            field: "strResponsables[0].strNombre",
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
    ]);

    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState();

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetSesiones({
        autoload: true,
        intIdEvento,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handlerOpenModalRegister = () => {
        setOpenModalRegister(!openModalRegister);
    };

    const handlerOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
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

            <ModalCEdit
                key={"register"}
                handleOpenDialog={handlerOpenModalRegister}
                open={openModalRegister}
                intId={selectedData?.intId}
                intIdEvento={intIdEvento}
                refresh={refreshGetData}
            />

            <ModalCEdit
                key={"edit"}
                handleOpenDialog={handlerOpenModalEdit}
                open={openModalEdit}
                intId={selectedData?.intId}
                intIdEvento={intIdEvento}
                isEdit
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
                        title="Sesiones"
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
                        actions={[
                            (rowData) => {
                                return {
                                    icon: () => (
                                        <EditIcon
                                            color={
                                                rowData.btFinalizada === true
                                                    ? "gray"
                                                    : "success"
                                            }
                                            fontSize="small"
                                        />
                                    ),
                                    tooltip: "Editar",
                                    onClick: (_, rowData) => {
                                        setSelectedData(rowData);
                                        handlerOpenModalEdit();
                                    },
                                };
                            },
                            (rowData) => {
                                return {
                                    icon: () => (
                                        <DeleteIcon
                                            color={
                                                rowData.btFinalizada === true
                                                    ? "gray"
                                                    : "error"
                                            }
                                            fontSize="small"
                                        />
                                    ),
                                    onClick: (event, rowData) => {
                                        setSelectedData(rowData);
                                        handlerOpenModalDelete();
                                    },
                                    tooltip: "Eliminar",
                                };
                            },
                        ]}
                        onRowClick={(e, rowData) => {}}
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
                                        <Grid item xs={12} md={6}></Grid>

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
                                                <Button
                                                    onClick={() => {
                                                        handlerOpenModalRegister();
                                                    }}
                                                    variant="contained"
                                                >
                                                    Agregar sesion
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
        </Fragment>
    );
};

export default ReadSesiones;
