import React, { Fragment, useContext, useState } from "react";

//Hooks
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
import ModalCreate from "./modalCreate";
import ModalFinalizar from "./modalFinalizar";
import useGetDiagnosticosCoco from "../../hooks/useGetDiagnosticosCoco";
import { AbilityContext, Can } from "../../../../common/functions/can";

const ReadDiagnosticos = ({
    onChangeRoute,
    intIdIdea,
    openModalCreateRoute,
}) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Id del diagnostico",
            field: "intId",
            type: "string",
        },
        {
            title: "Tipo de diagnostico",
            field: "strTipoDiagnostico",
            type: "string",
        },
        {
            title: "Fecha de creación",
            field: "dtmCreacion",
            type: "date",
        },
        {
            title: "Usuario de creación",
            field: "strUsuarioCreacion",
            type: "string",
        },
        {
            title: "Estado de diagnostico",
            field: "strEstadoDiagnostico",
            type: "string",
        },
    ]);

    const [openModalCreate, setOpenModalCreate] =
        useState(openModalCreateRoute);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState();

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetDiagnosticosCoco({
        autoload: true,
        intIdIdea: intIdIdea,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    const handlerOpenModalCreate = () => {
        setOpenModalCreate(!openModalCreate);
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
                intId={selectedData?.intId}
                isEdit={selectedData}
                refresh={refreshGetData}
                intIdIdea={intIdIdea}
                values={selectedData}
            />

            <ModalFinalizar
                handleOpenDialog={handlerOpenModalDelete}
                open={openModalDelete}
                intId={selectedData?.intId}
                isEdit={selectedData}
                refresh={refreshGetData}
                values={selectedData}
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
                                data={data}
                                columns={objColumns}
                                title="Diagnósticos"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: ability.can("search", "Diag"),
                                    exportAllData: true,
                                    columnsButton: true,
                                    headerStyle: {
                                        position: "sticky",
                                        top: "0",
                                        backgroundColor: "#cff3f2",
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
                                        if (ability.can("update", "Diag")) {
                                            return {
                                                icon: () => (
                                                    <EditIcon
                                                        color={
                                                            rowData.btFinalizada ===
                                                            true
                                                                ? "gray"
                                                                : "success"
                                                        }
                                                        fontSize="small"
                                                        onClick={() => {
                                                            setSelectedData(
                                                                rowData
                                                            );
                                                            handlerOpenModalCreate();
                                                        }}
                                                    />
                                                ),
                                                tooltip: "Editar",

                                                disabled:
                                                    rowData.btFinalizada ===
                                                    true,
                                            };
                                        }
                                    },
                                    (rowData) => {
                                        if (ability.can("delete", "Diag")) {
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
                                                onClick: (_, rowData) => {
                                                    setSelectedData(rowData);
                                                    handlerOpenModalDelete();
                                                },
                                                tooltip: "Eliminar",
                                                disabled:
                                                    rowData.btFinalizada ===
                                                    true,
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
                                                        <Can
                                                            I="create"
                                                            a="Diag"
                                                        >
                                                            <Button
                                                                onClick={() =>
                                                                    handlerOpenModalCreate()
                                                                }
                                                                variant="contained"
                                                            >
                                                                Agregar
                                                                diagnóstico
                                                            </Button>
                                                        </Can>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ),
                                }}
                                onRowClick={(e, rowData) => {
                                    if (
                                        rowData.strTipoDiagnostico !== "Express"
                                    ) {
                                        onChangeRoute("Diagnosticos", {
                                            intIdDiagnostico: rowData.intId,
                                            intIdIdea,
                                        });
                                    } else {
                                        onChangeRoute("DiagnExpress", {
                                            intIdDiagnostico: rowData.intId,
                                            intIdIdea,
                                        });
                                    }
                                }}
                            />
                        </ThemeProvider>
                    </StyledEngineProvider>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ReadDiagnosticos;
