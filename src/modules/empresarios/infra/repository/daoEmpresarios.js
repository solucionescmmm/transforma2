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
        DECLARE @intId INTERGER;

        INSER INTO tbl_Empresario VALUES
        (
            ${data.strNombres}, 
            ${data.strApellidos},
            ${data.dtFechaNacimiento},
            ${data.intIdTipoDocto},
            ${data.strNroDocto},
            ${data.strLugarExpedicionDocto},
            ${data.dtFechaExpedicionDocto},
            ${data.intIdSexo},
            ${data.strCelular},
            ${data.strCorreoElectronico},
            ${data.intIdNivelEducativo},
            ${data.strTitulos},
            ${data.intIdCondicionDiscapacidad},
            ${data.intIdSede},
            ${data.intIdTipoEmpresario},
            ${data.dtFechaVinculacion},
            ${data.intIdestado},
            ${data.strUrlFoto},
            ${data.strUsuario},
            ${data.intIdEspacioJornada}
        );
        SET @intId = SCOPE_IDENTITY();

        SELECT * FROM tbl_Empresario WHERE intId = @intId`;
            let result = {
                error: false,
                data: response.recordset[0],
                msg: `El empresario con nombre ${response.recordset[0].strNombres}, fue registrado con éxito, con el identificador #${response.recordset[0].intId}.`,
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
                ${data.strUrlLogo},
                ${data.dtFechaFundacion},
                ${data.intIdUnidadProdOperacion},
                ${data.strDireccion},
                ${data.strMunicipio},
                ${data.strBarrio},
                ${data.intIdSectorEconomico},
                ${data.intEstrato},
                ${data.strCategoriaProducto}
                ${data.strOtraCategoria},
                ${data.strCategoriaServicio},
                ${data.btGeneraEmpleo},
                ${data.intNumeroEmpleados},
                ${data.valorVentasMes},
                ${data.strMediosUtilizadosVentas},
                ${data.btNombreMarca},
                ${data.btLogotipo},
                ${data.btEtiquetaEmpaque},
                ${data.btMejorarEtiquetaEmpaque},
                ${data.strPrincipalesNecesidades},
                ${data.intIdRequisitoLey},
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
                ${data.intIdEmpresario},
                ${data.btElaboraProductoServicio},
                ${data.btTieneSoloIdea},
                ${data.intIdCuandoComienzaEmpresa},
                ${data.intIdTiempoDedicacion},
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
}
module.exports = daoEmpresarios;
