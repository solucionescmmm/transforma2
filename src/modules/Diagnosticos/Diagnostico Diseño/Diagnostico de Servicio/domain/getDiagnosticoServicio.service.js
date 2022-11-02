//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoServicio");
const validator = require("validator").default;

const getDiagnosticoServicio = async (objParams, strDataUser) => {
    let { intId, intIdDiagnostico } = objParams;

    if (!intId && !intIdDiagnostico) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceDAODiagnostico();
    let query = {
        intId,
        intIdDiagnostico,
    };

    let intIdEmpresarioDiagnostico = await dao.getIntIdEmpresario(query)

    let arrayData = await dao.getDiagnosticoServicio(query);
    let arrayResultServicios = await dao.getResultDiagnosticoServicio(intIdEmpresarioDiagnostico.data)

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let arrayServicios = arrayResultServicios.data

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico:array[i]?.intIdDiagnostico,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                };
                let objInfoEvaluacion = {
                    strServicio: array[i]?.strServicio,
                    strHerramientasServicio: array[i]?.strHerramientasServicio,
                    strObjetivoProposito: array[i]?.strObjetivoProposito,
                    strObjetivoPropositoDetalle:
                        array[i]?.strObjetivoPropositoDetalle,
                    strObjetivoPropositoNivel:
                        array[i]?.strObjetivoPropositoNivel,
                    strRenovacionPortafolio: array[i]?.strRenovacionPortafolio,
                    strRenovacionPortafolioDetalle:
                        array[i]?.strRenovacionPortafolioDetalle,
                    strRenovacionPortafolioNivel:
                        array[i]?.strRenovacionPortafolioNivel,
                    strProcesoInteraccion: array[i]?.strProcesoInteraccion,
                    strProcesoInteraccionDetalle:
                        array[i]?.strProcesoInteraccionDetalle,
                    strProcesoInteraccionNivel:
                        array[i]?.strProcesoInteraccionNivel,
                    strPuntosContacto: array[i]?.strPuntosContacto,
                    strPuntosContactoDetalle:
                        array[i]?.strPuntosContactoDetalle,
                    strPuntosContactoNivel: array[i]?.strPuntosContactoNivel,
                    strExperienciaDiseñada: array[i]?.strExperienciaDiseñada,
                    strExperienciaDiseñadaDetalle:
                        array[i]?.strExperienciaDiseñadaDetalle,
                    strExperienciaDiseñadaNivel:
                        array[i]?.strExperienciaDiseñadaNivel,
                    strRecursosServicio: array[i]?.strRecursosServicio,
                    strRecursosServicioDetalle:
                        array[i]?.strRecursosServicioDetalle,
                    strRecursosServicioNivel:
                        array[i]?.strRecursosServicioNivel,
                    strPostVenta: array[i]?.strPostVenta,
                    strPostVentaDetalle: array[i]?.strPostVentaDetalle,
                    strPostVentaNivel: array[i]?.strPostVentaNivel,
                    strLineaGrafica: array[i]?.strLineaGrafica,
                    strLineaGraficaDetalle: array[i]?.strLineaGraficaDetalle,
                    strLineaGraficaNivel: array[i]?.strLineaGraficaNivel,
                    strIdentidadMarca: array[i]?.strIdentidadMarca,
                    strIdentidadMarcaDetalle:
                        array[i]?.strIdentidadMarcaDetalle,
                    strIdentidadMarcaNivel: array[i]?.strIdentidadMarcaNivel,
                    strComunicacionMarca: array[i]?.strComunicacionMarca,
                    strComunicacionMarcaDetalle:
                        array[i]?.strComunicacionMarcaDetalle,
                    strComunicacionMarcaNivel:
                        array[i]?.strComunicacionMarcaNivel,
                };
                let objInfoNormatividad = {
                    strPermisoFuncionamiento:
                        array[i]?.strPermisoFuncionamiento,
                    strCertificadosRequeridos:
                        array[i]?.strCertificadosRequeridos,
                    strCertificadosActuales: array[i]?.strCertificadosActuales,
                    strRegistroMarca: array[i]?.strRegistroMarca,
                    strPatentesUtilidad: array[i]?.strPatentesUtilidad,
                    strCualPatenteUtilidad: array[i]?.strCualPatenteUtilidad,
                };
                let objInfoAdicional = {
                    strConclusiones: array[i]?.strConclusiones,
                    strURLSFotos: array[i]?.strURLSFotos,
                };

                let objResultServicio =arrayServicios    

                data[i] = {
                    objInfoGeneral,
                    objInfoEvaluacion,
                    objInfoNormatividad,
                    objInfoAdicional,
                    objResultServicio
                };
            }
            let result = {
                error: false,
                data,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getDiagnosticoServicio;
