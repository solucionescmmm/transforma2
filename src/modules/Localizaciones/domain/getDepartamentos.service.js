//clases
const classInterfaceDAOLocalizaciones = require("../infra/conectors/interfaceDAOLocalizaciones")

const getDepartamento = async(data)=>{

    let {strPais} = data

    if (!strPais) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    console.log(data)

    let dao = new classInterfaceDAOLocalizaciones()
    let result = await dao.getDepartamentos(data)
    return result

}
module.exports = getDepartamento;