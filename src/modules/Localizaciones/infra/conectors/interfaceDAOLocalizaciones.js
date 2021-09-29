//clases
const classSQL = require("../repository/daoLocalizaciones");

class interfaceDAOLocalizaciones{
    async getDepartamentos(){
        const dao = new classSQL();
        let result = await dao.getDepartamento();
        return result;
    }
}
module.exports = interfaceDAOLocalizaciones