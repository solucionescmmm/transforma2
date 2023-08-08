//classDao
const classDaoSql = require("../repository/daoEventos")

class interfaceDAOEventos {
    async setEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setEventos(data);
        return result;
    }

    async setSesionesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setSesionesEventos(data);
        return result;
    }

    async setEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setEventos(data);
        return result;
    }

    async setEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setEventos(data);
        return result;
    }

    async setAreasEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAreasEventos(data);
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

    async getIdEstadoEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.getIdEstadoEventos(data)
        return result
    }

}
module.exports = interfaceDAOEventos