import React, { Fragment, useContext, useState } from "react";

// Hooks
import useGetAtributos from "../../../hooks/useGetAtributos";

//Componentes de Material UI
import { Grid, Box, Button, Switch } from "@mui/material";

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
import ModalCreate from "./modalCreate";
import ModalEdit from "./modalEdit";
import ModalDelete from "./modalDelete";
import ModalState from "./modalState";
import { AbilityContext, Can } from "../../../../../common/functions/can";

const ReadSolicitudesUser = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "",
            render: (rowData) => (
                <Switch
                    checked={rowData.intIdEstado === 1 ? true : false}
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
            field: "intId",
            type: "numeric",
            width: "5%",
        },
        {
            title: "Estado",
            field: "intIdEstado",
            lookup: { 1: "Activo", 2: "En borrador", 3: "Inactivo" },
        },
        {
            title: "Nombre",
            field: "strNombre",
            type: "string",
        },
        {
            title: "Descripción",
            field: "strDescripcion",
            type: "string",
        },
        {
            title: "Fecha de creación",
            field: "dtmCreacion",
            type: "date",
        },
        {
            title: "Tipo de campo",
            field: "intIdTipoCampo",
            lookup: {
                1: "BIT",
                2: "DATE",
                3: "DATETIME",
                4: "INT",
                5: "MONEY",
                6: "VARCHAR",
            },
        },
    ]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalState, setOpenModalState] = useState(false);
    const [selectedData, setSelectedData] = useState();

    const { data, refreshGetData } = useGetAtributos({ autoLoad: true });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================

    const handlerOpenModalCreate = () => {
        setOpenModalCreate(!openModalCreate);
    };

    const handlerOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
    };

    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handlerOpenModalState = () => {
        setOpenModalState(!openModalState);
    };

    const ability = useContext(AbilityContext);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <ModalCreate
                handleOpenDialog={handlerOpenModalCreate}
                open={openModalCreate}
                data={data}
                refresh={refreshGetData}
            />

            <ModalEdit
                handleOpenDialog={handlerOpenModalEdit}
                open={openModalEdit}
                values={selectedData}
                data={data}
                refresh={refreshGetData}
            />

            <ModalDelete
                handleOpenDialog={handlerOpenModalDelete}
                open={openModalDelete}
                intId={selectedData?.intId}
                refresh={refreshGetData}
            />

            <ModalState
                handleOpenDialog={handlerOpenModalState}
                open={openModalState}
                values={selectedData}
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
                                isLoading={!data}
                                data={data || []}
                                columns={objColumns}
                                title="Lista de atributos"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: ability.can("search", "Maestros"),
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
                                    (rowData) => {
                                        if (ability.can("update", "Maestros")) {
                                            return {
                                                icon: () => (
                                                    <EditIcon
                                                        fontSize="small"
                                                        color={
                                                            rowData.intIdEstado ===
                                                                1 ||
                                                            rowData.intIdEstado ===
                                                                3
                                                                ? "gray"
                                                                : "success"
                                                        }
                                                    />
                                                ),
                                                tooltip: "Editar",
                                                onClick: (event, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalEdit();
                                                },
                                                disabled:
                                                    rowData.intIdEstado === 1 ||
                                                    rowData.intIdEstado === 3,
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("delete", "Maestros")) {
                                            return {
                                                icon: () => (
                                                    <DeleteIcon
                                                        color={
                                                            rowData.intIdEstado ===
                                                                1 ||
                                                            rowData.intIdEstado ===
                                                                3
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
                                                    rowData.intIdEstado === 1 ||
                                                    rowData.intIdEstado === 3,
                                            };
                                        }
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
                                                        <Can
                                                            I="create"
                                                            a="Maestros"
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    handlerOpenModalCreate()
                                                                }
                                                            >
                                                                Agregar atributo
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
