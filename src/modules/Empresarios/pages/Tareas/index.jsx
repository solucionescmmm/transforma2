import React, { Fragment, useState } from "react";

//Hooks
import useGetTareas from "../../hooks/useGetTareas";

//Componentes de Material UI
import { Grid, Avatar, Box, Button, Switch, Checkbox } from "@mui/material";

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
import ModalState from "./modalState";

const ReadTareas = ({ onChangeRoute, intIdIdea }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "¿Finalizado?",
            render: (rowData) => (
                <Checkbox
                    checked={rowData.btFinalizada}
                    size="small"
                    onChange={() => {
                        setSelectedData(rowData);
                        handlerOpenModalState();
                    }}
                />
            ),
            width: "5%",
        },
        {
            title: "Responsables",
            render: (rowData) => {
                let strResponsables = rowData.strResponsable.map((r) => {
                    return r.strNombre;
                });

                return <p>{strResponsables.toString()}</p>;
            },
        },
        {
            title: "Tarea",
            field: "strTarea",
            type: "string",
        },
        {
            title: "Fecha fin tentativa",
            field: "dtFechaFinTentativa",
            type: "date",
        },
    ]);

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalState, setOpenModalState] = useState(false);
    const [selectedData, setSelectedData] = useState();

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetTareas({
        autoload: true,
        intIdIdea: intIdIdea,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
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
                intIdIdea={intIdIdea}
            />

            <ModalState
                handleOpenDialog={handlerOpenModalState}
                open={openModalState}
                values={selectedData}
                intIdIdea={intIdIdea}
                refresh={refreshGetData}
            />

            <Grid container direction="row" spacing={2}>
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
                                data={data || []}
                                columns={objColumns}
                                title="Tareas"
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
                                    actionsColumnIndex: -1,
                                    paging: true,
                                    pageSizeOptions: [20, 100, 200, 500],
                                    pageSize: 20,
                                    maxBodyHeight: "520px",
                                }}
                                actions={[
                                    (rowData) => {
                                        return {
                                            icon: () => (
                                                <EditIcon
                                                    color={
                                                        rowData.btFinalizado ===
                                                        1
                                                            ? "gray"
                                                            : "success"
                                                    }
                                                    fontSize="small"
                                                    onClick={() =>
                                                        onChangeRoute(
                                                            "EditTareas",
                                                            {
                                                                intId: rowData.intId,
                                                            }
                                                        )
                                                    }
                                                />
                                            ),
                                            tooltip: "Editar",

                                            disabled:
                                                rowData.btFinalizado === 1,
                                        };
                                    },
                                    (rowData) => {
                                        return {
                                            icon: () => (
                                                <DeleteIcon
                                                    color={
                                                        rowData.btFinalizado ===
                                                        1
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
                                            disabled:
                                                rowData.btFinalizado === 1,
                                        };
                                    },
                                ]}
                                detailPanel={[
                                    {
                                        tooltip: "Observaciones",
                                        render: ({ rowData }) => {
                                            return (
                                                <p>
                                                    <span>
                                                        <b>Obeservaciones: </b>
                                                    </span>
                                                    {rowData.strObservaciones}
                                                </p>
                                            );
                                        },
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

                                            <Grid container direction="row">
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                ></Grid>

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
                                                            marginBottom:
                                                                "10px",
                                                            gap: 1,
                                                        }}
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                onChangeRoute(
                                                                    "CreateTareas"
                                                                )
                                                            }
                                                            variant="contained"
                                                        >
                                                            Agregar tarea
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

export default ReadTareas;
