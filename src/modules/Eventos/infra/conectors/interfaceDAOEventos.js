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

    async setObjetivosEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setObjetivosEventos(data);
        return result;
    }

    async setAsistentesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAsistentesEventos(data);
        return result;
    }

    async setAsistentesTercerosEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAsistentesTercerosEventos(data);
        return result;
    }

    async setAsistentesSesionesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAsistentesSesionesEventos(data);
        return result;
    }

    async setAsistentesTercerosSesionesEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.setAsistentesTercerosSesionesEventos(data);
        return result;
    }

    async getEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.getEventos(data);
        return result;
    }

    async getTiposEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.getTiposEventos(data);
        return result;
    }

    async getEstadosEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.getEstadosEventos(data);
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

    async updateObjetivosEventos(data) {
        const dao = new classDaoSql();
        let result = await dao.updateObjetivosEventos(data);
        return result;
    }
}

module.exports = interfaceDAOEventos