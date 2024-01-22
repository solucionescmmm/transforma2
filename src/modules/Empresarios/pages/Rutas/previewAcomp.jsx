import MaterialTable, { MTableToolbar } from "@material-table/core";
import { Box, Button, Grid, Typography } from "@mui/material";
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
    RemoveRedEye as RemoveRedEyeIcon,
    Cancel as CancelIcon,
} from "@mui/icons-material";
import useGetAcomp from "../../hooks/useGetAcomp";

const PreviewAcomp = ({ intId, intIdIdea, onChangeRoute }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const { data: values } = useGetAcomp({ autoLoad: true, intIdIdea, intId });

    const [dataValues, setDataValues] = useState();
    const [dataTable, setDataTable] = useState([]);
    const [objColumns] = useState([
        {
            title: "id",
            field: "intId",
            type: "number",
            width: "5%",
        },
        {
            title: "Tipo de acompañamiento",
            field: "objInfoPrincipal.strTipoAcompañamiento",
            type: "string",
        },
        {
            title: "Servicio",
            field: "strNombreServicio",
            type: "string",
        },
        {
            title: "Rutas",
            field: "strNombreRuta",
            type: "string",
        },
        {
            title: "Evento",
            field: "strNombreEventos",
            type: "string",
        },
        {
            title: "Fecha de creación",
            field: "dtmCreacion",
            type: "date",
        },
    ]);

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (values?.[0]?.arrSesionAcompañamiento?.length > 0) {
            //console.log(values);
            const arrDataTable = [];

            for (let i = 0; i < values[0].arrSesionAcompañamiento.length; i++) {
                const data = values[0].arrSesionAcompañamiento[i];

                arrDataTable.push({
                    ...data,
                    intId: data.intId,
                    intIdServicio: data.intIdServicio,
                    intIdRuta: data.intIdRuta,
                    intIdFase: data.intIdFase,
                    strNombreServicio: data.strNombreServicio,
                    strNombreEventos: data.strNombreEventos,
                    strNombreRuta: data.strNombreRuta,
                    dtmCreacion: data.dtmCreacion,
                    objInfoPrincipal: values[0].objInfoPrincipal,
                });
            }

            setDataValues({
                intIdServicio:
                    values[0].arrSesionAcompañamiento[0].intIdServicio,
                intIdAcompañamiento:
                    values[0].arrSesionAcompañamiento[0].intIdAcompañamiento,
                intIdRuta: values[0].arrSesionAcompañamiento[0].intIdRuta,
                intIdFase: values[0].arrSesionAcompañamiento[0].intIdFase,
                strTipoAcompañamiento:
                    values[0].objInfoPrincipal.strTipoAcompañamiento,
                strUbicacion: values[0].objInfoPrincipal.strUbicacion,
                btFinalizado: values[0].objInfoPrincipal.btFinalizado,
                strResponsables:
                    values[0].objInfoPrincipal.strResponsables.strNombre,
                dtmCreacion: values[0].objInfoPrincipal.dtmCreacion,
            });

            setDataTable(arrDataTable);
        }
    }, [values]);

    return (
        <Box sx={{ padding: "10px" }}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography>
                            <span style={{ color: "#52bab3" }}>
                                Tipo de acompañamiento:{" "}
                            </span>{" "}
                            {dataValues?.strTipoAcompañamiento}
                        </Typography>

                        <Typography>
                            <span style={{ color: "#52bab3" }}>
                                Ubicación:{" "}
                            </span>{" "}
                            {dataValues?.strUbicacion}
                        </Typography>

                        <Typography>
                            <span style={{ color: "#52bab3" }}>
                                Responsable:{" "}
                            </span>{" "}
                            {dataValues?.strResponsables}
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} style={{ width: "80vw" }}>
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
                                backgroundColor: "#cff3f2",
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
                        actions={[
                            (rowData) => {
                                if (rowData?.btFinalizado) {
                                    return {
                                        icon: () => (
                                            <RemoveRedEyeIcon
                                                color="gray"
                                                fontSize="small"
                                            />
                                        ),
                                        tooltip: "Previsualizar",
                                        onClick: (event, rowData) => {
                                            console.log(rowData)
                                            onChangeRoute("PreviewSesion", {
                                                intIdAcompañamiento:
                                                    rowData
                                                        ?.objInfoPrincipal
                                                        ?.intId,
                                                intIdIdea,
                                                ...rowData,
                                            });
                                        },
                                    };
                                }else{
                                    return {
                                        icon: () => (
                                            <EditIcon
                                                color="success"
                                                fontSize="small"
                                            />
                                        ),
                                        tooltip: "Editar",
                                        onClick: (event, rowData) => {
                                            console.log(rowData)
                                            onChangeRoute("EditSesion", {
                                                intIdAcompañamiento:
                                                    rowData
                                                        ?.objInfoPrincipal
                                                        ?.intId,
                                                intIdIdea,
                                                ...rowData,
                                            });
                                        },
                                    };
                                }
                            },
                            (rowData) => {
                                if (!rowData?.btFinalizado) {
                                    return {
                                        icon: () => (
                                            <CancelIcon
                                                color="error"
                                                fontSize="small"
                                            />
                                        ),
                                        tooltip: "Finalizar",
                                        onClick: (event, rowData) => {
                                            console.log(rowData)
                                        },
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
                                        <Grid item xs={12} md={6}></Grid>

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
                                                    marginBottom: "10px",
                                                    gap: 1,
                                                }}
                                            >
                                                <Button
                                                    onClick={() =>
                                                        onChangeRoute(
                                                            "CreateSesion",
                                                            {
                                                                intIdIdea,
                                                                intId,
                                                                ...dataValues,
                                                            }
                                                        )
                                                    }
                                                    disabled={dataValues?.btFinalizado}
                                                    variant="contained"
                                                >
                                                    Agregar sesión
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </div>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PreviewAcomp;
