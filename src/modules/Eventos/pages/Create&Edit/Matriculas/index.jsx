import React, { Fragment, useContext, useState } from "react";

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
import ModalCEdit from "./modalCreate";
import useGetMatriculas from "../../../hooks/useGetMatriculas";
import { AbilityContext, Can } from "../../../../../common/functions/can";

const ReadMatriculas = ({ intIdEvento, isPreview }) => {
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

    const [openModalCEdit, setOpenModalCEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState();

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetMatriculas({
        autoload: true,
        intIdEvento,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handlerOpenModalCEdit = () => {
        setOpenModalCEdit(!openModalCEdit);
    };

    const ability = useContext(AbilityContext);
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
                intIdEvento={intIdEvento}
            />

            <ModalCEdit
                handleOpenDialog={handlerOpenModalCEdit}
                open={openModalCEdit}
                intId={selectedData?.intId}
                intIdEvento={intIdEvento}
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
                        title="Matriculas"
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
                                if (ability.can("Delete", "Eventos")) {
                                    return {
                                        icon: () => (
                                            <DeleteIcon
                                                color={
                                                    rowData.btFinalizada ===
                                                    true
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
                                        disabled: rowData.btFinalizada === true,
                                    };
                                }
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
                                                <Can I="enroll" a="Eventos">
                                                    <Button
                                                        onClick={() => {
                                                            handlerOpenModalCEdit();
                                                        }}
                                                        variant="contained"
                                                    >
                                                        Matricular persona
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
        </Fragment>
    );
};

export default ReadMatriculas;
