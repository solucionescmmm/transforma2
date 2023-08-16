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

    async setAsistentesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAsistentesEventos(data);
        return result;
    }

    async setAsistentesSesionesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAsistentesSesionesEventos(data);
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

    async updateSesionesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.updateSesionesEventos(data);
        return result;
    }

    async getEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.getEventos(data)
        return result
    }

    async getSesionesEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.getSesionesEventos(data)
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

    async getIntNumSesiones(data) {
        const dao = new classDaoSql()
        let result = await dao.getIntNumSesiones(data)
        return result
    }

    async getAsistentesEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.getAsistentesEventos(data)
        return result
    }

    async deleteAreasEventos(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteAreasEventos(data)
        return result
    }

}
module.exports = interfaceDAOEventos