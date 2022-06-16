const classDAO = require("../repository/daoTipoServicios");

class interfaceDAOTipoServicios {
    async setTipoServicios(data) {
        let dao = new classDAO();
        let query = await dao.setTipoServicios(data);
        return query;
    }

    async getTipoServicios(data) {
        let dao = new classDAO();
        let query = await dao.getTipoServicios(data);
        return query;
    }

    async updateTipoServicios(data) {
        let dao = new classDAO();
        let query = await dao.updateTipoServicios(data);
        return query;
    }

    async deleteTipoServicios(data) {
        let dao = new classDAO();
        let query = await dao.deleteTipoServicios(data);
        return query;
    }
}

module.exports = interfaceDAOTipoServicios;