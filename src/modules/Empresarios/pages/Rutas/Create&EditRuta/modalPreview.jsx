import React from "react";
import { useState } from "react";
import { useEffect } from "react";

//Componentes de Material UI
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    Button,
    useTheme,
    useMediaQuery,
    Grid,
} from "@mui/material";

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
import MaterialTable from "@material-table/core";

const ModalPreview = ({ handleOpenDialog, open, values }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [dataTable, setDataTable] = useState([]);
    const [objColumns] = useState([
        {
            title: "id",
            field: "id",
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
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const theme = useTheme();
    const bitMobile = useMediaQuery(theme.breakpoints.down("sm"));

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (values?.arrInfoFases?.length > 0) {
            const arrDataTable = [];

            for (let i = 0; i < values.arrInfoFases.length; i++) {
                const { arrPaquetes, arrServicios } = values.arrInfoFases[i];

                for (let j = 0; j < arrPaquetes.length; j++) {
                    const { objPaquete, objSedeTarifa } = arrPaquetes[j];

                    const valorTotal = objSedeTarifa.Valor;

                    const dataTable = {
                        id: i + 1,
                        strNombre: objPaquete.objInfoPrincipal?.strNombre,
                        strEstado: "Sin ejecutar",
                        intFase: i + 1,
                        valorTotal: new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "COP",
                        })
                            .format(valorTotal)
                            .toString(),
                        intDuracion: "",
                    };

                    arrDataTable.push(dataTable);
                }

                for (let j = 0; j < arrServicios.length; j++) {
                    const { objServicio, objSedeTarifa } = arrServicios[j];
                    const valorTotal = objSedeTarifa.Valor;

                    const dataTable = {
                        id: i + 1,
                        strNombre: objServicio.objInfoPrincipal?.strNombre,
                        strEstado: "Sin ejecutar",
                        intFase: i + 1,
                        valorTotal: new Intl.NumberFormat("es-ES", {
                            style: "currency",
                            currency: "COP",
                        })
                            .format(valorTotal)
                            .toString(),
                        intDuracion: "",
                    };

                    arrDataTable.push(dataTable);
                }
            }

            setDataTable(arrDataTable);
        }
    }, [values]);
    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    return (
        <Dialog
            fullScreen={bitMobile}
            open={open}
            onClose={handleOpenDialog}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle>Vista previa</DialogTitle>

            <DialogContent>
                <Grid container direction="row">
                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>
                                Nombre ruta:
                            </span>
                            {values?.objInfoPrincipal?.strNombre}
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>Tipo:</span>
                            Planeada
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>Estado:</span>
                            Sin ejecutar
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>
                                Total fases:
                            </span>
                            {values?.arrInfoFases?.length}
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>
                                Valor Total:
                            </span>
                            {values?.valorTotalRuta
                                ? new Intl.NumberFormat("es-ES", {
                                      style: "currency",
                                      currency: "COP",
                                  }).format(values?.valorTotalRuta)
                                : values?.objInfoPrincipal?.valorTotalRuta
                                ? new Intl.NumberFormat("es-ES", {
                                      style: "currency",
                                      currency: "COP",
                                  }).format(
                                      values?.objInfoPrincipal?.valorTotalRuta
                                  )
                                : ""}
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>
                                Fecha creación:
                            </span>
                            {values?.objInfoPrincipal?.dtmCreacion ||
                                new Date().toLocaleDateString("en-US")}
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>
                                Duración total:
                            </span>
                        </p>
                    </Grid>

                    <Grid item xs={6}>
                        <p>
                            <span style={{ color: "#11BEB8" }}>
                                Responsable
                            </span>{" "}
                            {values?.objInfoPrincipal?.strResponsable
                                ?.strNombre || ""}
                        </p>
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
                                    labelDisplayedRows:
                                        "{from}-{to} de {count}",
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
                            title="Paquetes/Servicios"
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
                                pageSizeOptions: [5, 10, 100, 200, 500],
                                pageSize: 5,
                                maxBodyHeight: "520px",
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => handleOpenDialog()}
                    color="inherit"
                    type="button"
                >
                    cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalPreview;
