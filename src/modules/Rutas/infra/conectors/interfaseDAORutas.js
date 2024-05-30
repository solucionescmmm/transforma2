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

    async setPagosFases(data) {
        let dao = new classDAO();
        let query = await dao.setPagosFases(data);
        return query;
    }

    async getRutas(data) {
        let dao = new classDAO();
        let query = await dao.getRutas(data);
        return query;
    }

    async getEstadoFase(data) {
        let dao = new classDAO();
        let query = await dao.getEstadoFase(data);
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

    async getIdTipoRutas(data) {
        let dao = new classDAO();
        let query = await dao.getIdTipoRutas(data);
        return query;
    }

    async getContadorRutas(data) {
        let dao = new classDAO();
        let query = await dao.getContadorRutas(data);
        return query;
    }

    async getRutasActivas(data) {
        let dao = new classDAO();
        let query = await dao.getRutasActivas(data);
        return query;
    }

    async getServicioFases(data) {
        let dao = new classDAO();
        let query = await dao.getServicioFases(data);
        return query;
    }

    async getPaqueteFases(data) {
        let dao = new classDAO();
        let query = await dao.getPaqueteFases(data);
        return query;
    }

    async getMotivosCancelacion(data) {
        let dao = new classDAO();
        let query = await dao.getMotivosCancelacion(data);
        return query;
    }

    async updateRutas(data) {
        let dao = new classDAO();
        let query = await dao.updateRutas(data);
        return query;
    }

    async checkPaqueteFase(data) {
        let dao = new classDAO();
        let query = await dao.checkPaqueteFase(data);
        return query;
    }

    async checkServicioFase(data) {
        let dao = new classDAO();
        let query = await dao.checkServicioFase(data);
        return query;
    }

    async checkPaqueteObjetivoFase(data) {
        let dao = new classDAO();
        let query = await dao.checkPaqueteObjetivoFase(data);
        return query;
    }

    async checkServicioObjetivoFase(data) {
        let dao = new classDAO();
        let query = await dao.checkServicioObjetivoFase(data);
        return query;
    }

    async deleteRutas(data) {
        let dao = new classDAO();
        let query = await dao.deleteRutas(data);
        return query;
    }

    async deleteFases(data) {
        let dao = new classDAO();
        let query = await dao.deleteFases(data);
        return query;
    }
}

module.exports = interfaceDAORutas;