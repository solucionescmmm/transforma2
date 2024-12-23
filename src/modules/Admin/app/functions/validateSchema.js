const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv); // Habilitar soporte para formatos como "email" y "date"

ajv.addFormat("customDate", {
    type: "string",
    validate: (dateString) => {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Formato DD/MM/YYYY
        return regex.test(dateString);
    },
});

/**
 * Esquema de validación para un objeto del array
 */
const objSchema = {
    type: "object",
    properties: {
        NumeroDocto: { type: "string" },
        TipoDocumento: { type: "string" },
        Nombres: { type: "string" },
        Apellidos: { type: "string" },
        LugarExpedicionDocto: { type: "string" },
        FechaExpedicionDocto: { type: "string", format: "customDate" },
        FechaNacimiento: { type: "string", format: "customDate" },
        Genero: { type: "string" },
        Celular1: { type: "number" },
        Celular2: { type: "number" },
        Correo1: { type: "string", format: "email" },
        Correo2: { type: "string", format: "email" },
        NivelEducativo: { type: "string" },
        Titulo: { type: "string" },
        CondicionDiscapacidad: { type: "string" },
        EstratoSocioeconomico: { type: "integer", minimum: 1 },
        PerfilSensible: { type: "boolean" },
        Pais: { type: "object", properties: { country_name: { type: "string" } }, required: ["country_name"] },
        Departamento: { type: "object", properties: { region_name: { type: "string" } }, required: ["region_name"] },
        Ciudad: { type: "object", properties: { city_name: { type: "string" } }, required: ["city_name"] },
        Barrio: { type: "string" },
        Direccion: { type: "string" },
        EstadoNegocio: { type: "string" },
        CuandoPlaneaComenzar: { type: "string" },
        NombreEmpresa: { type: "string" },
        FechaFundacion: { type: "string", format: "customDate" },
        LugarOperacion: { type: "string" },
        DireccionEmpresa: { type: "string" },
        DepartamentoEmpresa: { type: "object", properties: { region_name: { type: "string" } }, required: ["region_name"] },
        CiudadEmpresa: { type: "object", properties: { city_name: { type: "string" } }, required: ["city_name"] },
        BarrioEmpresa: { type: "string" },
        SectorEconomico: { type: "string" },
        CategoriaProductos: { type: "string" },
        CategoriaServicios: { type: "string" },
        CategoriaSecundaria: { type: "array" },
        OtraCategoria: { type: "string" },
        DescribeProductosServicios: { type: "string" },
        MateriaPrima: { type: "string" },
        NombreTecnica: { type: "string" },
        TiempoDedicacion: { type: "string" },
        GeneraEmpleoOtrasPersonas: { type: "boolean" },
        NumeroEmpleosGenerados: { type: "integer", minimum: 0 },
        ValorVentasMes: { type: "number", minimum: 0 },
        RequerimientosLegales: { type: "array" },
        OtrosRequerimientosLegales: { type: "string" },
        FormasComercializacion: { type: "array" },
        MediosDigitales: { type: "array" },
        PerteneceGrupoAsociativo: { type: "string" },
        ComoDeseaRegistrarse: { type: "string" },
        PrincipalesNecesidades: { type: "string" },
        InteresFormacionCapacitacion: { type: "array" },
        TemasRecibirAsesoria: { type: "array" },
        ComoConocioDeMisManos: { type: "array" },
        CanalesEnvioInformacion: { type: "array" },
        AutorizaEnvioInformacion: { type: "string" },
        ComentariosIdeas: { type: "string" },
        Sede: { type: "string" },
        ModalidadIngreso: { type: "string" },
        FechaVinculacion: { type: "string", format: "customDate" },
        TipoVinculacion: { type: "string" },
        EstadoVinculacion: { type: "string" }
    },
    required: [
        "Sede",
        "ModalidadIngreso",
        "FechaVinculacion",
        "TipoVinculacion",
        "Nombres",
        "Apellidos",
        "TipoDocumento",
        "NumeroDocto",
        "Genero",
        "Celular1",
        "Pais",
        "Departamento",
        "Ciudad",
        "EstadoNegocio",
        "NombreEmpresa",
        "LugarOperacion",
        "SectorEconomico",
        "DescribeProductosServicios",
        "TiempoDedicacion",
        "GeneraEmpleoOtrasPersonas",
        "ValorVentasMes",
    ]
};

/**
 * Esquema para el array de objetos
 */
const arraySchema = {
    type: "array",
    items: objSchema
};

/**
 * Preprocesa los datos para transformar campos tipo '[]' en arrays reales
 * @param {Array} data - Datos a procesar
 * @returns {Array} Datos procesados
 */
function preprocessData(data) {
    return data.map((item) => {
        const processedItem = { ...item };

        // Lista de campos que deben ser convertidos a arrays
        const fieldsToParse = [
            "CanalesEnvioInformacion",
            "ComoConocioDeMisManos",
            "MediosDigitales",
            "CategoriaSecundaria",
            "RequerimientosLegales",
            "FormasComercializacion",
            "TemasRecibirAsesoria"
        ];

        // Lista de campos que deben ser convertidos a fechas
        const dateFields = [
            "FechaExpedicionDocto",
            "FechaNacimiento",
            "FechaFundacion",
            "FechaVinculacion"
        ];

        // Lista de campos que deben ser convertidos a objetos específicos
        const objectFields = {
            Pais: "country_name",
            Departamento: "region_name",
            Ciudad: "city_name",
            DepartamentoEmpresa: "region_name",
            CiudadEmpresa: "city_name"
        };

        // Lista de campos que deben convertirse a cadenas
        const stringFields = ["NumeroDocto"];

        // Campos a limpiar con trim
        const trimFields = ["Nombres", "Apellidos"];

        const booleanFields = ["PerfilSensible", "GeneraEmpleoOtrasPersonas"];

        fieldsToParse.forEach((field) => {
            if (!processedItem[field] || typeof processedItem[field] !== "string") {
                processedItem[field] = []; // Si no existe o no es una cadena, asigna un array vacío
            } else {
                try {
                    processedItem[field] = JSON.parse(processedItem[field]);
                } catch (e) {
                    processedItem[field] = []; // Si falla la conversión, asigna un array vacío
                }
            }
        });

        dateFields.forEach((field) => {
            if (processedItem[field] && typeof processedItem[field] === "string") {
                const [day, month, year] = processedItem[field].split("/");
                processedItem[field] = `${day}/${month}/${year}`;
            }
        });

        Object.keys(objectFields).forEach((field) => {
            if (processedItem[field] && typeof processedItem[field] === "string") {
                processedItem[field] = { [objectFields[field]]: processedItem[field] };
            }
        });

        stringFields.forEach((field) => {
            if (processedItem[field] !== undefined) {
                processedItem[field] = String(processedItem[field]);
            }
        });

        trimFields.forEach((field) => {
            if (processedItem[field] && typeof processedItem[field] === "string") {
                processedItem[field] = processedItem[field].trim();
            }
        });

        if (processedItem.NumeroDocto && typeof processedItem.NumeroDocto === "string") {
            processedItem.NumeroDocto = processedItem.NumeroDocto.replace(/\s+/g, "");
        }

        booleanFields.forEach((field) => {
            if (processedItem[field] && typeof processedItem[field] === "string") {
                // Normalizar el texto para eliminar tildes y convertir a minúsculas
                const normalizedValue = processedItem[field]
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase();

                processedItem[field] = normalizedValue === "si";
            }
        });

        return processedItem;
    });
}


/**
 * Función para validar datos
 * @param {Array} data - Array de datos a validar
 * @returns {Object} Resultado de la validación
 */
function validateDataArray(data) {
    const preprocessedData = preprocessData(data); // Preprocesar datos
    const validateArray = ajv.compile(arraySchema);
    const valid = validateArray(preprocessedData);

    if (!valid) {
        // Mapea los errores a un formato legible
        return validateArray.errors.map((error) => {
            const path = error.instancePath.split("/").filter(Boolean); // Divide el path
            const index = path[0]; // Primer valor será el índice del array
            const column = path[1]; // Nombre de la columna fallida
            const failedObject = preprocessedData[index] || {}; // Obtiene el objeto fallido, si existe

            return {
                index: parseInt(index, 10) + 2, // Índice del objeto en el array
                name: `${failedObject?.Nombres || ""} ${failedObject?.Apellidos || ""}`.trim() || null,
                document: failedObject?.NumeroDocto || null,
                column: column || null, // Nombre del campo fallido
                error: error.message // Mensaje de error
            };
        });
    }

    // Si los datos son válidos, retorna el objeto procesado
    return { valid: true, data: preprocessedData };
}


// Exportar la función
module.exports = validateDataArray;
