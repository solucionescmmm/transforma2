//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoHumanas");
const validator = require("validator").default;

const getDiagnosticoHumanas = async (objParams, strDataUser) => {
    let { intId,  intIdDiagnostico } = objParams;

    if (!intId && !intIdDiagnostico) {
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

    let arrayResultDiagnosticoHumanas = await dao.getResultDiagnosticoHumanas(query);

    let arrayData = await dao.getDiagnosticoHumanas(query);


    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico:array[i]?.intIdDiagnostico,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                };
                let objInfoEncuestaHumanas = {
                    strTomaDesiciones: array[i]?.strTomaDesiciones,
                    strMotivaciones: array[i]?.strMotivaciones,
                    strNivelVida: array[i]?.strNivelVida,
                    strRedesApoyoOtros: array[i]?.strRedesApoyoOtros,
                    strProyectoVidaEmpresa: array[i]?.strProyectoVidaEmpresa,
                    strHabilidadesAutonomia: array[i]?.strHabilidadesAutonomia,
                    strHabilidadesCapacidad: array[i]?.strHabilidadesCapacidad,
                    strHabilidadesComunicacion: array[i]?.strHabilidadesComunicacion,
                    strProyectoVidaEmprendimiento: array[i]?.strProyectoVidaEmprendimiento,
                    strHabilidadesCreatividad: array[i]?.strHabilidadesCreatividad,
                    strConfianza: array[i]?.strConfianza,
                    strActividadesDisminuyenActProductiva: array[i]?.strActividadesDisminuyenActProductiva,
                    strSituacionesDesistirEmprendimiento: JSON.parse(array[i]?.strSituacionesDesistirEmprendimiento),
                    strEquilibrioVida: JSON.parse(array[i]?.strEquilibrioVida),
                    strRedesApoyoPropia: array[i]?.strRedesApoyoPropia,
                    strObservaciones: array[i]?.strObservaciones
                }

                let objResultDiagnosticoHumanas = arrayResultDiagnosticoHumanas?.data

                data[i] = {
                    objInfoGeneral,
                    objInfoEncuestaHumanas,
                    objResultDiagnosticoHumanas
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
module.exports = getDiagnosticoHumanas;