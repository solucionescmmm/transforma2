import MaterialTable from "@material-table/core";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
import useGetRutas from "../../hooks/useGetRutas";

const PreviewRuta = ({ intId, intIdIdea, onChangeRoute }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const { data: values } = useGetRutas({ autoLoad: true, intIdIdea, intId });

    const [dataTable, setDataTable] = useState([]);
    const [objColumns] = useState([
        {
            title: "id",
            field: "intId",
            type: "number",
            width: "5%",
        },
        {
            title: "Nombre paquete/servicio",
            field: "strNombre",
            type: "string",
        },
        {
            title: "Fase",
            field: "intFase",
            type: "number",
        },
        {
            title: "Estado",
            field: "strEstado",
            type: "string",
        },
        {
            title: "Valor total ($)",
            field: "valorTotal",
            type: "number",
        },
        {
            title: "Duración total (h)",
            field: "intDuracion",
            type: "number",
        },
    ]);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (values?.[0]?.arrInfoFases?.length > 0) {
            const arrDataTable = [];

            for (let i = 0; i < values[0].arrInfoFases.length; i++) {
                const { arrPaquetes, arrServicios } = values[0].arrInfoFases[i];

                for (let j = 0; j < arrPaquetes.length; j++) {
                    const {
                        objPaquete,
                        ValorTotalPaquete,
                        intDuracionHorasTotalPaquete,
                    } = arrPaquetes[j];

                    const valorTotal = ValorTotalPaquete;

                    const dataTable = {
                        intId: i + 1,
                        strNombre: objPaquete.objInfoPrincipal?.strNombre,
                        strEstado: "Sin ejecutar",
                        intFase: i + 1,
                        valorTotal: new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "COP",
                        })
                            .format(valorTotal)
                            .toString(),
                        intDuracion: intDuracionHorasTotalPaquete || 0,
                    };

                    arrDataTable.push(dataTable);
                }

                for (let j = 0; j < arrServicios.length; j++) {
                    const {
                        objServicio,
                        ValorTotalServicio,
                        intDuracionHorasTotalServicio,
                    } = arrServicios[j];
                    const valorTotal = ValorTotalServicio;

                    if (typeof valorTotal === "number") {
                        const dataTable = {
                            intId: i + 1,
                            strNombre: objServicio.objInfoPrincipal?.strNombre,
                            strEstado: !arrServicios[j]?.btFinalizado ? "Sin ejecutar" : "Finalizado",
                            intFase: i + 1,
                            valorTotal: new Intl.NumberFormat("es-ES", {
                                style: "currency",
                                currency: "COP",
                            })
                                .format(valorTotal)
                                .toString(),
                            intDuracion: intDuracionHorasTotalServicio || 0,
                        };

                        arrDataTable.push(dataTable);
                    }
                }
            }

            setDataTable(arrDataTable);
        }
    }, [values]);

    return (
        <Box sx={{ padding: "10px" }}>
            <Grid container direction="row" spacing={0}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: "30px",
                            padding: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Nombre ruta:
                                </span>
                                {values?.[0]?.objInfoPrincipal?.strNombre}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>Tipo: </span>
                                {values?.[0]?.objInfoPrincipal?.strTipoRuta}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Estado:
                                </span>
                                {values?.[0]?.objInfoPrincipal?.strEstadoRuta} 
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Total fases:
                                </span>
                                {values?.[0]?.arrInfoFases?.length}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Valor total:
                                </span>
                                {values?.[0]?.objInfoPrincipal
                                    ?.valorTotalRuta &&
                                    new Intl.NumberFormat("es-ES", {
                                        style: "currency",
                                        currency: "COP",
                                    }).format(values?.[0]?.objInfoPrincipal
                                        ?.valorTotalRuta)}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Fecha creación:
                                </span>
                                {values?.[0]?.objInfoPrincipal?.dtmCreacion
                                    ? new Date(
                                          values?.[0]?.objInfoPrincipal?.dtmCreacion
                                      ).toLocaleDateString("en-EN")
                                    : ""}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Duración total:{" "}
                                </span>
                                {dataTable.length > 0 &&
                                    (() => {
                                        let intDuracion = 0;
                                        for (
                                            let i = 0;
                                            i < dataTable.length;
                                            i++
                                        ) {
                                            intDuracion +=dataTable[i].intDuracion;
                                        }

                                        return intDuracion.toString();
                                    })()}
                            </Typography>

                            <Typography>
                                <span style={{ color: "#00BAB3" }}>
                                    Responsable:
                                </span>
                                {values?.[0]?.objInfoPrincipal?.strResponsable
                                    ?.strNombre || ""}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
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
                        isLoading={dataTable.length === 0 ? true : false}
                        data={dataTable}
                        columns={objColumns}
                        title=""
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
                                backgroundColor: "#cff3f2",
                                zIndex: 1,
                            },
                            detailPanelColumnStylele: {
                                fontSize: 12,
                            },
                            actionsColumnIndex: -1,
                            paging: true,
                            pageSizeOptions: [5, 10, 100, 200, 500],
                            pageSize: 5,
                            maxBodyHeight: "520px",
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PreviewRuta;
