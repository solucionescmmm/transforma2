//clases
const classInterfaceDAOLocalizaciones = require("../infra/conectors/interfaceDAOLocalizaciones")

const getLocalidades = async(data)=>{

    let {strDepartamento, strCuidad} = data
    console.log(strDepartamento, strCuidad)

    if (!strDepartamento && !strCuidad) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    } 

    
    let dao = new classInterfaceDAOLocalizaciones()
    let result = await dao.getLocalidades(data)
    return result

}
module.exports = getLocalidades;