//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoEmpresarios {
    async setEmpresario(data) {
        console.log(data);
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_Empresario VALUES
            (
                ${data.intId},
                ${data.strNombres},
                ${data.strApellidos},
                ${data.dtFechaNacimiento},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.strSexo},
                ${data.strCelular},
                ${data.strCorreoElectronico}
                ${data.strNivelEducativo},
                ${data.strTitulos},
                ${data.strCondicionDiscapacidad},
                ${data.strSede},
                ${data.strTipoEmpresario},
                ${data.dtFechaVinculacion},
                ${data.strEstado},
                ${data.strUrlFoto},
                ${data.strUsuario},
                ${data.strEspacioJornada}
            )
            
            SET @intId = SCOPE IDENTITY();

            SELECT * FROM tbl_Empresario WHERE intId = @intId`;
            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El empresario ${response.recordset[0].strNombres} ${response.recordset[0].strApellidos}, fue registrado con éxito.`,
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
                ${data.intId}
                ${data.intIdEmpresario},
                ${data.strUrlLogo},
                ${data.dtFechaFundacion},
                ${data.strUnidadProdOperacion},
                ${data.strDireccion},
                ${data.strMunicipio},
                ${data.strBarrio},
                ${data.intIdSectorEconomico},
                ${data.intEstrato},
                ${data.intIdNombreCategoriaProducto}
                ${data.intIdNombreCategoriaServicio},
                ${data.strOtraCategoria},
                ${data.btGeneraEmpleo},
                ${data.intNumeroEmpleados},
                ${data.valorVentasMes},
                ${data.strMediosUtilizadosVentas},
                ${data.btNombreMarca},
                ${data.btLogotipo},
                ${data.btEtiquetaEmpaque},
                ${data.btMejorarEtiquetaEmpaque},
                ${data.strPrincipalesNecesidades},
                ${data.strRequisitoLey},
                ${data.strOtrosRequisitos},
                ${data.btInteresadoProcesoCMM},
                ${data.strTemasCapacitacion},
                ${data.strComoSeEntero},
                ${data.strOtrosMediosEntero},
                ${data.strMedioDeComunicacion},
                ${data.strOtroMedioComunicacion},
                ${data.btRecibirInfoCMM},
                ${data.strRecomendaciones},
                ${data.strUsuario}
            )

            SET @intId = SCOPE IDENTITY();

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

    async setEmprendimiento(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();
            let response = await conn.query`
            DECLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmprendimiento VALUES
            (
                ${data.intId}
                ${data.intIdEmpresario},
                ${data.btTieneSoloIdea},
                ${data.strPlaneaComenzar},
                ${data.strTiempoDedicacion},
                ${data.btGrupoAsociativo},
                ${data.btAsociacionUnidadProdIndividual},
                ${data.strProductosServicios},
                ${data.strMateriaPrima},
                ${data.strNombreTecnica},
                ${data.strUsuario}    
            )
            SET @intId = SCOPE IDENTITY();

            SELECT * FROM tbl_InfoEmprendimiento WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El emprendimiento #${response.recordset[0].intId} fue registrado con éxito, para el empresario #${response.recordset[0].intIdEmpresario}.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setEmprendimiento de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }

    async setEmpresarioSecundrio(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            CLARE @intId INTEGER;
            
            INSERT INTO tbl_InfoEmprendimiento VALUES
            (
                ${data.intId},
                ${data.intIdEmpresario},
                ${data.strNombresApellidos},
                ${data.strSexo},
                ${data.dtFechaNacimiento},
                ${data.strTipoDocto},
                ${data.strNroDocto},
                ${data.strLugarExpedicionDocto},
                ${data.dtFechaExpedicionDocto},
                ${data.strCelular},
                ${data.strCorreoElectronico},
                ${data.strUsuario}
            )
            SET @intId = SCOPE IDENTITY();

            SELECT * FROM tbl_InfoEmprendimiento WHERE intId = @intId`;

            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El emprendimiento #${response.recordset[0].intId} fue registrado con éxito, para el empresario #${response.recordset[0].intIdEmpresario}.`,
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

    async deleteEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            await conn.query`DELETE FROM tbl_Empresario WHERE intId = ${data.intIdEmpresario}`;

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
    async getEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT strNroDocto FROM tbl_Empresario where strNroDocto = ${data.strNroDocto}`;

            let result = {
                error: false,
                data:
                    response.recordsets[0].length > 0
                        ? response.recordsets[0]
                        : null,
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
    async getCategoriaEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn.query`
            SELECT intId FROM tbl_CategoriasProductos_Servicios where strNombreCategoria = ${data.strNombreCategoria}`;

            let result = {
                error: false,
                data: response.recordsets[0],
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo getCategoriaEmpresario de la clase daoEmpresarios",
            };

            sql.close(conexion);

            return result;
        }
    }
}
module.exports = daoEmpresarios;
