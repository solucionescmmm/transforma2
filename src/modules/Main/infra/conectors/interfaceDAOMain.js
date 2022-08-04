//classs
const classDaoSql = require("../repository/daoMain");

class interfaceDAOMain {
    async getIdFuenteHistorico(data) {
        const dao = new classDaoSql();
        let result = await dao.getIdFuenteHistorico(data);
        return result;
    }
}
module.exports = interfaceDAOMain;