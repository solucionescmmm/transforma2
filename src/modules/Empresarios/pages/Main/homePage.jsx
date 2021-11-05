import React, { useState, useEffect, Fragment } from "react";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

//Librerias
import { Link as RouterLink, useParams } from "react-router-dom";

//Componentes de Material UI
import { Grid, Breadcrumbs, Button, Link, Typography, Box, Avatar } from "@mui/material";

//Iconos
import { Home as HomeIcon } from "@mui/icons-material";

//Componentes
import ErrorPage from "../../../../common/components/Error";
import Loader from "../../../../common/components/Loader";

//Estilos
import { makeStyles } from "@mui/styles";

//Componentes
import ModalDeleteEmpresario from "../../components/modalDeleteEmpresario";
import TabsRoutes from "./tabs.routes";

const styles = makeStyles((theme) => ({
    link: {
        display: "flex",
        alignItems: "center",
    },
    icon: {
        marginRight: theme.spacing(0.5),
    },
}));

const DetailsEmpresario = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loading, setLoading] = useState(true);

    const [objInteresado, setObjInteresado] = useState({
        objEmpresario: {},
        arrEmpresarioSecundario: [],
    });

    const [openModalDelete, setOpenModalDelete] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();
    const { data } = useGetEmpresarios({ autoload: true, intId });

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const classes = styles();

    const handlerChangeOpenModalDelete = () => {
        setOpenModalDelete(!openModalDelete);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoading(true);

        if (data && data.length > 0) {
            setObjInteresado(data[0]);

            setLoading(false);
        }
    }, [data]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loading) {
        return <Loader />;
    }

    if (!data) {
        return <Loader />;
    }

    if (data.error) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor contacta con soporte técnico para más información."
                title={data.msg}
            />
        );
    }

    return (
        <Fragment>
            <ModalDeleteEmpresario
                open={openModalDelete}
                handleOpenDialog={handlerChangeOpenModalDelete}
                intId={intId}
            />

            <Grid container direction="row" spacing={2}>
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
                            to="/transforma/asesor/empresario/read/all"
                            className={classes.link}
                        >
                            Empresarios
                        </Link>

                        <Typography color="textPrimary">{`${objInteresado.objEmpresario.strNombres} ${objInteresado.objEmpresario.strApellidos}`}</Typography>
                    </Breadcrumbs>
                </Grid>

                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{ width: 120, height: 120, marginRight: "15px" }}
                            alt={`${objInteresado.objEmpresario.strNombres} ${objInteresado.objEmpresario.strApellidos}`}
                            src={`${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${objInteresado.objEmpresario.strUrlFoto}`}
                        />

                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>
                                {`${objInteresado.objEmpresario.strNombres} ${objInteresado.objEmpresario.strApellidos}`}
                            </Typography>

                            <Typography
                                sx={{
                                    textTransform: "uppercase",
                                    color:
                                        objInteresado.objEmpresario
                                            .strEstadoVinculacion === "Activo"
                                            ? "#00BAB3"
                                            : "inherit",
                                }}
                            >
                                {`${objInteresado.objEmpresario.strEstadoVinculacion}`}
                            </Typography>
                        </Box>

                        <Box>
                            <Button
                                component={RouterLink}
                                to={`/transforma/asesor/empresario/edit/${intId}`}
                            >
                                Editar
                            </Button>

                            <Button
                                color="error"
                                onClick={() => handlerChangeOpenModalDelete()}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <TabsRoutes intId={intId} values={objInteresado} />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default DetailsEmpresario;
