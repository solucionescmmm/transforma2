//clases
const classInterfaceDAOLocalizaciones = require("../infra/conectors/interfaceDAOLocalizaciones")

const getMunicipios = async(data)=>{

    let {strDepartamento} = data

    if (!strDepartamento) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceDAOLocalizaciones()
    let result = await dao.getMunicipios(data)
    return result

}
module.exports = getMunicipios;