const classDAO = require("../repository/daoRutas");

class interfaceDAORutas {
    async setRutas(data) {
        let dao = new classDAO();
        let query = await dao.setRutas(data);
        return query;
    }

    async setFases(data) {
        let dao = new classDAO();
        let query = await dao.setFases(data);
        return query;
    }

    async setPaquetesFases(data) {
        let dao = new classDAO();
        let query = await dao.setPaquetesFases(data);
        return query;
    }

    async setServiciosFases(data) {
        let dao = new classDAO();
        let query = await dao.setServiciosFases(data);
        return query;
    }

    async setObjetivosFases(data) {
        let dao = new classDAO();
        let query = await dao.setObjetivosFases(data);
        return query;
    }

    async setObjetivosPaquetesFases(data) {
        let dao = new classDAO();
        let query = await dao.setObjetivosPaquetesFases(data);
        return query;
    }

    async setObjetivosServiciosFases(data) {
        let dao = new classDAO();
        let query = await dao.setObjetivosServiciosFases(data);
        return query;
    }

    async getRutas(data) {
        let dao = new classDAO();
        let query = await dao.getRutas(data);
        return query;
    }

    async getEstadosRutas(data) {
        let dao = new classDAO();
        let query = await dao.getEstadosRutas(data);
        return query;
    }

    async getIdEstadoRutas(data) {
        let dao = new classDAO();
        let query = await dao.getIdEstadoRutas(data);
        return query;
    }

    async updateRutas(data) {
        let dao = new classDAO();
        let query = await dao.updateRutas(data);
        return query;
    }

    async deleteRutas(data) {
        let dao = new classDAO();
        let query = await dao.deleteRutas(data);
        return query;
    }
}

module.exports = interfaceDAORutas;