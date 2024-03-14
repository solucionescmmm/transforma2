//clases
const classInterfaceDAOLocalizaciones = require("../infra/conectors/interfaceDAOLocalizaciones")

const getPaises = async()=>{
    let dao = new classInterfaceDAOLocalizaciones()
    let result = await dao.getPaises()
    return result

}
module.exports = getPaises;