import React, { Fragment, useContext, useState } from "react";

//Hooks
import useGetDocumentos from "../../hooks/useGetDocumentos";

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
import { AbilityContext, Can } from "../../../../common/functions/can";
import ModalDelete from "./modalDelete";

const ReadDocumentos = ({ onChangeRoute, intIdIdea, openModalCreateRoute }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumns] = useState([
        {
            title: "Nombre",
            field: "strNombre",
            type: "string",
        },
        {
            title: "Observaciones",
            field: "strObservaciones",
            type: "string",
        },
        {
            title: "Url documento",
            field: "strUrlDocumento",
            render: (rowdata) => {
                return (
                    <a
                        href={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${rowdata.strUrlDocumento}`}
                        alt=""
                        target="_blank"
                        rel="noreferrer"
                    >
                        Abrir
                    </a>
                );
            },
        },
    ]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [selectedData, setSelectedData] = useState();

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data, refreshGetData } = useGetDocumentos({
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
            <ModalDelete
                handleOpenDialog={handlerOpenModalDelete}
                open={openModalDelete}
                intId={selectedData?.intId}
                refresh={refreshGetData}
                intIdIdea={intIdIdea}
                values={selectedData}
            />

            <ModalCreate
                handleOpenDialog={handlerOpenModalCreate}
                open={openModalCreate}
                intId={selectedData?.intId}
                isEdit={isEdit}
                refresh={refreshGetData}
                intIdIdea={intIdIdea}
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
                                title="Documentos"
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: ability.can("search", "Docum"),
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
                                    actionsColumnIndex: -1,
                                    paging: true,
                                    pageSizeOptions: [20, 100, 200, 500],
                                    pageSize: 20,
                                    maxBodyHeight: "520px",
                                }}
                                actions={[
                                    (rowData) => {
                                        if (ability.can("update", "Docum")) {
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
                                                            setIsEdit(true);
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
                                        if (ability.can("delete", "Docum")) {
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
                                                            a="Docum"
                                                        >
                                                            <Button
                                                                onClick={() => {
                                                                    setIsEdit(
                                                                        false
                                                                    );
                                                                    handlerOpenModalCreate();
                                                                }}
                                                                variant="contained"
                                                            >
                                                                Agregar
                                                                documento
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

export default ReadDocumentos;
