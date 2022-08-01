//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoEmpresarios {
    async setEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Empresario VALUES
            (
                ${data.strNombres},
                ${data.strApellidos},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.strLugarExpedicionDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.dtFechaNacimiento},
                ${data.strNacionalidad},
                ${data.strGenero},
                ${data.strCelular1},
                ${data.strCelular2},
                ${data.strCorreoElectronico1},
                ${data.strCorreoElectronico2},
                ${data.strNivelEducativo},
                ${data.strTitulos},
                ${data.strCondicionDiscapacidad},
                ${data.strSede},
                ${data.strModalidadIngreso},
                ${data.dtFechaVinculacion},
                ${data.strEstadoVinculacion},
                ${data.strTipoVinculacion},
                ${data.strEstrato},
                ${data.arrDepartamento},
                ${data.arrCiudad},
                ${data.strBarrio},
                ${data.strDireccionResidencia},
                ${data.strURLFileFoto},
                GETDATE(),
                ${data.strUsuario}
            )
            
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_Empresario WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue registrado con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setIdea(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Idea VALUES
            (
                ${data.strNombre},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Idea WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La idea, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setIdea de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setIdeaEmpresario(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Idea_Empresario VALUES
            (
                ${data.intIdIdea},
                ${data.intIdEmpresario},
                ${data.intIdTipoEmpresario},
                ${data.dtFechaInicio},
                ${data.dtFechaFin},
                ${data.intIdEstado},
                GETDATE(),
                ${data.strUsuarioCreacion},
                GETDATE(),
                NULL
            )
            
            SET @intId = SCOPE_IDENTITY();
    
            SELECT * FROM tbl_Idea_Empresario WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La idea, fue agregada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setIdeaEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmpresa(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmpresa VALUES
            (
                ${data.intIdEmpresario},
                ${data.strEstadoNegocio},
                ${data.strCuandoComienzaEmpresa},
                ${data.strURLFileLogoEmpresa},
                ${data.strNombreMarca},
                ${data.dtFechaFundacion},
                ${data.strLugarOperacion},
                ${data.arrDepartamento},
                ${data.arrCiudad},
                ${data.strBarrio},
                ${data.strDireccionResidencia},
                ${data.strSectorEconomico},
                ${data.strCategoriaProducto},
                ${data.strCategoriaServicio},
                ${data.arrCategoriasSecundarias},
                ${data.strOtraCategoria},
                ${data.strDescProductosServicios},
                ${data.strMateriaPrima},
                ${data.strNombreTecnica},
                ${data.strTiempoDedicacion},
                ${data.btGeneraEmpleo},
                ${data.intNumeroEmpleados},
                ${data.dblValorVentasMes},
                ${data.arrFormasComercializacion},
                ${data.arrMediosDigitales},
                ${data.btGrupoAsociativo},
                ${data.strAsociacionUnidadProdIndividual},
                ${data.arrRequisitosLey},
                ${data.strOtrosRequisitos},
                GETDATE(),
                ${data.strUsuario}
            )

            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_InfoEmpresa WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La empresa #${response.recordset[0].intId} fue registrada con éxito, para el empresario #${response.recordset[0].intIdEmpresario}.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmpresa de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setInfoAdicional(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoAdicional VALUES
            (
                ${data.intIdEmpresario},
                ${data.strPrincipalesNecesidades},
                ${data.btInteresadoProcesoCMM},
                ${data.arrTemasCapacitacion},
                ${data.arrComoSeEntero},
                ${data.strOtroComoSeEntero},
                ${data.arrMediosDeComunicacion},
                ${data.strOtrosMediosComunicacion},
                ${data.btRecibirInfoCMM},
                ${data.strRecomendaciones},
                GETDATE(),
                ${data.strUsuario}
            )
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_InfoAdicional WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0]
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setInfoAdicional de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Empresario

            SET strNombres               = COALESCE(${data.strNombres}, strNombres),
                strApellidos             = COALESCE(${data.strApellidos}, strApellidos),
                strTipoDocto             = COALESCE(${data.strTipoDocto}, strTipoDocto),
                strNroDocto              = COALESCE(${data.strNroDocto}, strNroDocto),
                strLugarExpedicionDocto  = COALESCE(${data.strLugarExpedicionDocto}, strLugarExpedicionDocto),
                dtFechaExpedicionDocto   = COALESCE(${data.dtFechaExpedicionDocto}, dtFechaExpedicionDocto),
                dtFechaNacimiento        = COALESCE(${data.dtFechaNacimiento}, dtFechaNacimiento),
                strGenero                = COALESCE(${data.strGenero}, strGenero),
                strCelular1              = COALESCE(${data.strCelular1}, strCelular1),
                strCelular2              = COALESCE(${data.strCelular2}, strCelular2),
                strCorreoElectronico1    = COALESCE(${data.strCorreoElectronico1}, strCorreoElectronico1),
                strCorreoElectronico2    = COALESCE(${data.strCorreoElectronico2}, strCorreoElectronico2),
                strNivelEducativo        = COALESCE(${data.strNivelEducativo}, strNivelEducativo),
                strTitulos               = COALESCE(${data.strTitulos}, strTitulos),
                strCondicionDiscapacidad = COALESCE(${data.strCondicionDiscapacidad}, strCondicionDiscapacidad),
                strSede                  = COALESCE(${data.strSede}, strSede),
                strModalidadIngreso      = COALESCE(${data.strModalidadIngreso}, strModalidadIngreso),
                dtFechaVinculacion       = COALESCE(${data.dtFechaVinculacion}, dtFechaVinculacion),
                strEstadoVinculacion     = COALESCE(${data.strEstadoVinculacion}, strEstadoVinculacion),
                strTipoVinculacion       = COALESCE(${data.strTipoVinculacion}, strTipoVinculacion),
                strEstrato               = COALESCE(${data.strEstrato}, strEstrato),
                strDepartamento          = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia   = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strUrlFileFoto           = COALESCE(${data.strURLFileFoto}, strUrlFileFoto),
                dtmActualizacion         = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario               = COALESCE(${data.strUsuario}, strUsuario)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Empresario WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateIdea(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_Idea

            SET strNombre               = COALESCE(${data.strNombre}, strNombre),
                intIdEstado             = COALESCE(${data.intIdEstado}, intIdEstado),
                dtmActualizacion        = COALESCE(GETDATE(), dtmActualizacion),
                strUsuarioActualizacion = COALESCE(${data.strUsuarioActualizacion},strUsuarioActualizacion)

            WHERE intId = ${data.intId}

            SELECT * FROM tbl_Idea WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `La persona ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue actualizada con éxito.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateEmpresa(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_InfoEmpresa

            SET strEstadoNegocio                  = COALESCE(${data.strEstadoNegocio}, strEstadoNegocio),
                strCuandoPlaneaComenzar           = COALESCE(${data.strCuandoComienzaEmpresa}, strCuandoPlaneaComenzar),
                strURLFileLogoEmpresa             = COALESCE(${data.strURLFileLogoEmpresa}, strURLFileLogoEmpresa),
                strNombreMarca                    = COALESCE(${data.strNombreMarca}, strNombreMarca),
                dtFechaFundacion                  = COALESCE(${data.dtFechaFundacion}, dtFechaFundacion),
                strLugarOperacion                 = COALESCE(${data.strLugarOperacion}, strLugarOperacion),
                strDepartamento                   = COALESCE(${data.arrDepartamento}, strDepartamento),
                strCiudad                         = COALESCE(${data.arrCiudad}, strCiudad),
                strBarrio                         = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia            = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strSectorEconomico                = COALESCE(${data.strSectorEconomico}, strSectorEconomico),
                strCategoriaProducto              = COALESCE(${data.strCategoriaProducto}, strCategoriaProducto),
                strCategoriaServicio              = COALESCE(${data.strCategoriaServicio}, strCategoriaServicio),
                strCategoriasSecundarias          = COALESCE(${data.arrCategoriasSecundarias}, strCategoriasSecundarias),
                strOtraCategoria                  = COALESCE(${data.strOtraCategoria}, strOtraCategoria),
                strDescProductosServicios         = COALESCE(${data.strDescProductosServicios}, strDescProductosServicios),
                strMateriaPrima                   = COALESCE(${data.strMateriaPrima}, strMateriaPrima),
                strNombreTecnica                  = COALESCE(${data.strNombreTecnica}, strNombreTecnica),
                strTiempoDedicacion               = COALESCE(${data.strTiempoDedicacion}, strTiempoDedicacion),
                btGeneraEmpleo                    = COALESCE(${data.btGeneraEmpleo}, btGeneraEmpleo),
                intNumeroEmpleados                = COALESCE(${data.intNumeroEmpleados}, intNumeroEmpleados),
                valorVentasMes                    = COALESCE(${data.dblValorVentasMes}, valorVentasMes),
                strFormasComercializacion         = COALESCE(${data.arrFormasComercializacion}, strFormasComercializacion),
                strMediosDigitales                = COALESCE(${data.arrMediosDigitales}, strMediosDigitales),
                btGrupoAsociativo                 = COALESCE(${data.btGrupoAsociativo}, btGrupoAsociativo),
                strAsociacionUnidadProdIndividual = COALESCE(${data.strAsociacionUnidadProdIndividual}, strAsociacionUnidadProdIndividual),
                strRequisitosLey                  = COALESCE(${data.arrRequisitosLey}, strRequisitosLey),
                strOtrosRequisitosLey             = COALESCE(${data.strOtrosRequisitosLey}, strOtrosRequisitosLey),
                dtmActualizacion                  = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario                        = COALESCE(${data.strUsuario}, strUsuario)

            WHERE intIdEmpresario = ${data.intIdEmpresario}

            SELECT * FROM tbl_InfoEmpresa WHERE intIdEmpresario = ${data.intIdEmpresario}`;

            let result = {
                error: false,
                data: response.recordset[0]
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateEmpresa de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async updateInfoAdicional(data){
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`

            UPDATE tbl_InfoAdicional

            SET strPrincipalesNecesidades  = COALESCE(${data.strPrincipalesNecesidades}, strPrincipalesNecesidades),
                btInteresadoProcesoCMM     = COALESCE(${data.btInteresadoProcesoCMM}, btInteresadoProcesoCMM),
                strTemasCapacitacion       = COALESCE(${data.arrTemasCapacitacion}, strTemasCapacitacion),
                strComoSeEntero            = COALESCE(${data.arrComoSeEntero}, strComoSeEntero),
                strOtroComoSeEntero        = COALESCE(${data.strOtroComoSeEntero}, strOtroComoSeEntero),
                strMediosDeComunicacion    = COALESCE(${data.arrMediosDeComunicacion}, strMediosDeComunicacion),
                strOtrosMediosComunicacion = COALESCE(${data.strOtrosMediosComunicacion}, strOtrosMediosComunicacion),
                btRecibirInfoCMM           = COALESCE(${data.btRecibirInfoCMM}, btRecibirInfoCMM),
                strRecomendaciones         = COALESCE(${data.strRecomendaciones}, strRecomendaciones),
                dtmActualizacion           = COALESCE(GETDATE(), dtmActualizacion),
                strUsuario                 = COALESCE(${data.strUsuario}, strUsuario)

            WHERE intIdEmpresario = ${data.intIdEmpresario}

            SELECT * FROM tbl_InfoAdicional WHERE intIdEmpresario = ${data.intIdEmpresario}`;

            let result = {
                error: false,
                data: response.recordset[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateInfoAdicional de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Empresario WHERE intId = ${data.intId}`;

            let result = {
                error: false,
                msg: "El empresario fue eliminado con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteInfoEmpresa(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_InfoEmpresa WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "La información de la empresa fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteInfoEmpresa de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async deleteInfoAdicional(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_InfoAdicional WHERE intIdEmpresario = ${data.intId}`;

            let result = {
                error: false,
                msg: "La información de la empresa fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteInfoAdicional de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT 
            
            Empresario.intId,
            Empresario.strNombres,
            Empresario.strApellidos,
            Empresario.strTipoDocto,
            Empresario.strNroDocto,
            Empresario.strLugarExpedicionDocto,
            Empresario.dtFechaExpedicionDocto,
            Empresario.dtFechaNacimiento,
            Empresario.strGenero,
            Empresario.strCelular1,
            Empresario.strCelular2,
            Empresario.strCorreoElectronico1,
            Empresario.strCorreoElectronico2,
            Empresario.strNivelEducativo,
            Empresario.strTitulos,
            Empresario.strCondicionDiscapacidad,
            Empresario.strSede,
            Empresario.strModalidadIngreso,
            Empresario.dtFechaVinculacion,
            Empresario.strEstadoVinculacion,
            Empresario.strTipoVinculacion,
            Empresario.strEstrato,
            Empresario.strDepartamento,
            Empresario.strCiudad,
            Empresario.strBarrio,
            Empresario.strDireccionResidencia,
            Empresario.strUrlFileFoto,
            (
                SELECT * FROM tbl_InfoAdicional Adicional
                WHERE Adicional.intIdEmpresario = Empresario.IntId
                FOR JSON PATH
            ) as objInfoAdicional

            From tbl_empresario Empresario

            WHERE (Empresario.intId = ${data.intId} OR ${data.intId} IS NULL)
            AND   (Empresario.strNombres = ${data.strNombres} OR ${data.strNombres} IS NULL)
            AND   (Empresario.strApellidos = ${data.strApellidos} OR ${data.strApellidos} IS NULL)
            AND   (Empresario.strNroDocto = ${data.strNroDocto} OR ${data.strNroDocto} IS NULL)
            AND   (Empresario.strCorreoElectronico1 = ${data.strCorreoElectronico} OR ${data.strCorreoElectronico} IS NULL)
            AND   (Empresario.strSede = ${data.strSede} OR ${data.strSede} IS NULL)
            AND   (Empresario.strEstadoVinculacion = ${data.strEstadoVinculacion} OR ${data.strEstadoVinculacion} IS NULL)
            AND   (Empresario.strTipoVinculacion = ${data.strTipoVinculacion} OR ${data.strTipoVinculacion} IS NULL)
            AND   (Empresario.dtFechaVinculacion = ${data.dtFechaVinculacion} OR ${data.dtFechaVinculacion} IS NULL)`;

            let arrNewData = response.recordsets[0];

            for (let i = 0; i < arrNewData.length; i++) {
                if (arrNewData[i].objInfoEmpresa) {
                    let { objInfoEmpresa } = arrNewData[i];
                    

                    if (validator.isJSON(objInfoEmpresa)) {
                        objInfoEmpresa = JSON.parse(
                            objInfoEmpresa
                        );
                        arrNewData[i].objInfoEmpresa =
                        objInfoEmpresa;
                    }
                }
                if (arrNewData[i].objInfoAdicional) {
                    let { objInfoAdicional } = arrNewData[i];
                    

                    if (validator.isJSON(objInfoAdicional)) {
                        objInfoAdicional = JSON.parse(
                            objInfoAdicional
                        );
                        arrNewData[i].objInfoAdicional =
                        objInfoAdicional;
                    }
                }
            }

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
            console.log(error)
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getNroDocumentoEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT strNroDocto FROM tbl_Empresario where strNroDocto = ${data.strNroDocto}`;

            let result = {
                error: false,
                data: response.recordset[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getNroDocumentoEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async getIdTipoEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`    
                SELECT intId FROM tbl_TipoEmpresario
                WHERE (strNombre = ${data.strNombre})`;

            let result = {
                error: false,
                data: response.recordset[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getIdTipoEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoEmpresarios;
