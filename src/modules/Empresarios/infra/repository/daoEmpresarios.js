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
                ${data.strDepartamento},
                ${data.strCiudad},
                ${data.strBarrio},
                ${data.strDireccionResidencia},
                ${data.strUrlFileFoto},
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

    async setEmpresa(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmpresa VALUES
            (
                ${data.intIdEmpresario},
                ${data.strURLFileLogoEmpresa},
                ${data.strNombreMarca},
                ${data.dtFechaFundacion},
                ${data.strLugarOperacion},
                ${data.strEstrato},
                ${data.strDepartamento},
                ${data.strCiudad},
                ${data.strBarrio},
                ${data.strDireccionResidencia},
                ${data.strSectorEconomico},
                ${data.strCategoriaProducto},
                ${data.strCategoriaServicio},
                ${data.strCategoriasSecundarias},
                ${data.strOtraCategoria},
                ${data.strDescProductosServicios},
                ${data.strMateriaPrima},
                ${data.strNombreTecnica},
                ${data.strTiempoDedicacion},
                ${data.btGeneraEmpleo},
                ${data.intNumeroEmpleados},
                ${data.valorVentasMes},
                ${data.strFormasComercializacion},
                ${data.strMediosDigitales},
                ${data.btGrupoAsociativo},
                ${data.strAsociacionUnidadProdIndividual},
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

    async setEmpresarioSecundrio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_EmpresarioSecundario VALUES
            (
                ${data.intIdEmpresarioPrincipal},
                ${data.strTipoRelacion},
                ${data.strNombres},
                ${data.strApellidos},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.strLugarExpedicionDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.dtFechaNacimiento},
                ${data.strGenero},
                ${data.strCelular},
                ${data.strCorreoElectronico},
                GETDATE(),
                ${data.strUsuario}
            )
            SET @intId = SCOPE_IDENTITY();

            SELECT * FROM tbl_EmpresarioSecundario WHERE intId = @intId`;

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
                    "Error en el metodo setEmpresarioSecundario de la clase daoEmpresarios",
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
                strDepartamento          = COALESCE(${data.strDepartamento}, strDepartamento),
                strCiudad                = COALESCE(${data.strCiudad}, strCiudad),
                strBarrio                = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia   = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strUrlFileFoto           = COALESCE(${data.strUrlFileFoto}, strUrlFileFoto),
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
                    "Error en el metodo setEmpresario de la clase daoEmpresarios",
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

            SET strURLFileLogoEmpresa             = COALESCE(${data.strURLFileLogoEmpresa}, strURLFileLogoEmpresa),
                strNombreMarca                    = COALESCE(${data.strNombreMarca}, strNombreMarca),
                dtFechaFundacion                  = COALESCE(${data.dtFechaFundacion}, dtFechaFundacion),
                strLugarOperacion                 = COALESCE(${data.strLugarOperacion}, strLugarOperacion),
                strEstrato                        = COALESCE(${data.strEstrato}, strEstrato),
                strDepartamento                   = COALESCE(${data.strDepartamento}, strDepartamento),
                strCiudad                         = COALESCE(${data.strCiudad}, strCiudad),
                strBarrio                         = COALESCE(${data.strBarrio}, strBarrio),
                strDireccionResidencia            = COALESCE(${data.strDireccionResidencia}, strDireccionResidencia),
                strSectorEconomico                = COALESCE(${data.strSectorEconomico}, strSectorEconomico),
                strCategoriaProducto              = COALESCE(${data.strCategoriaProducto}, strCategoriaProducto),
                strCategoriaServicio              = COALESCE(${data.strCategoriaServicio}, strCategoriaServicio),
                strCategoriasSecundarias          = COALESCE(${data.strCategoriasSecundarias}, strCategoriasSecundarias),
                strOtraCategoria                  = COALESCE(${data.strOtraCategoria}, strOtraCategoria),
                strDescProductosServicios         = COALESCE(${data.strDescProductosServicios}, strDescProductosServicios),
                strMateriaPrima                   = COALESCE(${data.strMateriaPrima}, strMateriaPrima),
                strNombreTecnica                  = COALESCE(${data.strNombreTecnica}, strNombreTecnica),
                strTiempoDedicacion               = COALESCE(${data.strTiempoDedicacion}, strTiempoDedicacion),
                btGeneraEmpleo                    = COALESCE(${data.btGeneraEmpleo}, btGeneraEmpleo),
                intNumeroEmpleados                = COALESCE(${data.intNumeroEmpleados}, intNumeroEmpleados),
                valorVentasMes                    = COALESCE(${data.valorVentasMes}, valorVentasMes),
                strFormasComercializacion         = COALESCE(${data.strFormasComercializacion}, strFormasComercializacion),
                strMediosDigitales                = COALESCE(${data.strMediosDigitales}, strMediosDigitales),
                btGrupoAsociativo                 = COALESCE(${data.btGrupoAsociativo}, btGrupoAsociativo),
                strAsociacionUnidadProdIndividual = COALESCE(${data.strAsociacionUnidadProdIndividual}, strAsociacionUnidadProdIndividual),
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

    async deleteEmpresarioSecundario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_EmpresarioSecundario WHERE intIdEmpresarioPrincipal = ${data.intIdEmpresarioPrincipal}`;

            let result = {
                error: false,
                msg: "La información del empresario secundario fue eliminada con éxito.",
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteEmpresarioSecundario de la clase daoEmpresarios",
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
                SELECT * FROM tbl_InfoEmpresa Empresa
                WHERE Empresa.intIdEmpresario = Empresario.intId
                FOR JSON PATH
            ) as objInfoEmpresa,
            (
                SELECT * FROM tbl_EmpresarioSecundario EmpresarioSec
                WHERE EmpresarioSec.intIdEmpresarioPrincipal = Empresario.intId
                FOR JSON PATH
            ) as arrEmpresarioSecundario

            FROM tbl_Empresario Empresario

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
                if (arrNewData[i].arrEmpresarioSecundario) {
                    let { arrEmpresarioSecundario } = arrNewData[i];

                    if (validator.isJSON(arrEmpresarioSecundario)) {
                        arrEmpresarioSecundario = JSON.parse(
                            arrEmpresarioSecundario
                        );
                        arrNewData[i].arrEmpresarioSecundario =
                            arrEmpresarioSecundario;
                    }
                }
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
            console.log(error);
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
                    "Error en el metodo deleteEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoEmpresarios;
