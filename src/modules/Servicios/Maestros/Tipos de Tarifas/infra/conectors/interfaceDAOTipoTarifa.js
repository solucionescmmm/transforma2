const classDAO = require("../repository/daoTipoTarifa");

class interfaceDAOTipoTarifa {
    async setTipoTarifa(data) {
        let dao = new classDAO();
        let query = await dao.setTipoTarifa(data);
        return query;
    }

    async getTipoTarifa(data) {
        let dao = new classDAO();
        let query = await dao.getTipoTarifa(data);
        return query;
    }

    async updateTipoTarifa(data) {
        let dao = new classDAO();
        let query = await dao.updateTipoTarifa(data);
        return query;
    }

    async deleteTipoTarifa(data) {
        let dao = new classDAO();
        let query = await dao.deleteTipoTarifa(data);
        return query;
    }
}

module.exports = interfaceDAOTipoTarifa;