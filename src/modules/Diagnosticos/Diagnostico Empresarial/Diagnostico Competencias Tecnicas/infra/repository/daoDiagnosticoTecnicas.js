//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {conexion} = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoTecnicas {
    async setDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoCompetenciasTecnicas VALUES
            (
                ${data.intIdDiagnostico},
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.btFinalizado},
                ${data.strCaractEmpresaComp},
                ${data.strCaractEmpresaCompDetalle},
                ${data.strAnalizoObjetivoEmpresa},
                ${data.strAnalizoObjetivoEmpresaDetalle},
                ${data.strAnalizoCompetiEmpresa},
                ${data.strAnalizoCompetiEmpresaDetalle},
                ${data.strActivIncreVentClient},
                ${data.strActivIncreVentClientDetalle},
                ${data.strPlanAtraccionRelacionamientoFidelizacionClientes},
                ${data.strPlanAtraccionRelacionamientoFidelizacionClientesDetalle},
                ${data.strPlanRelFideClient},
                ${data.strPlanRelFideClientDetalle},
                ${data.strProceComerciEsta},
                ${data.strProceComerciEstaDetalle},
                ${data.strFormatosGestionComercial},
                ${data.strFormatosGestionComercialDetalle},
                ${data.strTieneBaseDatosClientes},
                ${data.strTieneBaseDatosClientesDetalle},
                ${data.strDefiniPortProd},
                ${data.strDefiniPortProdDetalle},
                ${data.strTieneLogisticaTransporteClientes},
                ${data.strTieneLogisticaTransporteClientesDetalle},
                ${data.strNumLugMedComerProd},
                ${data.strNumLugMedComerProdDetalle},
                ${data.strPartiRedesEmpreComer},
                ${data.strPartiRedesEmpreComerDetalle},
                ${data.strPreseMedDigital},
                ${data.strPreseMedDigitalDetalle},
                ${data.strGradoIntervProdServi},
                ${data.strGradoIntervProdServiDetalle},
                ${data.strProcProdEst},
                ${data.strProcProdEstDetalle},
                ${data.strDefProcComProv},
                ${data.strDefProcComProvDetalle},
                ${data.strContrlRegInv},
                ${data.strContrlRegInvDetalle},
                ${data.strConoceTiemposProduccionReferencias},
                ${data.strConoceTiemposProduccionReferenciasDetalle},
                ${data.strDeterminaNumUnidadesInventario},
                ${data.strDeterminaNumUnidadesInventarioDetalle},
                ${data.strProcesoProductivoLoRealiza},
                ${data.strProcesoProductivoLoRealizaDetalle},
                ${data.strCapacidadRespuestaTerceros},
                ${data.strCapacidadRespuestaTercerosDetalle},
                ${data.strCapProdRespMer},
                ${data.strCapProdRespMerDetalle},
                ${data.strEstadTecProd},
                ${data.strEstadTecProdDetalle},
                ${data.strEquipNecDesProdServi},
                ${data.strEquipNecDesProdServiDetalle},
                ${data.strProcManAmbiProd},
                ${data.strProcManAmbiProdDetalle},
                ${data.strUniProdSosFinan},
                ${data.strUniProdSosFinanDetalle},
                ${data.EstrCosUniProdDef},
                ${data.EstrCosUniProdDefDetalle},
                ${data.PrecProdServDef},
                ${data.PrecProdServDefDetalle},
                ${data.strDefProcConUniProd},
                ${data.strDefProcConUniProdDetalle},
                ${data.strElabPresUniProd},
                ${data.strElabPresUniProdDetalle},
                ${data.strAdminDinUniProd},
                ${data.strAdminDinUniProdDetalle},
                ${data.strUniProdGenEmple},
                ${data.strUniProdGenEmpleDetalle},
                ${data.strEquipTrabEstruct},
                ${data.strEquipTrabEstructDetalle},
                ${data.strEstrucFormaOrganiza},
                ${data.strEstrucFormaOrganizaDetalle},
                ${data.strElabPlanTrabActiv},
                ${data.strElabPlanTrabActivDetalle},
                ${data.strReaEvalPerioEquipTrab},
                ${data.strReaEvalPerioEquipTrabDetalle},
                ${data.strDefineDiscursoComercialClientes},
                ${data.strDefineDiscursoComercialClientesDetalle},
                ${data.strEmprFormaAcuerNormLab},
                ${data.strEmprFormaAcuerNormLabDetalle},
                ${data.strEmprFormaReqLey},
                ${data.strEmprFormaReqLeyDetalle},
                ${data.strPlaneaEstraEmpPlanPlani},
                ${data.strPlaneaEstraEmpPlanPlaniDetalle},
                ${data.strMidConstCumpliMetObj},
                ${data.strMidConstCumpliMetObjDetalle},
                ${data.strCueAcompJuri},
                ${data.strCueAcompJuriDetalle},
                ${data.strPartReuPerioSociSoli},
                ${data.strPartReuPerioSociSoliDetalle},
                ${data.strConApliEstOrgSociSoli},
                ${data.strConApliEstOrgSociSoliDetalle},
                ${data.strAsociEmpoOrgAdmin},
                ${data.strAsociEmpoOrgAdminDetalle},
                ${data.strLugarSesion},
                ${data.dtmFechaSesion},
                ${data.strUsuarioCreacion},
                GETDATE(),
                ${data.strUsuarioActualizacion}
            )
            
            SET @intId = SCOPE_IDENTITY();
            
            SELECT * FROM tbl_DiagnosticoCompetenciasTecnicas WHERE intId = @intId`;

            let result = {
                error: false,
                msg: `El diagnóstico de competencias técnicas, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoCompetenciasTecnicas

            SET strCaractEmpresaComp = COALESCE(${data.strCaractEmpresaComp},strCaractEmpresaComp),
                strCaractEmpresaCompDetalle = COALESCE(${data.strCaractEmpresaCompDetalle},strCaractEmpresaCompDetalle),
                strAnalizoObjetivoEmpresa = COALESCE(${data.strAnalizoObjetivoEmpresa},strAnalizoObjetivoEmpresa),
                strAnalizoObjetivoEmpresaDetalle = COALESCE(${data.strAnalizoObjetivoEmpresaDetalle},strAnalizoObjetivoEmpresaDetalle),
                strAnalizoCompetiEmpresa = COALESCE(${data.strAnalizoCompetiEmpresa},strAnalizoCompetiEmpresa),
                strAnalizoCompetiEmpresaDetalle = COALESCE(${data.strAnalizoCompetiEmpresaDetalle},strAnalizoCompetiEmpresaDetalle),
                strActivIncreVentClient = COALESCE(${data.strActivIncreVentClient},strActivIncreVentClient),
                strActivIncreVentClientDetalle = COALESCE(${data.strActivIncreVentClientDetalle},strActivIncreVentClientDetalle),
                strPlanAtraccionRelacionamientoFidelizacionClientes = COALESCE(${data.strPlanAtraccionRelacionamientoFidelizacionClientes},strPlanAtraccionRelacionamientoFidelizacionClientes),
                strPlanAtraccionRelacionamientoFidelizacionClientesDetalle = COALESCE(${data.strPlanAtraccionRelacionamientoFidelizacionClientesDetalle},strPlanAtraccionRelacionamientoFidelizacionClientesDetalle),
                strPlanRelFideClient = COALESCE(${data.strPlanRelFideClient},strPlanRelFideClient),
                strPlanRelFideClientDetalle = COALESCE(${data.strPlanRelFideClientDetalle},strPlanRelFideClientDetalle),
                strProceComerciEsta = COALESCE(${data.strProceComerciEsta},strProceComerciEsta),
                strProceComerciEstaDetalle = COALESCE(${data.strProceComerciEstaDetalle},strProceComerciEstaDetalle),
                strFormatosGestionComercial = COALESCE(${data.strFormatosGestionComercial},strFormatosGestionComercial),
                strFormatosGestionComercialDetalle = COALESCE(${data.strFormatosGestionComercialDetalle},strFormatosGestionComercialDetalle),
                strTieneBaseDatosClientes = COALESCE(${data.strTieneBaseDatosClientes},strTieneBaseDatosClientes),
                strTieneBaseDatosClientesDetalle = COALESCE(${data.strTieneBaseDatosClientesDetalle},strTieneBaseDatosClientesDetalle),
                strDefiniPortProd = COALESCE(${data.strDefiniPortProd},strDefiniPortProd),
                strDefiniPortProdDetalle = COALESCE(${data.strDefiniPortProdDetalle},strDefiniPortProdDetalle),
                strTieneLogisticaTransporteClientes = COALESCE(${data.strTieneLogisticaTransporteClientes},strTieneLogisticaTransporteClientes),
                strTieneLogisticaTransporteClientesDetalle = COALESCE(${data.strTieneLogisticaTransporteClientesDetalle},strTieneLogisticaTransporteClientesDetalle),
                strNumLugMedComerProd = COALESCE(${data.strNumLugMedComerProd},strNumLugMedComerProd),
                strNumLugMedComerProdDetalle = COALESCE(${data.strNumLugMedComerProdDetalle},strNumLugMedComerProdDetalle),
                strPartiRedesEmpreComer = COALESCE(${data.strPartiRedesEmpreComer},strPartiRedesEmpreComer),
                strPartiRedesEmpreComerDetalle = COALESCE(${data.strPartiRedesEmpreComerDetalle},strPartiRedesEmpreComerDetalle),
                strPreseMedDigital = COALESCE(${data.strPreseMedDigital},strPreseMedDigital),
                strPreseMedDigitalDetalle = COALESCE(${data.strPreseMedDigitalDetalle},strPreseMedDigitalDetalle),
                strGradoIntervProdServi = COALESCE(${data.strGradoIntervProdServi},strGradoIntervProdServi),
                strGradoIntervProdServiDetalle = COALESCE(${data.strGradoIntervProdServiDetalle},strGradoIntervProdServiDetalle),
                strProcProdEst = COALESCE(${data.strProcProdEst},strProcProdEst),
                strProcProdEstDetalle = COALESCE(${data.strProcProdEstDetalle},strProcProdEstDetalle),
                strDefProcComProv = COALESCE(${data.strDefProcComProv},strDefProcComProv),
                strDefProcComProvDetalle = COALESCE(${data.strDefProcComProvDetalle},strDefProcComProvDetalle),
                strContrlRegInv = COALESCE(${data.strContrlRegInv},strContrlRegInv),
                strContrlRegInvDetalle = COALESCE(${data.strContrlRegInvDetalle},strContrlRegInvDetalle),
                strConoceTiemposProduccionReferencias = COALESCE(${data.strConoceTiemposProduccionReferencias},strConoceTiemposProduccionReferencias),
                strConoceTiemposProduccionReferenciasDetalle = COALESCE(${data.strConoceTiemposProduccionReferenciasDetalle},strConoceTiemposProduccionReferenciasDetalle),
                strDeterminaNumUnidadesInventario = COALESCE(${data.strDeterminaNumUnidadesInventario},strDeterminaNumUnidadesInventario),
                strDeterminaNumUnidadesInventarioDetalle = COALESCE(${data.strDeterminaNumUnidadesInventarioDetalle},strDeterminaNumUnidadesInventarioDetalle),
                strProcesoProductivoLoRealiza = COALESCE(${data.strProcesoProductivoLoRealiza},strProcesoProductivoLoRealiza),
                strProcesoProductivoLoRealizaDetalle = COALESCE(${data.strProcesoProductivoLoRealizaDetalle},strProcesoProductivoLoRealizaDetalle),
                strCapacidadRespuestaTerceros = COALESCE(${data.strCapacidadRespuestaTerceros},strCapacidadRespuestaTerceros),
                strCapacidadRespuestaTercerosDetalle = COALESCE(${data.strCapacidadRespuestaTercerosDetalle},strCapacidadRespuestaTercerosDetalle),
                strCapProdRespMer = COALESCE(${data.strCapProdRespMer},strCapProdRespMer),
                strCapProdRespMerDetalle = COALESCE(${data.strCapProdRespMerDetalle},strCapProdRespMerDetalle),
                strEstadTecProd = COALESCE(${data.strEstadTecProd},strEstadTecProd),
                strEstadTecProdDetalle = COALESCE(${data.strEstadTecProdDetalle},strEstadTecProdDetalle),
                strEquipNecDesProdServi = COALESCE(${data.strEquipNecDesProdServi},strEquipNecDesProdServi),
                strEquipNecDesProdServiDetalle = COALESCE(${data.strEquipNecDesProdServiDetalle},strEquipNecDesProdServiDetalle),
                strProcManAmbiProd = COALESCE(${data.strProcManAmbiProd},strProcManAmbiProd),
                strProcManAmbiProdDetalle = COALESCE(${data.strProcManAmbiProdDetalle},strProcManAmbiProdDetalle),
                strUniProdSosFinan = COALESCE(${data.strUniProdSosFinan},strUniProdSosFinan),
                strUniProdSosFinanDetalle = COALESCE(${data.strUniProdSosFinanDetalle},strUniProdSosFinanDetalle),
                strDefProcConUniProd = COALESCE(${data.strDefProcConUniProd},strDefProcConUniProd),
                strDefProcConUniProdDetalle = COALESCE(${data.strDefProcConUniProdDetalle},strDefProcConUniProdDetalle),
                strElabPresUniProd = COALESCE(${data.strElabPresUniProd},strElabPresUniProd),
                strElabPresUniProdDetalle = COALESCE(${data.strElabPresUniProdDetalle},strElabPresUniProdDetalle),
                strAdminDinUniProd = COALESCE(${data.strAdminDinUniProd},strAdminDinUniProd),
                strAdminDinUniProdDetalle = COALESCE(${data.strAdminDinUniProdDetalle},strAdminDinUniProdDetalle),
                strUniProdGenEmple = COALESCE(${data.strUniProdGenEmple},strUniProdGenEmple),
                strUniProdGenEmpleDetalle = COALESCE(${data.strUniProdGenEmpleDetalle},strUniProdGenEmpleDetalle),
                strEquipTrabEstruct = COALESCE(${data.strEquipTrabEstruct},strEquipTrabEstruct),
                strEquipTrabEstructDetalle = COALESCE(${data.strEquipTrabEstructDetalle},strEquipTrabEstructDetalle),
                strEstrucFormaOrganiza = COALESCE(${data.strEstrucFormaOrganiza},strEstrucFormaOrganiza),
                strEstrucFormaOrganizaDetalle = COALESCE(${data.strEstrucFormaOrganizaDetalle},strEstrucFormaOrganizaDetalle),
                strElabPlanTrabActiv = COALESCE(${data.strElabPlanTrabActiv},strElabPlanTrabActiv),
                strElabPlanTrabActivDetalle = COALESCE(${data.strElabPlanTrabActivDetalle},strElabPlanTrabActivDetalle),
                strReaEvalPerioEquipTrab = COALESCE(${data.strReaEvalPerioEquipTrab},strReaEvalPerioEquipTrab),
                strReaEvalPerioEquipTrabDetalle = COALESCE(${data.strReaEvalPerioEquipTrabDetalle},strReaEvalPerioEquipTrabDetalle),
                strDefineDiscursoComercialClientes = COALESCE(${data.strDefineDiscursoComercialClientes},strDefineDiscursoComercialClientes),
                strDefineDiscursoComercialClientesDetalle = COALESCE(${data.strDefineDiscursoComercialClientesDetalle},strDefineDiscursoComercialClientesDetalle),
                strEmprFormaAcuerNormLab = COALESCE(${data.strEmprFormaAcuerNormLab},strEmprFormaAcuerNormLab),
                strEmprFormaAcuerNormLabDetalle = COALESCE(${data.strEmprFormaAcuerNormLabDetalle},strEmprFormaAcuerNormLabDetalle),
                strEmprFormaReqLey = COALESCE(${data.strEmprFormaReqLey},strEmprFormaReqLey),
                strEmprFormaReqLeyDetalle = COALESCE(${data.strEmprFormaReqLeyDetalle},strEmprFormaReqLeyDetalle),
                strPlaneaEstraEmpPlanPlani = COALESCE(${data.strPlaneaEstraEmpPlanPlani},strPlaneaEstraEmpPlanPlani),
                strPlaneaEstraEmpPlanPlaniDetalle = COALESCE(${data.strPlaneaEstraEmpPlanPlaniDetalle},strPlaneaEstraEmpPlanPlaniDetalle),
                strMidConstCumpliMetObj = COALESCE(${data.strMidConstCumpliMetObj},strMidConstCumpliMetObj),
                strMidConstCumpliMetObjDetalle = COALESCE(${data.strMidConstCumpliMetObjDetalle},strMidConstCumpliMetObjDetalle),
                strCueAcompJuri = COALESCE(${data.strCueAcompJuri},strCueAcompJuri),
                strCueAcompJuriDetalle = COALESCE(${data.strCueAcompJuriDetalle},strCueAcompJuriDetalle),
                strPartReuPerioSociSoli = COALESCE(${data.strPartReuPerioSociSoli},strPartReuPerioSociSoli),
                strPartReuPerioSociSoliDetalle = COALESCE(${data.strPartReuPerioSociSoliDetalle},strPartReuPerioSociSoliDetalle),
                strConApliEstOrgSociSoli = COALESCE(${data.strConApliEstOrgSociSoli},strConApliEstOrgSociSoli),
                strConApliEstOrgSociSoliDetalle = COALESCE(${data.strConApliEstOrgSociSoliDetalle},strConApliEstOrgSociSoliDetalle),
                strAsociEmpoOrgAdmin = COALESCE(${data.strAsociEmpoOrgAdmin},strAsociEmpoOrgAdmin),
                strAsociEmpoOrgAdminDetalle = COALESCE(${data.strAsociEmpoOrgAdminDetalle},strAsociEmpoOrgAdminDetalle),
                strLugarSesion = COALESCE(${data.strLugarSesion}, strLugarSesion),
                dtmFechaSesion = COALESCE(${data.dtmFechaSesion}, dtmFechaSesion),
                dtmActualizacion = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion)
                
            WHERE intId = ${data.intId}

            SELECT * FROM tbl_DiagnosticoCompetenciasTecnicas WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnóstico de competencias técnicas, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateFinalizarDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoCompetenciasTecnicas

            SET btFinalizado            = COALESCE(${data.btFinalizado},btFinalizado),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion)

            WHERE intIdDiagnostico = ${data.intIdDiagnostico}

            SELECT * FROM tbl_DiagnosticoCompetenciasTecnicas WHERE intIdDiagnostico = ${data.intIdDiagnostico}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnóstico de competencias técnicas, fue finalizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoCompetenciasTecnicas WHERE intIdDiagnostico = ${data.intId}`;

            let result = {
                error: false,
                msg: "El diagnostico de competencias tecnicas fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoTecnicas(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoCompetenciasTecnicas

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdDiagnostico = ${data.intIdDiagnostico} OR ${data.intIdDiagnostico} IS NULL) `;

            let arrNewData = response.recordsets[0];

            let result = {
                error: false,
                data: arrNewData
                    ? arrNewData.length > 0
                        ? arrNewData
                        : null
                    : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getDiagnosticoTecnicas de la clase daoDiagnosticoTecnicas",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoTecnicas;