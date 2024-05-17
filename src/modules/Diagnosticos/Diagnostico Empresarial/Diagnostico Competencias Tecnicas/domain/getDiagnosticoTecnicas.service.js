//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoTecnicas");
const validator = require("validator").default;

//service
const serviceGetEmpresario = require("../../../../Empresarios/domian/getEmpresario.service")
const serviceGetUsuario = require("../../../../Usuarios/domain/getUsuarios.service")

const getDiagnosticoTecnicas = async (objParams, strDataUser) => {
    let { intId, intIdDiagnostico } = objParams;

    if (!intIdDiagnostico) {
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

    let queryGetUsuarios = await serviceGetUsuario({
        strApp: "Transforma",
    })

    if (queryGetUsuarios.error) {
        throw new Error(queryGetUsuarios.msg)
    }

    const dataUsuario = queryGetUsuarios.data

    let dao = new classInterfaceDAODiagnostico();
    let query = {
        intId,
        intIdDiagnostico
    };

    let arrayData = await dao.getDiagnosticoTecnicas(query);
    let arrDataNiveles = await dao.getDiagnosticoTecnicasNivel(query)
    let arrayResultTecnicas = await dao.getResultDiagnosticoTecnicas(query)
  
    if (!arrayData.error && arrayData.data && !arrDataNiveles.error && arrDataNiveles.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let arrayTecnicas = arrayResultTecnicas.data

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let queryGetEmpresario = await serviceGetEmpresario({ intId: array[i]?.intIdEmpresario }, strDataUser)
                if (queryGetEmpresario.error) {
                    throw new Error(queryGetEmpresario.msg)
                }

                let objDataEmpresario = queryGetEmpresario.data[0]
                let objDataUser = dataUsuario?.find((u)=>u.strEmail === array[i]?.strUsuarioCreacion)

                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico: array[i]?.intIdDiagnostico,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    btFinalizado: array[i]?.btFinalizado,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    strUsuarioResponsable: objDataUser ? `${objDataUser?.strNombre || ""} - ${objDataUser?.strEmail || ""}`: array[i]?.strUsuarioCreacion,
                    objEmpresario: {
                        strNombreCompleto: objDataEmpresario.strNombres + " " + objDataEmpresario.strApellidos,
                        intId: array[i]?.intIdEmpresario,
                        intIdTipoEmpresario: array[i]?.intIdTipoEmpresario,
                        strNombres: objDataEmpresario.strNombres,
                        strApellidos: objDataEmpresario.strApellidos,
                        strNroDocto: objDataEmpresario.strNroDocto,
                        strCorreoElectronico: objDataEmpresario?.strCorreoElectronico1
                    }
                };
                let objInfoComMercadeo = {
                    strCaractEmpresaComp: array[i]?.strCaractEmpresaComp,
                    strCaractEmpresaCompDetalle: array[i]?.strCaractEmpresaCompDetalle,
                    strCaractEmpresaCompNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strCaractEmpresaComp'])?.strNivel,
                    strAnalizoObjetivoEmpresa: array[i]?.strAnalizoObjetivoEmpresa,
                    strAnalizoObjetivoEmpresaDetalle: array[i]?.strAnalizoObjetivoEmpresaDetalle,
                    strAnalizoObjetivoEmpresaNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strAnalizoObjetivoEmpresa'])?.strNivel,
                    strAnalizoCompetiEmpresa: array[i]?.strAnalizoCompetiEmpresa,
                    strAnalizoCompetiEmpresaDetalle: array[i]?.strAnalizoCompetiEmpresaDetalle,
                    strAnalizoCompetiEmpresaNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strAnalizoCompetiEmpresa'])?.strNivel,
                    strActivIncreVentClient: array[i]?.strActivIncreVentClient,
                    strActivIncreVentClientDetalle: array[i]?.strActivIncreVentClientDetalle,
                    strActivIncreVentClientNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strActivIncreVentClient'])?.strNivel,
                    strProceComerciEsta: array[i]?.strProceComerciEsta,
                    strProceComerciEstaDetalle: array[i]?.strProceComerciEstaDetalle,
                    strProceComerciEstaNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strProceComerciEsta'])?.strNivel,
                    strDefiniPortProd: array[i]?.strDefiniPortProd,
                    strDefiniPortProdDetalle: array[i]?.strDefiniPortProdDetalle,
                    strDefiniPortProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strDefiniPortProd'])?.strNivel,
                    strNumLugMedComerProd: array[i]?.strNumLugMedComerProd,
                    strNumLugMedComerProdDetalle: array[i]?.strNumLugMedComerProdDetalle,
                    strNumLugMedComerProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strNumLugMedComerProd'])?.strNivel,
                    strPartiRedesEmpreComer: array[i]?.strPartiRedesEmpreComer,
                    strPartiRedesEmpreComerDetalle: array[i]?.strPartiRedesEmpreComerDetalle,
                    strPartiRedesEmpreComerNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strPartiRedesEmpreComer'])?.strNivel,
                    strPreseMedDigital: array[i]?.strPreseMedDigital,
                    strPreseMedDigitalDetalle: array[i]?.strPreseMedDigitalDetalle,
                    strPreseMedDigitalNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strPreseMedDigital'])?.strNivel,
                    strDefineDiscursoComercialClientes: array[i]?.strDefineDiscursoComercialClientes,
                    strDefineDiscursoComercialClientesDetalle: array[i]?.strDefineDiscursoComercialClientesDetalle,
                    strDefineDiscursoComercialClientesNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strDefineDiscursoComercialClientes'])?.strNivel,
                    strPlanAtraccionRelacionamientoFidelizacionClientes: array[i]?.strPlanAtraccionRelacionamientoFidelizacionClientes,
                    strPlanAtraccionRelacionamientoFidelizacionClientesDetalle: array[i]?.strPlanAtraccionRelacionamientoFidelizacionClientesDetalle,
                    strPlanAtraccionRelacionamientoFidelizacionClientesNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strPlanAtraccionRelacionamientoFidelizacionClientes'])?.strNivel,
                    strFormatosGestionComercial: array[i]?.strFormatosGestionComercial,
                    strFormatosGestionComercialDetalle: array[i]?.strFormatosGestionComercialDetalle,
                    strFormatosGestionComercialNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strFormatosGestionComercial'])?.strNivel,
                    strTieneBaseDatosClientes: array[i]?.strTieneBaseDatosClientes,
                    strTieneBaseDatosClientesDetalle: array[i]?.strTieneBaseDatosClientesDetalle,
                    strTieneBaseDatosClientesNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strTieneBaseDatosClientes'])?.strNivel,
                    strTieneLogisticaTransporteClientes: array[i]?.strTieneLogisticaTransporteClientes,
                    strTieneLogisticaTransporteClientesDetalle: array[i]?.strTieneLogisticaTransporteClientesDetalle,
                    strTieneLogisticaTransporteClientesNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strTieneLogisticaTransporteClientes'])?.strNivel
                };

                let objInfoComProductivo = {
                    strGradoIntervProdServi: array[i]?.strGradoIntervProdServi,
                    strGradoIntervProdServiDetalle: array[i]?.strGradoIntervProdServiDetalle,
                    strGradoIntervProdServiNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strGradoIntervProdServi'])?.strNivel,
                    strProcProdEst: array[i]?.strProcProdEst,
                    strProcProdEstDetalle: array[i]?.strProcProdEstDetalle,
                    strProcProdEstNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strProcProdEst'])?.strNivel,
                    strDefProcComProv: array[i]?.strDefProcComProv,
                    strDefProcComProvDetalle: array[i]?.strDefProcComProvDetalle,
                    strDefProcComProvNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strDefProcComProv'])?.strNivel,
                    strContrlRegInv: array[i]?.strContrlRegInv,
                    strContrlRegInvDetalle: array[i]?.strContrlRegInvDetalle,
                    strContrlRegInvNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strContrlRegInv'])?.strNivel,
                    strCapProdRespMer: array[i]?.strCapProdRespMer,
                    strCapProdRespMerDetalle: array[i]?.strCapProdRespMerDetalle,
                    strCapProdRespMerNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strCapProdRespMer'])?.strNivel,
                    strEstadTecProd: array[i]?.strEstadTecProd,
                    strEstadTecProdDetalle: array[i]?.strEstadTecProdDetalle,
                    strEstadTecProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEstadTecProd'])?.strNivel,
                    strEquipNecDesProdServi: array[i]?.strEquipNecDesProdServi,
                    strEquipNecDesProdServiDetalle: array[i]?.strEquipNecDesProdServiDetalle,
                    strEquipNecDesProdServiNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEquipNecDesProdServi'])?.strNivel,
                    strProcManAmbiProd: array[i]?.strProcManAmbiProd,
                    strProcManAmbiProdDetalle: array[i]?.strProcManAmbiProdDetalle,
                    strProcManAmbiProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strProcManAmbiProd'])?.strNivel,
                    strConoceTiemposProduccionReferencias: array[i]?.strConoceTiemposProduccionReferencias,
                    strConoceTiemposProduccionReferenciasDetalle: array[i]?.strConoceTiemposProduccionReferenciasDetalle,
                    strConoceTiemposProduccionReferenciasNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strConoceTiemposProduccionReferencias'])?.strNivel,
                    strDeterminaNumUnidadesInventario: array[i]?.strDeterminaNumUnidadesInventario,
                    strDeterminaNumUnidadesInventarioDetalle: array[i]?.strDeterminaNumUnidadesInventarioDetalle,
                    strDeterminaNumUnidadesInventarioNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strDeterminaNumUnidadesInventario'])?.strNivel,
                    strProcesoProductivoLoRealiza: array[i]?.strProcesoProductivoLoRealiza,
                    strProcesoProductivoLoRealizaDetalle: array[i]?.strProcesoProductivoLoRealizaDetalle,
                    strProcesoProductivoLoRealizaNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strProcesoProductivoLoRealiza'])?.strNivel,
                    strCapacidadRespuestaTerceros: array[i]?.strCapacidadRespuestaTerceros,
                    strCapacidadRespuestaTercerosDetalle: array[i]?.strCapacidadRespuestaTercerosDetalle,
                    strCapacidadRespuestaTercerosNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strCapacidadRespuestaTerceros'])?.strNivel
                };
                let objInfoComFinanciero = {
                    strUniProdSosFinan: array[i]?.strUniProdSosFinan,
                    strUniProdSosFinanDetalle: array[i]?.strUniProdSosFinanDetalle,
                    strUniProdSosFinanNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strUniProdSosFinan'])?.strNivel,
                    strEstrCosUniProdDef: array[i]?.strEstrCosUniProdDef,
                    strEstrCosUniProdDefDetalle: array[i]?.strEstrCosUniProdDefDetalle,
                    strEstrCosUniProdDefNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEstrCosUniProdDef'])?.strNivel,
                    strPrecProdServDef: array[i]?.strPrecProdServDef,
                    strPrecProdServDefDetalle: array[i]?.strPrecProdServDefDetalle,
                    strPrecProdServDefNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strPrecProdServDef'])?.strNivel,
                    strDefProcConUniProd: array[i]?.strDefProcConUniProd,
                    strDefProcConUniProdDetalle: array[i]?.strDefProcConUniProdDetalle,
                    strDefProcConUniProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strDefProcConUniProd'])?.strNivel,
                    strElabPresUniProd: array[i]?.strElabPresUniProd,
                    strElabPresUniProdDetalle: array[i]?.strElabPresUniProdDetalle,
                    strElabPresUniProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strElabPresUniProd'])?.strNivel,
                    strAdminDinUniProd: array[i]?.strAdminDinUniProd,
                    strAdminDinUniProdDetalle: array[i]?.strAdminDinUniProdDetalle,
                    strAdminDinUniProdNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strAdminDinUniProd'])?.strNivel
                };
                let objInfoComAdministrativo = {
                    strUniProdGenEmple: array[i]?.strUniProdGenEmple,
                    strUniProdGenEmpleDetalle: array[i]?.strUniProdGenEmpleDetalle,
                    strUniProdGenEmpleNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strUniProdGenEmple'])?.strNivel,
                    strEquipTrabEstruct: array[i]?.strEquipTrabEstruct,
                    strEquipTrabEstructDetalle: array[i]?.strEquipTrabEstructDetalle,
                    strEquipTrabEstructNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEquipTrabEstruct'])?.strNivel,
                    strEstrucFormaOrganiza: array[i]?.strEstrucFormaOrganiza,
                    strEstrucFormaOrganizaDetalle: array[i]?.strEstrucFormaOrganizaDetalle,
                    strEstrucFormaOrganizaNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEstrucFormaOrganiza'])?.strNivel,
                    strElabPlanTrabActiv: array[i]?.strElabPlanTrabActiv,
                    strElabPlanTrabActivDetalle: array[i]?.strElabPlanTrabActivDetalle,
                    strElabPlanTrabActivNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strElabPlanTrabActiv'])?.strNivel,
                    strReaEvalPerioEquipTrab: array[i]?.strReaEvalPerioEquipTrab,
                    strReaEvalPerioEquipTrabDetalle: array[i]?.strReaEvalPerioEquipTrabDetalle,
                    strReaEvalPerioEquipTrabNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strReaEvalPerioEquipTrab'])?.strNivel,
                    strEmprFormaAcuerNormLab: array[i]?.strEmprFormaAcuerNormLab,
                    strEmprFormaAcuerNormLabDetalle: array[i]?.strEmprFormaAcuerNormLabDetalle,
                    strEmprFormaAcuerNormLabNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEmprFormaAcuerNormLab'])?.strNivel,
                    strEmprFormaReqLey: array[i]?.strEmprFormaReqLey,
                    strEmprFormaReqLeyDetalle: array[i]?.strEmprFormaReqLeyDetalle,
                    strEmprFormaReqLeyNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strEmprFormaReqLey'])?.strNivel,
                    strPlaneaEstraEmpPlanPlani: array[i]?.strPlaneaEstraEmpPlanPlani,
                    strPlaneaEstraEmpPlanPlaniDetalle: array[i]?.strPlaneaEstraEmpPlanPlaniDetalle,
                    strPlaneaEstraEmpPlanPlaniNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strPlaneaEstraEmpPlanPlani'])?.strNivel,
                    strMidConstCumpliMetObj: array[i]?.strMidConstCumpliMetObj,
                    strMidConstCumpliMetObjDetalle: array[i]?.strMidConstCumpliMetObjDetalle,
                    strMidConstCumpliMetObjNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strMidConstCumpliMetObj'])?.strNivel,
                    strCueAcompJuri: array[i]?.strCueAcompJuri,
                    strCueAcompJuriDetalle: array[i]?.strCueAcompJuriDetalle,
                    strCueAcompJuriNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strCueAcompJuri'])?.strNivel,
                };
                let objInfoComAsociativo = {
                    strPartReuPerioSociSoli: array[i]?.strPartReuPerioSociSoli,
                    strPartReuPerioSociSoliDetalle: array[i]?.strPartReuPerioSociSoliDetalle,
                    strPartReuPerioSociSoliNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strPartReuPerioSociSoli'])?.strNivel,
                    strConApliEstOrgSociSoli: array[i]?.strConApliEstOrgSociSoli,
                    strConApliEstOrgSociSoliDetalle: array[i]?.strConApliEstOrgSociSoliDetalle,
                    strConApliEstOrgSociSoliNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strConApliEstOrgSociSoli'])?.strNivel,
                    strAsociEmpoOrgAdmin: array[i]?.strAsociEmpoOrgAdmin,
                    strAsociEmpoOrgAdminDetalle: array[i]?.strAsociEmpoOrgAdminDetalle,
                    strAsociEmpoOrgAdminNivel: arrDataNiveles?.data?.flat().find(objeto => objeto['strAsociEmpoOrgAdmin'])?.strNivel,
                };

                data[i] = {
                    objInfoGeneral,
                    objInfoComMercadeo,
                    objInfoComProductivo,
                    objInfoComFinanciero,
                    objInfoComAdministrativo,
                    objInfoComAsociativo,
                    arrayTecnicas,
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
module.exports = getDiagnosticoTecnicas;