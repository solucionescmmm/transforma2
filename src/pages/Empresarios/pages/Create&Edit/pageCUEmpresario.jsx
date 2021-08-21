import React, { useState } from "react";

//Librerias
import { Link as RouterLink, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

//Componentes de Material UI
import {
    Typography,
    Grid,
    Paper,
    Breadcrumbs,
    Link,
    IconButton,
    Tooltip,
    SvgIcon,
    LinearProgress,
} from "@material-ui/core";

import { LoadingButton } from "@material-ui/lab";

//Iconos
import { Home as HomeIcon } from "@material-ui/icons";

//Estilos
import { makeStyles } from "@material-ui/styles";
import { Box } from "@material-ui/system";

//Componentes
import InfoPrincipal from "./infoPrincipal";
import InfoEmpresarioPr from "./infoEmpresarioPr";
import InfoEmpresarioSec from "./infoEmpresarioSec";
import InfoEmprendimiento from "./infoEmprendimiento";

const styles = makeStyles((theme) => ({
    paper: {
        position: "relative",
        borderRadius: "7px",
    },
    linearProgress: {
        position: "absolute",
        width: "100%",
        borderRadius: "10px 10px 0 0",
        padding: 0,
    },
    container: {
        position: "relative",
        display: "flex",
        width: "inherit",
        height: "70vh",
    },
    item: {
        flex: 1,
        position: "relative",
    },
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const CUEmpresario = ({ isEdit }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: {
            intIdEspacioJornada: "",
            intIdEstado: "",
            intIdSede: "",
            intIdTipoEmpresario: "",
            dtFechaVinculacion: null,
        },
        objInfoEmpresarioPr: {
            strNombres: "",
            strApellidos: "",
            intIdTipoDocto: "",
            strNroDocto: "",
            strLugarExpedicionDocto: "",
            dtFechaExpedicionDocto: null,
            dtFechaNacimiento: null,
            intIdSexo: null,
            strCelular: "",
            strCorreoElectronico: "",
            intIdNivelEducativo: "",
            intIdCondicionDiscapacidad: "",
            strTitulos: "",
            fileFoto: "",
        },
        arrInfoEmpresarioSec: [],
    });

    const [success, setSucces] = useState(false);

    const [loading, setLoading] = useState(false);

    const [flagSubmit, setFlagSubmit] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const {
        control,
        formState: { errors },
        getValues,
        handleSubmit,
        reset,
        setError,
        setValue,
    } = useForm({ mode: "onChange" });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (success) {
        return <Redirect to="/transforma/asesor/empresario/read/all" />;
    }

    return (
        <Grid container direction="row" spacing={3}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        color="inherit"
                        component={RouterLink}
                        to="/transforma"
                        className={classes.link}
                    >
                        <HomeIcon className={classes.icon} />
                        Inicio
                    </Link>

                    <Link
                        color="inherit"
                        component={RouterLink}
                        to="/transforma/asesor/empresarios"
                        className={classes.link}
                    >
                        Empresarios
                    </Link>

                    <Typography color="textPrimary" className={classes.link}>
                        {isEdit ? "Edición" : "Registro"}
                    </Typography>
                </Breadcrumbs>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {loading ? (
                        <LinearProgress className={classes.linearProgress} />
                    ) : null}

                    <Grid
                        container
                        direction="row"
                        spacing={2}
                        style={{ padding: "25px" }}
                    >
                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                    }}
                                >
                                    <Typography
                                        align="center"
                                        style={{ fontWeight: "bold" }}
                                    >
                                        {isEdit
                                            ? "Editar Empresario"
                                            : "Registrar Empresario"}
                                    </Typography>
                                </Box>

                                <Box>
                                    <IconButton color="secondary">
                                        <Tooltip title="Importar información">
                                            <SvgIcon>
                                                <path
                                                    id="icons8_microsoft_excel"
                                                    d="M14.5,3,2,5.556V23.444L14.5,26ZM17,5.556V8.111h2.5v2.556H17v2.556h2.5v2.556H17v2.556h2.5v2.556H17v2.556h8.75A1.265,1.265,0,0,0,27,22.167V6.833a1.265,1.265,0,0,0-1.25-1.278Zm5,2.556h2.5v2.556H22ZM4.72,9.768H6.941L8.1,12.6a5.7,5.7,0,0,1,.237.8h.032a8.475,8.475,0,0,1,.251-.826L9.9,9.768h2.026L9.51,14.458,12,19.232H9.839L8.448,16.147a2.67,2.67,0,0,1-.166-.631h-.02c-.031.146-.094.364-.188.656l-1.4,3.06H4.5L7.076,14.5ZM22,13.222h2.5v2.556H22Zm0,5.111h2.5v2.556H22Z"
                                                    transform="translate(-2 -3)"
                                                />
                                            </SvgIcon>
                                        </Tooltip>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="caption">
                                Todos los campos marcados con (*) son obligatorios.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <InfoPrincipal
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmpresarioPr
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmpresarioSec
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <InfoEmprendimiento
                                control={control}
                                disabled={loading}
                                errors={errors}
                                setValue={setValue}
                                setError={setError}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                }}
                            >
                                <LoadingButton
                                    variant="contained"
                                    type="submit"
                                    loading={loading}
                                >
                                    {isEdit ? "guardar" : "registrar"}
                                </LoadingButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default CUEmpresario;
