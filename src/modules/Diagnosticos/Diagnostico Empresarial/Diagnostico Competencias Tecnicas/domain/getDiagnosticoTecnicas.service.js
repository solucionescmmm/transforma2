//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoTecnicas");
const validator = require("validator").default;

//service
const serviceGetEmpresario = require("../../../../Empresarios/domian/getEmpresario.service")

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

    let dao = new classInterfaceDAODiagnostico();
    let query = {
        intId,
        intIdDiagnostico
    };

    let arrayData = await dao.getDiagnosticoTecnicas(query);


    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let queryGetEmpresario = await serviceGetEmpresario({ intId: array[i]?.intIdEmpresario }, strDataUser)
                if (queryGetEmpresario.error) {
                    throw new Error(queryGetEmpresario.msg)
                }

                let objDataEmpresario = queryGetEmpresario.data[0]

                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico:array[i]?.intIdDiagnostico,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    btFinalizado: array[i]?.btFinalizado,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
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
                    strAnalizoObjetivoEmpresa: array[i]?.strAnalizoObjetivoEmpresa,
                    strAnalizoObjetivoEmpresaDetalle:array[i]?.strAnalizoObjetivoEmpresaDetalle,
                    strAnalizoCompetiEmpresa:array[i]?.strAnalizoCompetiEmpresa,
                    strAnalizoCompetiEmpresaDetalle: array[i]?.strAnalizoCompetiEmpresaDetalle,
                    strActivIncreVentClient:array[i]?.strActivIncreVentClient,
                    strActivIncreVentClientDetalle:array[i]?.strActivIncreVentClientDetalle,
                    strPlanRelFideClient:array[i]?.strPlanRelFideClient,
                    strPlanRelFideClientDetalle:array[i]?.strPlanRelFideClientDetalle,
                    strProceComerciEsta:array[i]?.strProceComerciEsta,
                    strProceComerciEstaDetalle: array[i]?.strProceComerciEstaDetalle,
                    strDefiniPortProd:array[i]?.strDefiniPortProd,
                    strDefiniPortProdDetalle: array[i]?.strDefiniPortProdDetalle,
                    strNumLugMedComerProd: array[i]?.strNumLugMedComerProd,
                    strNumLugMedComerProdDetalle:array[i]?.strNumLugMedComerProdDetalle,
                    strPartiRedesEmpreComer:array[i]?.strPartiRedesEmpreComer,
                    strPartiRedesEmpreComerDetalle: array[i]?.strPartiRedesEmpreComerDetalle,
                    strPreseMedDigital:array[i]?.strPreseMedDigital,
                    strPreseMedDigitalDetalle:array[i]?.strPreseMedDigitalDetalle,
                };
                let objInfoComProductivo= {
                    strGradoIntervProdServi: array[i]?.strGradoIntervProdServi,
                    strGradoIntervProdServiDetalle: array[i]?.strGradoIntervProdServiDetalle,
                    strProcProdEst: array[i]?.strProcProdEst,
                    strProcProdEstDetalle: array[i]?.strProcProdEstDetalle,
                    strDefProcComProv: array[i]?.strDefProcComProv,
                    strDefProcComProvDetalle: array[i]?.strDefProcComProvDetalle,
                    strContrlRegInv: array[i]?.strContrlRegInv,
                    strContrlRegInvDetalle: array[i]?.strContrlRegInvDetalle,
                    strCapProdRespMer: array[i]?.strCapProdRespMer,
                    strCapProdRespMerDetalle: array[i]?.strCapProdRespMerDetalle,
                    strEstadTecProd: array[i]?.strEstadTecProd,
                    strEstadTecProdDetalle: array[i]?.strEstadTecProdDetalle,
                    strEquipNecDesProdServi: array[i]?.strEquipNecDesProdServi,
                    strEquipNecDesProdServiDetalle: array[i]?.strEquipNecDesProdServiDetalle,
                    strProcManAmbiProd: array[i]?.strProcManAmbiProd,
                    strProcManAmbiProdDetalle: array[i]?.strProcManAmbiProdDetalle,
                };
                let objInfoComFinanciero = {
                    strUniProdSosFinan: array[i]?.strUniProdSosFinan,
                    strUniProdSosFinanDetalle: array[i]?.strUniProdSosFinanDetalle,
                    strEstrCosUniProdDef: array[i]?.strEstrCosUniProdDef,
                    strEstrCosUniProdDefDetalle: array[i]?.strEstrCosUniProdDefDetalle,
                    strPrecProdServDef: array[i]?.strPrecProdServDef,
                    strPrecProdServDefDetalle: array[i]?.strPrecProdServDefDetalle,
                    strDefProcConUniProd: array[i]?.strDefProcConUniProd,
                    strDefProcConUniProdDetalle: array[i]?.strDefProcConUniProdDetalle,
                    strElabPresUniProd: array[i]?.strElabPresUniProd,
                    strElabPresUniProdDetalle: array[i]?.strElabPresUniProdDetalle,
                    strAdminDinUniProd: array[i]?.strAdminDinUniProd,
                    strAdminDinUniProdDetalle: array[i]?.strAdminDinUniProdDetalle,
                };  
                let objInfoComAdministrativo= {
                strUniProdGenEmple: array[i]?.strUniProdGenEmple,
                strUniProdGenEmpleDetalle: array[i]?.strUniProdGenEmpleDetalle,
                strEquipTrabEstruct: array[i]?.strEquipTrabEstruct,
                strEquipTrabEstructDetalle: array[i]?.strEquipTrabEstructDetalle,
                strEstrucFormaOrganiza: array[i]?.strEstrucFormaOrganiza,
                strEstrucFormaOrganizaDetalle: array[i]?.strEstrucFormaOrganizaDetalle,
                strElabPlanTrabActiv: array[i]?.strElabPlanTrabActiv,
                strElabPlanTrabActivDetalle: array[i]?.strElabPlanTrabActivDetalle,
                strReaEvalPerioEquipTrab: array[i]?.strReaEvalPerioEquipTrab,
                strReaEvalPerioEquipTrabDetalle: array[i]?.strReaEvalPerioEquipTrabDetalle,
                strEmprFormaAcuerNormLab: array[i]?.strEmprFormaAcuerNormLab,
                strEmprFormaAcuerNormLabDetalle: array[i]?.strEmprFormaAcuerNormLabDetalle,
                strEmprFormaReqLey: array[i]?.strEmprFormaReqLey,
                strEmprFormaReqLeyDetalle: array[i]?.strEmprFormaReqLeyDetalle,
                strPlaneaEstraEmpPlanPlani: array[i]?.strPlaneaEstraEmpPlanPlani,
                strPlaneaEstraEmpPlanPlaniDetalle: array[i]?.strPlaneaEstraEmpPlanPlaniDetalle,
                strMidConstCumpliMetObj: array[i]?.strMidConstCumpliMetObj,
                strMidConstCumpliMetObjDetalle: array[i]?.strMidConstCumpliMetObjDetalle,
                strCueAcompJuri: array[i]?.strCueAcompJuri,
                strCueAcompJuriDetalle: array[i]?.strCueAcompJuriDetalle,
                };
                let objInfoComAsociativo= {
            strPartReuPerioSociSoli: array[i]?.strPartReuPerioSociSoli,
            strPartReuPerioSociSoliDetalle: array[i]?.strPartReuPerioSociSoliDetalle,
            strConApliEstOrgSociSoli: array[i]?.strConApliEstOrgSociSoli,
            strConApliEstOrgSociSoliDetalle: array[i]?.strConApliEstOrgSociSoliDetalle,
            strAsociEmpoOrgAdmin: array[i]?.strAsociEmpoOrgAdmin,
            strAsociEmpoOrgAdminDetalle: array[i]?.strAsociEmpoOrgAdminDetalle,
                };

                data[i] = {
                    objInfoGeneral,
                    objInfoComMercadeo,
                    objInfoComProductivo,
                    objInfoComFinanciero,
                    objInfoComAdministrativo,
                    objInfoComAsociativo,
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