//clases
const classSQL = require("../repository/daoLocalizaciones");

class interfaceDAOLocalizaciones{
    async getDepartamentos(){
        const dao = new classSQL();
        let result = await dao.getDepartamento();
        return result;
    }

    async getMunicipios(data){
        const dao = new classSQL()
        let result = await dao.getMunicipos(data)
        return result
    }

    async getLocalidades(data){
        const dao = new classSQL()
        let result = await dao.getLocalidades(data)
        return result
    }
}
module.exports = interfaceDAOLocalizaciones