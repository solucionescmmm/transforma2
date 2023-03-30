import React, { Fragment, useState } from "react";

//Hooks
import useGetRutas from "../../hooks/useGetRutas";

//Componentes de Material UI
import { Grid, Box, Button, Tab } from "@mui/material";

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
    RemoveRedEye as RemoveRedEyeIcon,
    PictureAsPdf as PictureAsPdfIcon,
    PlayCircle as PlayCircleIcon,
    MarkEmailRead as MarkEmailReadIcon,
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";

//Componentes
import ModalDelete from "./modalDelete";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ModalPDF from "./components/modalPDF";
import ModalActiveRuta from "./components/modalActiveRuta";
import ModalSendRuta from "./components/modalSendRuta";
import useGetAcomp from "../../hooks/useGetAcomp";

const ReadRutas = ({ onChangeRoute, intIdIdea, openModalCreate }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [objColumnsRutas] = useState([
        {
            title: "Estado",
            field: "objInfoPrincipal.strEstadoRuta",
            width: "5%",
        },
        {
            title: "Nombre",
            field: "objInfoPrincipal.strNombre",
            type: "string",
        },
        {
            title: "Valor Total",
            field: "objInfoPrincipal.valorTotalRuta",
            type: "string",
        },
        {
            title: "Total Fases",
            render: (rowData) => {
                let intFases = rowData.arrInfoFases?.length;

                return <p>{intFases?.toString()}</p>;
            },
        },
        {
            title: "Fecha Creación",
            field: "objInfoPrincipal.dtmCreacion",
            type: "date",
        },
        {
            title: "Responsable",
            render: (rowData) => {
                let strResponsables = rowData?.objInfoPrincipal?.strResponsable;

                return <p>{strResponsables?.strNombre}</p>;
            },
        },
    ]);

    const [objColumnsAcom] = useState([
        {
            title: "Tipo de Acompañamiento",
            field: "objInfoPrincipal.strTipoAcompañamiento",
            width: "5%",
        },
        {
            title: "Fecha Creación",
            field: "objInfoPrincipal.dtmCreacion",
            type: "date",
        },
        {
            title: "Lugar",
            field: "objInfoPrincipal.strUbicacion",
            type: "string",
        },
        {
            title: "Responsable",
            field: "objInfoPrincipal.strUsuarioCreacion",
            type: "string",
        },
    ]);

    const [openModalDeleteRuta, setopenModalDeleteRuta] = useState(false);
    const [openModalPDF, setopenModalPDF] = useState(false);
    const [openModalActiveRuta, setopenModalActiveRuta] = useState(false);
    const [openModalSendRutas, setopenModalSendRuta] = useState(false);
    const [selectedDataRuta, setselectedDataRuta] = useState();
    const [valueTab, setValueTab] = useState(1);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data: dataRutas, refreshGetData: refreshGetDataRutas } =
        useGetRutas({
            autoload: true,
            intIdIdea: intIdIdea,
        });

    const { data: dataAcomp } = useGetAcomp({
        autoload: true,
        intIdIdea: intIdIdea,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handleropenModalDeleteRuta = () => {
        setopenModalDeleteRuta(!openModalDeleteRuta);
    };

    const handleropenModalPDF = () => {
        setopenModalPDF(!openModalPDF);
    };

    const handleropenModalActiveRuta = () => {
        setopenModalActiveRuta(!openModalActiveRuta);
    };

    const handleropenModalSendRuta = () => {
        setopenModalSendRuta(!openModalSendRutas);
    };

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
            <ModalDelete
                handleOpenDialog={handleropenModalDeleteRuta}
                open={openModalDeleteRuta}
                intId={selectedDataRuta?.objInfoPrincipal?.intId}
                refresh={refreshGetDataRutas}
                intIdIdea={intIdIdea}
            />

            <ModalPDF
                handleOpenDialog={handleropenModalPDF}
                open={openModalPDF}
                values={selectedDataRuta}
                intIdIdea={intIdIdea}
            />

            <ModalActiveRuta
                handleOpenDialog={handleropenModalActiveRuta}
                open={openModalActiveRuta}
                values={selectedDataRuta}
                refresh={refreshGetDataRutas}
                intId={selectedDataRuta?.objInfoPrincipal?.intId}
                intIdIdea={intIdIdea}
            />

            <ModalSendRuta
                handleOpenDialog={handleropenModalSendRuta}
                open={openModalSendRutas}
                values={selectedDataRuta}
                refresh={refreshGetDataRutas}
                intId={selectedDataRuta?.objInfoPrincipal?.intId}
                intIdIdea={intIdIdea}
            />

            <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={(_, value) => setValueTab(value)}
                        aria-label="menu"
                    >
                        <Tab label="Rutas" value={1} />
                        <Tab label="Acompañamientos" value={2} />
                    </TabList>
                </Box>
                <TabPanel value={1} sx={{ width: "100%" }}>
                    <Grid container direction="row">
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
                                                previousTooltip:
                                                    "Página anterior",
                                                nextTooltip: "Siguiente página",
                                                lastTooltip: "Última página",
                                                labelRowsPerPage:
                                                    "Filas por página:",
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
                                                groupedBy:
                                                    "Datos agrupados por: ",
                                            },
                                        }}
                                        isLoading={
                                            dataRutas === undefined
                                                ? true
                                                : false
                                        }
                                        data={dataRutas || []}
                                        columns={objColumnsRutas}
                                        title="Rutas"
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
                                            pageSizeOptions: [
                                                20, 100, 200, 500,
                                            ],
                                            pageSize: 20,
                                            maxBodyHeight: "520px",
                                        }}
                                        actions={[
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <EditIcon
                                                            color={
                                                                rowData
                                                                    .objInfoPrincipal
                                                                    ?.strEstadoRuta ===
                                                                "Aceptada/En Proceso"
                                                                    ? "gray"
                                                                    : "success"
                                                            }
                                                            fontSize="small"
                                                            onClick={() =>
                                                                onChangeRoute(
                                                                    "EditRuta",
                                                                    {
                                                                        intId: rowData
                                                                            ?.objInfoPrincipal
                                                                            ?.intId,
                                                                        intIdIdea,
                                                                        ...rowData,
                                                                    }
                                                                )
                                                            }
                                                        />
                                                    ),
                                                    tooltip: "Editar",
                                                    disabled:
                                                        rowData.objInfoPrincipal
                                                            ?.strEstadoRuta ===
                                                        "Aceptada/En Proceso",
                                                };
                                            },
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <PictureAsPdfIcon
                                                            htmlColor={
                                                                rowData.btFinalizada ===
                                                                true
                                                                    ? "gray"
                                                                    : "#ff6d07"
                                                            }
                                                            fontSize="small"
                                                        />
                                                    ),
                                                    onClick: (
                                                        event,
                                                        rowData
                                                    ) => {
                                                        setselectedDataRuta(
                                                            rowData
                                                        );
                                                        handleropenModalPDF();
                                                    },
                                                    tooltip: "Generar PDF",
                                                    disabled:
                                                        rowData.btFinalizada ===
                                                        true,
                                                };
                                            },
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <DeleteIcon
                                                            color={
                                                                rowData
                                                                    .objInfoPrincipal
                                                                    ?.strEstadoRuta ===
                                                                    "Aceptada/En Proceso" ||
                                                                rowData
                                                                    .objInfoPrincipal
                                                                    ?.strEstadoRuta ===
                                                                    "Enviada"
                                                                    ? "gray"
                                                                    : "error"
                                                            }
                                                            fontSize="small"
                                                        />
                                                    ),
                                                    onClick: (
                                                        event,
                                                        rowData
                                                    ) => {
                                                        setselectedDataRuta(
                                                            rowData
                                                        );
                                                        handleropenModalDeleteRuta();
                                                    },
                                                    tooltip: "Eliminar",
                                                    disabled:
                                                        rowData.objInfoPrincipal
                                                            ?.strEstadoRuta ===
                                                            "Aceptada/En Proceso" ||
                                                        rowData.objInfoPrincipal
                                                            ?.strEstadoRuta ===
                                                            "Enviada",
                                                };
                                            },
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <RemoveRedEyeIcon
                                                            color="gray"
                                                            fontSize="small"
                                                        />
                                                    ),
                                                    tooltip: "Previsualizar",
                                                    onClick: (
                                                        event,
                                                        rowData
                                                    ) => {
                                                        onChangeRoute(
                                                            "ViewRuta",
                                                            {
                                                                intId: rowData
                                                                    ?.objInfoPrincipal
                                                                    ?.intId,
                                                                intIdIdea,
                                                                ...rowData,
                                                            }
                                                        );
                                                    },
                                                };
                                            },
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <PlayCircleIcon
                                                            color={
                                                                rowData
                                                                    .objInfoPrincipal
                                                                    ?.strEstadoRuta ===
                                                                "Aceptada/En Proceso"
                                                                    ? "gray"
                                                                    : "success"
                                                            }
                                                            fontSize="small"
                                                        />
                                                    ),
                                                    tooltip:
                                                        "Aceptada/En Procesor",
                                                    disabled:
                                                        rowData.objInfoPrincipal
                                                            ?.strEstadoRuta ===
                                                        "Aceptada/En Proceso",
                                                    onClick: (
                                                        event,
                                                        rowData
                                                    ) => {
                                                        setselectedDataRuta(
                                                            rowData
                                                        );
                                                        handleropenModalActiveRuta();
                                                    },
                                                };
                                            },
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <MarkEmailReadIcon
                                                            htmlColor={
                                                                rowData
                                                                    .objInfoPrincipal
                                                                    ?.strEstadoRuta ===
                                                                    "Aceptada/En Proceso" ||
                                                                rowData
                                                                    .objInfoPrincipal
                                                                    ?.strEstadoRuta ===
                                                                    "Enviada"
                                                                    ? "gray"
                                                                    : "#571845"
                                                            }
                                                            fontSize="small"
                                                        />
                                                    ),
                                                    tooltip: "Pasar a enviada",
                                                    disabled:
                                                        rowData.objInfoPrincipal
                                                            ?.strEstadoRuta ===
                                                            "Aceptada/En Proceso" ||
                                                        rowData.objInfoPrincipal
                                                            ?.strEstadoRuta ===
                                                            "Enviada",
                                                    onClick: (
                                                        event,
                                                        rowData
                                                    ) => {
                                                        setselectedDataRuta(
                                                            rowData
                                                        );
                                                        handleropenModalSendRuta();
                                                    },
                                                };
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

                                                    <Grid
                                                        container
                                                        direction="row"
                                                    >
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                        ></Grid>

                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                            sx={{
                                                                margin: "auto",
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
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
                                                                            "CreateRutas",
                                                                            {
                                                                                intIdIdea,
                                                                            }
                                                                        )
                                                                    }
                                                                    variant="contained"
                                                                >
                                                                    Agregar ruta
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
                </TabPanel>
                <TabPanel value={2} sx={{ width: "100%" }}>
                    <Grid container direction="row">
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
                                                previousTooltip:
                                                    "Página anterior",
                                                nextTooltip: "Siguiente página",
                                                lastTooltip: "Última página",
                                                labelRowsPerPage:
                                                    "Filas por página:",
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
                                                groupedBy:
                                                    "Datos agrupados por: ",
                                            },
                                        }}
                                        isLoading={
                                            dataAcomp === undefined
                                                ? true
                                                : false
                                        }
                                        data={dataAcomp || []}
                                        columns={objColumnsAcom}
                                        title="Acompañamientos"
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
                                            pageSizeOptions: [
                                                20, 100, 200, 500,
                                            ],
                                            pageSize: 20,
                                            maxBodyHeight: "520px",
                                        }}
                                        actions={[
                                            (rowData) => {
                                                return {
                                                    icon: () => (
                                                        <RemoveRedEyeIcon
                                                            color="gray"
                                                            fontSize="small"
                                                        />
                                                    ),
                                                    tooltip: "Previsualizar",
                                                    onClick: (
                                                        event,
                                                        rowData
                                                    ) => {
                                                        onChangeRoute(
                                                            "ViewAcomp",
                                                            {
                                                                intIdAcompañamiento: rowData
                                                                    ?.objInfoPrincipal
                                                                    ?.intId,
                                                                intIdIdea,

                                                                ...rowData,
                                                            }
                                                        );
                                                    },
                                                };
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

                                                    <Grid
                                                        container
                                                        direction="row"
                                                    >
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                        ></Grid>

                                                        <Grid
                                                            item
                                                            xs={12}
                                                            md={6}
                                                            sx={{
                                                                margin: "auto",
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
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
                                                                            "CreateAcomp",
                                                                            {
                                                                                intIdIdea,
                                                                            }
                                                                        )
                                                                    }
                                                                    variant="contained"
                                                                >
                                                                    Agregar
                                                                    acompañamiento
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
                </TabPanel>
            </TabContext>
        </Fragment>
    );
};

export default ReadRutas;
