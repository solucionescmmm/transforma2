//classDao
const classDaoSql = require("../repository/daoEventos")

class interfaceDAOEventos {
    async setEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setEventos(data);
        return result;
    }

    async updateEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEventos(data);
        return result;
    }

    async getEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.getEventos(data)
        return result
    }

    async getTiposEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.getTiposEventos(data)
        return result
    }
}
module.exports = interfaceDAOEventos