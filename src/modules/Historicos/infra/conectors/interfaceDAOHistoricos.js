//classDao
const classDaoSql = require("../repository/daoHistoricos")

class interfaceDAOHistoricos {
    async setHistorico(data) {
        const dao = new classDaoSql();
        let result = await dao.setHistorico(data);
        return result;
    }

    async updateHistorico(data) {
        const dao = new classDaoSql();
        let result = await dao.updateHistorico(data);
        return result;
    }

    async getHistorico(data) {
        const dao = new classDaoSql()
        let result = await dao.getHistorico(data)
        return result
    }

    async getHistoricoByFuente(data) {
        const dao = new classDaoSql()
        let result = await dao.getHistoricoByFuente(data)
        return result
    }

    async getIdFuenteHistorico(data) {
        const dao = new classDaoSql()
        let result = await dao.getIdFuenteHistorico(data)
        return result
    }
}
module.exports = interfaceDAOHistoricos