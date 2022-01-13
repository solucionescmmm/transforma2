//Librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const { conexion } = require("../../../../../../common/config/confSQL_connectionTransfroma");

class daoDiagnosticoServicio {
    async setDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_DiagnosticoServicios VALUES
            (
                ${data.intIdEmpresario},
                ${data.strCategoriaProductos},
                ${data.strProductos},
                ${data.strNombreTecnica},
                ${data.strMateriaPrima},
                ${data.strFuncionalidad},
                ${data.strFuncionalidadDetalle},
                ${data.strFuncionalidadNivel},
                ${data.strMetodologia},
                ${data.strMetodologiaDetalle},
                ${data.strMetodologiaNivel},
                ${data.strRenovacionPortafolio},
                ${data.strRenovacionPortafolioDetalle},
                ${data.strRenovacionPortafolioNivel},
                ${data.strSostenibilidad},
                ${data.strSostenibilidadDetalle},
                ${data.strSostenibilidadNivel},
                ${data.strAtributosValor},
                ${data.strAtributosValorDetalle},
                ${data.strAtributosValorNivel},
                ${data.strUsoMateriales},
                ${data.strUsoMaterialesDetalle},
                ${data.strUsoMaterialesNivel},
                ${data.strMenajoTecnicaAlim},
                ${data.strMenajoTecnicaAlimDetalle},
                ${data.strMenajoTecnicaAlimNivel},
                ${data.strProcesosPreparacion},
                ${data.strProcesosPreparacionDetalle},
                ${data.strProcesosPreparacionNivel},
                ${data.strPresentacionApariencia},
                ${data.strPresentacionAparienciaDetalle},
                ${data.strPresentacionAparienciaNivel},
                ${data.strProporcionAlim},
                ${data.strProporcionAlimDetalle},
                ${data.strProporcionAlimNivel},
                ${data.strConservacion},
                ${data.strConservacionDetalle},
                ${data.strConservacionNivel},
                ${data.strInocuidad},
                ${data.strInocuidadDetalle},
                ${data.strInocuidadNivel},
                ${data.strEmpaqueEtiquetaAlim},
                ${data.strEmpaqueEtiquetaAlimDetalle},
                ${data.strEmpaqueEtiquetaAlimNivel},
                ${data.strMenajoTecnica},
                ${data.strMenajoTecnicaDetalle},
                ${data.strMenajoTecnicaNivel},
                ${data.strAcabadosFactura},
                ${data.strAcabadosFacturaDetalle},
                ${data.strAcabadosFacturaNivel},
                ${data.strDurabilidad},
                ${data.strDurabilidadDetalle},
                ${data.strDurabilidadNivel},
                ${data.strUsoColores},
                ${data.strUsoColoresDetalle},
                ${data.strUsoColoresNivel},
                ${data.strProporcion},
                ${data.strProporcionDetalle},
                ${data.strProporcionNivel},
                ${data.strRiesgoUso},
                ${data.strRiesgoUsoDetalle},
                ${data.strRiesgoUsoNivel},
                ${data.strEmpaqueEtiqueta},
                ${data.strEmpaqueEtiquetaDetalle},
                ${data.strEmpaqueEtiquetaNivel},
                ${data.strUsabilidad},
                ${data.strUsabilidadDetalle},
                ${data.strUsabilidadNivel},
                ${data.strDisenioExperiencia},
                ${data.strDisenioExperienciaDetalle},
                ${data.strDisenioExperienciaNivel},
                ${data.strLineaGrafica},
                ${data.strLineaGraficaDetalle},
                ${data.strLineaGraficaNivel},
                ${data.strIdentidadMarca},
                ${data.strIdentidadMarcaDetalle},
                ${data.strIdentidadMarcaNivel},
                ${data.strComunicacionMarca},
                ${data.strComunicacionMarcaDetalle},
                ${data.strComunicacionMarcaNivel},
                ${data.strPermisoFuncionamiento},
                ${data.strCertificadosRequeridos},
                ${data.strCertificadosActuales},
                ${data.strRegistroMarca},
                ${data.strPatentesUtilidad},
                ${data.strCualPatenteUtilidad},
                ${data.strConclusiones},
                ${data.strURLSFotos},
                ${data.strLugarSesion},
                ${data.dtmFechaSesion},
                ${data.strUsuarioCreacion},
                GETDATE(),
                ${data.strUsuarioActualizacion}
            )
            
            SET @intId = SCOPE_IDENTITY();`;

            let result = {
                error: false,
                msg: `El diagnostico de producto, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_DiagnosticoProductos

            SET strCategoriaProductos            = COALESCE(${data.strCategoriaProductos}, strCategoriaProductos),
                strProductos                     = COALESCE(${data.strProductos}, strProductos),
                strNombreTecnica                 = COALESCE(${data.strNombreTecnica}, strNombreTecnica),
                strMateriaPrima                  = COALESCE(${data.strMateriaPrima}, strMateriaPrima),
                strFuncionalidad                 = COALESCE(${data.strFuncionalidad}, strFuncionalidad),
                strFuncionalidadDetalle          = COALESCE(${data.strFuncionalidadDetalle}, strFuncionalidadDetalle),
                strFuncionalidadNivel            = COALESCE(${data.strFuncionalidadNivel}, strFuncionalidadNivel),
                strMetodologia                   = COALESCE(${data.strMetodologia}, strMetodologia),
                strMetodologiaDetalle            = COALESCE(${data.strMetodologiaDetalle}, strMetodologiaDetalle),
                strMetodologiaNivel              = COALESCE(${data.strMetodologiaNivel}, strMetodologiaNivel),
                strRenovacionPortafolio          = COALESCE(${data.strRenovacionPortafolio}, strRenovacionPortafolio),
                strRenovacionPortafolioDetalle   = COALESCE(${data.strRenovacionPortafolioDetalle}, strRenovacionPortafolioDetalle),
                strRenovacionPortafolioNivel     = COALESCE(${data.strRenovacionPortafolioNivel}, strRenovacionPortafolioNivel),
                strSostenibilidad                = COALESCE(${data.strSostenibilidad}, strSostenibilidad),
                strSostenibilidadDetalle         = COALESCE(${data.strSostenibilidadDetalle}, strSostenibilidadDetalle),
                strSostenibilidadNivel           = COALESCE(${data.strSostenibilidadNivel}, strSostenibilidadNivel),
                strNucleoFamiliarOtrosIngresos   = COALESCE(${data.strNucleoFamiliarOtrosIngresos}, strNucleoFamiliarOtrosIngresos),
                strAtributosValor                = COALESCE(${data.strAtributosValor}, strAtributosValor),
                strAtributosValorDetalle         = COALESCE(${data.strAtributosValorDetalle}, strAtributosValorDetalle),
                strAtributosValorNivel           = COALESCE(${data.strAtributosValorNivel}, strAtributosValorNivel),
                strUsoMateriales                 = COALESCE(${data.strUsoMateriales}, strUsoMateriales),
                strUsoMaterialesDetalle          = COALESCE(${data.strUsoMaterialesDetalle}, strUsoMaterialesDetalle),
                strUsoMaterialesNivel            = COALESCE(${data.strUsoMaterialesNivel}, strUsoMaterialesNivel),
                strMenajoTecnicaAlim             = COALESCE(${data.strMenajoTecnicaAlim}, strMenajoTecnicaAlim),
                strMenajoTecnicaAlimDetalle      = COALESCE(${data.strMenajoTecnicaAlimDetalle}, strMenajoTecnicaAlimDetalle),
                strMenajoTecnicaAlimNivel        = COALESCE(${data.strMenajoTecnicaAlimNivel}, strMenajoTecnicaAlimNivel),
                strProcesosPreparacion           = COALESCE(${data.strProcesosPreparacion}, strProcesosPreparacion),
                strProcesosPreparacionDetalle    = COALESCE(${data.strProcesosPreparacionDetalle}, strProcesosPreparacionDetalle),
                strProcesosPreparacionNivel      = COALESCE(${data.strProcesosPreparacionNivel}, strProcesosPreparacionNivel),
                strPresentacionApariencia        = COALESCE(${data.strPresentacionApariencia}, strPresentacionApariencia),
                strPresentacionAparienciaDetalle = COALESCE(${data.strPresentacionAparienciaDetalle}, strPresentacionAparienciaDetalle),
                strPresentacionAparienciaNivel   = COALESCE(${data.strPresentacionAparienciaNivel}, strPresentacionAparienciaNivel),
                strProporcionAlim                = COALESCE(${data.strProporcionAlim}, strProporcionAlim),
                strProporcionAlimDetalle         = COALESCE(${data.strProporcionAlimDetalle}, strProporcionAlimDetalle),
                strProporcionAlimNivel           = COALESCE(${data.strProporcionAlimNivel}, strProporcionAlimNivel),
                strConservacion                  = COALESCE(${data.strConservacion}, strConservacion),
                strConservacionDetalle           = COALESCE(${data.strConservacionDetalle}, strConservacionDetalle),
                strConservacionNivel             = COALESCE(${data.strConservacionNivel}, strConservacionNivel),
                strInocuidad                     = COALESCE(${data.strInocuidad}, strInocuidad),
                strInocuidadDetalle              = COALESCE(${data.strInocuidadDetalle}, strInocuidadDetalle),
                strInocuidadNivel                = COALESCE(${data.strInocuidadNivel}, strInocuidadNivel),
                strEmpaqueEtiquetaAlim           = COALESCE(${data.strEmpaqueEtiquetaAlim}, strEmpaqueEtiquetaAlim),
                strEmpaqueEtiquetaAlimDetalle    = COALESCE(${data.strEmpaqueEtiquetaAlimDetalle}, strEmpaqueEtiquetaAlimDetalle),
                strEmpaqueEtiquetaAlimNivel      = COALESCE(${data.strEmpaqueEtiquetaAlimNivel}, strEmpaqueEtiquetaAlimNivel),
                strMenajoTecnica                 = COALESCE(${data.strMenajoTecnica}, strMenajoTecnica),
                strMenajoTecnicaDetalle          = COALESCE(${data.strMenajoTecnicaDetalle}, strMenajoTecnicaDetalle),
                strMenajoTecnicaNivel            = COALESCE(${data.strMenajoTecnicaNivel}, strMenajoTecnicaNivel),
                strAcabadosFactura               = COALESCE(${data.strAcabadosFactura}, strAcabadosFactura),
                strAcabadosFacturaDetalle        = COALESCE(${data.strAcabadosFacturaDetalle}, strAcabadosFacturaDetalle),
                strAcabadosFacturaNivel          = COALESCE(${data.strAcabadosFacturaNivel}, strAcabadosFacturaNivel),
                strDurabilidad                   = COALESCE(${data.strDurabilidad}, strDurabilidad),
                strDurabilidadDetalle            = COALESCE(${data.strDurabilidadDetalle}, strDurabilidadDetalle),
                strDurabilidadNivel              = COALESCE(${data.strDurabilidadNivel}, strDurabilidadNivel),
                strUsoColores                    = COALESCE(${data.strUsoColores}, strUsoColores),
                strUsoColoresDetalle             = COALESCE(${data.strUsoColoresDetalle}, strUsoColoresDetalle),
                strUsoColoresNivel               = COALESCE(${data.strUsoColoresNivel}, strUsoColoresNivel),
                strProporcion                    = COALESCE(${data.strProporcion}, strProporcion),
                strProporcionDetalle             = COALESCE(${data.strProporcionDetalle}, strProporcionDetalle),
                strProporcionNivel               = COALESCE(${data.strProporcionNivel}, strProporcionNivel),
                strRiesgoUso                     = COALESCE(${data.strRiesgoUso}, strRiesgoUso),
                strRiesgoUsoDetalle              = COALESCE(${data.strRiesgoUsoDetalle}, strRiesgoUsoDetalle),
                strRiesgoUsoNivel                = COALESCE(${data.strRiesgoUsoNivel}, strRiesgoUsoNivel),
                strEmpaqueEtiqueta               = COALESCE(${data.strEmpaqueEtiqueta}, strEmpaqueEtiqueta),
                strEmpaqueEtiquetaDetalle        = COALESCE(${data.strEmpaqueEtiquetaDetalle}, strEmpaqueEtiquetaDetalle),
                strEmpaqueEtiquetaNivel          = COALESCE(${data.strEmpaqueEtiquetaNivel}, strEmpaqueEtiquetaNivel),
                strUsabilidad                    = COALESCE(${data.strUsabilidad}, strUsabilidad),
                strUsabilidadDetalle             = COALESCE(${data.strUsabilidadDetalle}, strUsabilidadDetalle),
                strUsabilidadNivel               = COALESCE(${data.strUsabilidadNivel}, strUsabilidadNivel),
                strDiseñoExperiencia             = COALESCE(${data.strDiseñoExperiencia}, strDiseñoExperiencia),
                strDiseñoExperienciaDetalle      = COALESCE(${data.strDiseñoExperienciaDetalle}, strDiseñoExperienciaDetalle),
                strDiseñoExperienciaNivel        = COALESCE(${data.strDiseñoExperienciaNivel}, strDiseñoExperienciaNivel),
                strLineaGrafica                  = COALESCE(${data.strLineaGrafica}, strLineaGrafica),
                strLineaGraficaDetalle           = COALESCE(${data.strLineaGraficaDetalle}, strLineaGraficaDetalle),
                strLineaGraficaNivel             = COALESCE(${data.strLineaGraficaNivel}, strLineaGraficaNivel),
                strIdentidadMarca                = COALESCE(${data.strIdentidadMarca}, strIdentidadMarca),
                strIdentidadMarcaDetalle         = COALESCE(${data.strIdentidadMarcaDetalle}, strIdentidadMarcaDetalle),
                strIdentidadMarcaNivel           = COALESCE(${data.strIdentidadMarcaNivel}, strIdentidadMarcaNivel),
                strComunicacionMarca             = COALESCE(${data.strComunicacionMarca}, strComunicacionMarca),
                strComunicacionMarcaDetalle      = COALESCE(${data.strComunicacionMarcaDetalle}, strComunicacionMarcaDetalle),
                strComunicacionMarcaNivel        = COALESCE(${data.strComunicacionMarcaNivel}, strComunicacionMarcaNivel),
                strPermisoFuncionamiento         = COALESCE(${data.strPermisoFuncionamiento}, strPermisoFuncionamiento),
                strCertificadosRequeridos        = COALESCE(${data.strCertificadosRequeridos}, strCertificadosRequeridos),
                strCertificadosActuales          = COALESCE(${data.strCertificadosActuales}, strCertificadosActuales),
                strRegistroMarca                 = COALESCE(${data.strRegistroMarca}, strRegistroMarca),
                strPatentesUtilidad              = COALESCE(${data.strPatentesUtilidad}, strPatentesUtilidad),
                strCualPatenteUtilidad           = COALESCE(${data.strCualPatenteUtilidad}, strCualPatenteUtilidad),
                strConclusiones                  = COALESCE(${data.strConclusiones}, strConclusiones),
                strURLSFotos                     = COALESCE(${data.strURLSFotos}, strURLSFotos),
                strLugarSesion                   = COALESCE(${data.strLugarSesion}, strLugarSesion),
                strUsuarioActualizacion          = COALESCE(${data.strUsuarioActualizacion}, strUsuarioActualizacion),
                dtmActualizacion                 = COALESCE(GETDATE(), dtmActualizacion)

                WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El diagnostico de producto, fue actualizado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_DiagnosticoProductos WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "El diagnostico de producto, fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getDiagnosticoServicio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`

            SELECT *
            FROM tbl_DiagnosticoProductos

            WHERE (intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (intIdEmpresario = ${data.intIdEmpresario} OR ${data.intIdEmpresario} IS NULL) `;

            let arrNewData = response.recordsets[0];

            let result = {
                error: false,
                data: arrNewData ? (arrNewData.length > 0 ? arrNewData : null) : null,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getDiagnosticoServicios de la clase daoDiagnosticoServicios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoDiagnosticoServicio;