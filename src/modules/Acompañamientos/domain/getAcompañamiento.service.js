//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

const getAcompañamiento = async (objParams, strDataUser) => {
    let = { intId, intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada");
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

    let dao = new classInterfaceAcompañamientos();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null
    };

    let arrayData = await dao.getAcompañamiento(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data?.length > 0) {

            let array = arrayData.data.reverse();
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoPrincipal = {};
                
                objInfoPrincipal = {
                    intId: array[i]?.intId,
                    intIdIdea: array[i]?.intIdIdea,
                    intTipoAcomp: array[i]?.intIdTipoAcompañamiento,
                    strTipoAcompañamiento: array[i]?.strTipoAcompañamiento,
                    strResponsables: JSON.parse(array[i]?.arrSesionAcompañamiento[0]?.strResponsables || ""),
                    strUbicacion:array[i]?.arrSesionAcompañamiento[0]?.strUbicacion,
                    dtmCreacion: array[i]?.dtmCreacion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    strEstadoRuta: array[i]?.strEstadoRuta,
                };
                
                let arrSesionAcompañamiento = array[i]?.arrSesionAcompañamiento
                
                for (let j = 0; j < arrSesionAcompañamiento.length; j++) {
                    arrSesionAcompañamiento[j]={
                        ...arrSesionAcompañamiento[j],
                        strResponsables: JSON.parse(arrSesionAcompañamiento[j]?.strResponsables || ""),
                        strNombreServicio: arrSesionAcompañamiento[j]?.strNombreServicio || arrSesionAcompañamiento[j]?.strNombrePaquete || "N/A"
                    }
                    
                }

                data[i] = {
                    objInfoPrincipal,
                    arrSesionAcompañamiento
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
module.exports = getAcompañamiento;
