//classDao
const classDaoSql = require("../repository/daoTercero")

class interfaceDAOTercero {
    async setTercero(data) {
        const dao = new classDaoSql();
        let result = await dao.setTercero(data);
        return result;
    }

    async updateTercero(data) {
        const dao = new classDaoSql()
        let result = await dao.updateTercero(data)
        return result
    }

    async deleteTercero(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteTercero(data)
        return result
    }

    async getTercero(data) {
        const dao = new classDaoSql()
        let result = await dao.getTercero(data)
        return result
    }
}
module.exports = interfaceDAOTercero