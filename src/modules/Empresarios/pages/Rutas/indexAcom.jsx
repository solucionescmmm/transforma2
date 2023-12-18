import React, { Fragment, useContext, useState } from "react";

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
    RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";

//Table Material UI
import MaterialTable from "@material-table/core";
import { MTableToolbar } from "@material-table/core";

//Componentes
import useGetAcomp from "../../hooks/useGetAcomp";
import { AbilityContext, Can } from "../../../../common/functions/can";

const ReadRutas = ({ onChangeRoute, intIdIdea, openModalCreate }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
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
            title: "Servicio/Paquete",
            field: "arrSesionAcompañamiento[0].strNombreServicio",
            type: "string",
        },
        {
            title: "Tipo Actividad",
            field: "arrSesionAcompañamiento[0].strTipoActividad",
            type: "string",
        },
        {
            title: "Responsable",
            field: "objInfoPrincipal.strResponsables.strNombre",
            type: "string",
        },
        {
            title: "Área",
            field: "objInfoPrincipal.arrSesionAcompañamiento.length",
            type: "string",
        },
        {
            title: "Número de sesiones",
            field: "arrSesionAcompañamiento.length",
            type: "string",
        },
    ]);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { data: dataAcomp } = useGetAcomp({
        autoload: true,
        intIdIdea: intIdIdea,
    });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================

    const ability = useContext(AbilityContext);
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Fragment>
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
                                isLoading={
                                    dataAcomp === undefined ? true : false
                                }
                                data={dataAcomp || []}
                                columns={objColumnsAcom}
                                title="Acompañamientos"
                                onRowClick={(_, rowData) => {
                                    onChangeRoute("ViewAcomp", {
                                        intIdAcompañamiento:
                                            rowData?.objInfoPrincipal?.intId,
                                        intIdIdea,
                                        ...rowData,
                                    });
                                }}
                                options={{
                                    grouping: true,
                                    title: true,
                                    filtering: false,
                                    search: ability.can("search", "Acomp"),
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
                                        // return {
                                        //     icon: () => (
                                        //         <RemoveRedEyeIcon
                                        //             color="gray"
                                        //             fontSize="small"
                                        //         />
                                        //     ),
                                        //     tooltip: "Previsualizar",
                                        //     onClick: (event, rowData) => {
                                        //         console.log(rowData)
                                        //         onChangeRoute("PreviewAcomp", {
                                        //             intIdAcompañamiento:
                                        //                 rowData
                                        //                     ?.objInfoPrincipal
                                        //                     ?.intId,
                                        //             intIdIdea,
                                        //             ...rowData,
                                        //         });
                                        //     },
                                        // };
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
                                                    sx={{
                                                        margin: "auto",
                                                    }}
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
                                                            a="Maestros"
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

export default ReadRutas;
