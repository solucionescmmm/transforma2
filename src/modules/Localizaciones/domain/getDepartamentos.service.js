//clases
const classInterfaceDAOLocalizaciones = require("../infra/conectors/interfaceDAOLocalizaciones")

const getDepartamento = async()=>{
    let dao = new classInterfaceDAOLocalizaciones()
    let result = await dao.getDepartamentos()
    return result

}
module.exports = getDepartamento;