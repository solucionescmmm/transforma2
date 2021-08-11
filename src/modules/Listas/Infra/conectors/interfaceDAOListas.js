//classs
const classDaoSql = require("../repository/daoListas");

class interfaceDAOListas {
    async getListas(data) {
        const dao = new classDaoSql();
        let result = await dao.getListas(data);
        return result;
    }
}
module.exports = interfaceDAOListas;
