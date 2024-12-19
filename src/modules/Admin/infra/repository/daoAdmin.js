//librerias
const sql = require("mssql");
const validator = require("validator").default;

//Conexion
const {
    conexion,
} = require("../../../../common/config/confSQL_connectionTransfroma");

class daoAdmin {
    async setCargaMasiva(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            // Función para manejar valores nulos
            const toSQLValue = (value) => (value === undefined || value === null || value === '' ? null : value);

            let response = await conn.query`    
                INSERT INTO TMP_CREAR_PERSONA_EMPRESARIA VALUES
                    (
                        ${toSQLValue(data.NumeroDocto)},                    -- NumeroDocto
                        ${toSQLValue(data.TipoDocumento)},                 -- TipoDocumento
                        ${toSQLValue(data.Nombres)},                       -- Nombres
                        ${toSQLValue(data.Apellidos)},                     -- Apellidos
                        ${toSQLValue(data.LugarExpedicionDocto)},          -- LugarExpedicionDocto
                        ${toSQLValue(data.FechaExpedicionDocto)},          -- FechaExpedicionDocto
                        ${toSQLValue(data.FechaNacimiento)},               -- FechaNacimiento
                        ${toSQLValue(data.Genero)},                        -- Genero
                        ${toSQLValue(data.Celular1)},                      -- Celular1
                        ${toSQLValue(data.Celular2)},                      -- Celular2
                        ${toSQLValue(data.Correo1)},                       -- Correo1
                        ${toSQLValue(data.Correo2)},                       -- Correo2
                        ${toSQLValue(data.NivelEducativo)},                -- NivelEducativo
                        ${toSQLValue(data.Titulo)},                        -- Titulo
                        ${toSQLValue(data.CondicionDiscapacidad)},         -- CondicionDiscapacidad
                        ${toSQLValue(data.EstratoSocioeconomico)},         -- EstratoSocioeconomico
                        ${toSQLValue(data.PerfilSensible)},                -- PerfilSensible
                        ${toSQLValue(JSON.stringify(data.Pais))}, -- Pais
                        ${toSQLValue(JSON.stringify(data.Departamento))}, -- Departamento
                        ${toSQLValue(JSON.stringify(data.Ciudad))}, -- Ciudad
                        ${toSQLValue(data.Barrio)},                        -- Barrio
                        ${toSQLValue(data.Direccion)},                     -- Direccion
                        ${toSQLValue(data.EstadoNegocio)},                 -- EstadoNegocio
                        ${toSQLValue(data.CuandoPlaneaComenzar)},          -- CuandoPlaneaComenzar
                        ${toSQLValue(data.NombreEmpresa)},                 -- NombreEmpresa
                        ${toSQLValue(data.FechaFundacion)},                -- FechaFundacion
                        ${toSQLValue(data.LugarOperacion)},                -- LugarOperacion
                        ${toSQLValue(data.DireccionEmpresa)},              -- DireccionEmpresa
                        ${toSQLValue(JSON.stringify(data.DepartamentoEmpresa))}, -- DepartamentoEmpresa
                        ${toSQLValue(JSON.stringify(data.CiudadEmpresa))}, -- CiudadEmpresa
                        ${toSQLValue(data.BarrioEmpresa)},                 -- BarrioEmpresa
                        ${toSQLValue(data.SectorEconomico)},               -- SectorEconomico
                        ${toSQLValue(data.CategoriaProductos)},            -- CategoriaProductos
                        ${toSQLValue(data.CategoriaServicios)},            -- CategoriaServicios
                        ${toSQLValue(JSON.stringify(data.CategoriaSecundaria))},           -- CategoriaSecundaria
                        ${toSQLValue(data.OtraCategoria)},                 -- OtraCategoria
                        ${toSQLValue(data.DescribeProductosServicios)},    -- DescribeProductosServicios
                        ${toSQLValue(data.MateriaPrima)},                  -- MateriaPrima
                        ${toSQLValue(data.NombreTecnica)},                 -- NombreTecnica
                        ${toSQLValue(data.TiempoDedicacion)},              -- TiempoDedicacion
                        ${toSQLValue(data.GeneraEmpleoOtrasPersonas)},     -- GeneraEmpleoOtrasPersonas
                        ${toSQLValue(data.NumeroEmpleosGenerados)},        -- NumeroEmpleosGenerados
                        ${toSQLValue(data.ValorVentasMes)},                -- ValorVentasMes
                        ${toSQLValue(JSON.stringify(data.RequerimientosLegales))},         -- RequerimientosLegales
                        ${toSQLValue(data.OtrosRequerimientosLegales)},    -- OtrosRequerimientosLegales
                        ${toSQLValue(JSON.stringify(data.FormasComercializacion))},        -- FormasComercializacion
                        ${toSQLValue(JSON.stringify(data.MediosDigitales))},               -- MediosDigitales
                        ${toSQLValue(data.PerteneceGrupoAsociativo)},      -- PerteneceGrupoAsociativo
                        ${toSQLValue(data.ComoDeseaRegistrarse)},          -- ComoDeseaRegistrarse
                        ${toSQLValue(data.PrincipalesNecesidades)},        -- PrincipalesNecesidades
                        ${toSQLValue(data.InteresFormacionCapacitacion)},  -- InteresFormacionCapacitacion
                        ${toSQLValue(JSON.stringify(data.TemasRecibirAsesoria))},          -- TemasRecibirAsesoria
                        ${toSQLValue(JSON.stringify(data.ComoConocioDeMisManos))},         -- ComoConocioDeMisManos
                        ${toSQLValue(JSON.stringify(data.CanalesEnvioInformacion))},       -- CanalesEnvioInformacion
                        ${toSQLValue(data.AutorizaEnvioInformacion)},      -- AutorizaEnvioInformacion
                        ${toSQLValue(data.ComentariosIdeas)},              -- ComentariosIdeas
                        ${toSQLValue(data.Sede)},                          -- Sede
                        ${toSQLValue(data.ModalidadIngreso)},              -- ModalidadIngreso
                        ${toSQLValue(data.FechaVinculacion)},              -- FechaVinculacion
                        ${toSQLValue(data.TipoVinculacion)},             -- TipoVinculacion
                        ${toSQLValue(data.EstadoVinculacion)}              -- EstadoVinculacion
                    )`;

            let result = {
                error: false,
                data: response.rowsAffected[0],
                msg: `Fueron cargados un total de ${response.rowsAffected[0]} empresarios correctamente.`,
            };

            sql.close(conexion);

            return result;
        } catch (error) {
            let result = {
                error: true,
                msg: error.message || "Error en el método setCargaMasiva.",
            };

            sql.close(conexion);

            return result;
        }
    }

    async truncateTmpCrearPersonaEmpresaria() {
        try {
            // Crear una nueva conexión
            let conn = await new sql.ConnectionPool(conexion).connect();

            // Ejecutar el comando TRUNCATE TABLE
            await conn.query`TRUNCATE TABLE TMP_CREAR_PERSONA_EMPRESARIA`;

            sql.close(); // Cerrar conexión
            return {
                error: false,
                msg: "La tabla TMP_CREAR_PERSONA_EMPRESARIA fue truncada con éxito.",
            };
        } catch (error) {
            sql.close(); // Cerrar conexión en caso de error
            return {
                error: true,
                msg: error.message || "Error al truncar la tabla TMP_CREAR_PERSONA_EMPRESARIA.",
            };
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

    async sp_setIdeaEmpresario(data) {
        try {
            let conn = await new sql.ConnectionPool(conexion).connect();

            let response = await conn
                .request()
                .input("p_strUsuario", sql.VarChar, data.strEmail)
                .execute("sp_setIdeaEmpresario");

            let result = {
                error: false,
                data: response.recordsets[0]
            };

            sql.close(conexion);
            return result;
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo sp_setFlujoAcompañamiento de la clase daoAcompañamientos",
            };

            sql.close(conexion);

            return result;
        }
    }
}

module.exports = daoAdmin