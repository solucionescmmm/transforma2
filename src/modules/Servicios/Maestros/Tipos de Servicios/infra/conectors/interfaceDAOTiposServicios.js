const classDAO = require("../repository/daoTiposServicios");

class interfaceDAOTiposServicios {
    async setTiposServicios(data) {
        let dao = new classDAO();
        let query = await dao.setTiposServicios(data);
        return query;
    }

    async getTiposServicios(data) {
        let dao = new classDAO();
        let query = await dao.getTiposServicios(data);
        return query;
    }

    async updateTiposServicios(data) {
        let dao = new classDAO();
        let query = await dao.updateTiposServicios(data);
        return query;
    }

    async deleteTiposServicios(data) {
        let dao = new classDAO();
        let query = await dao.deleteTiposServicios(data);
        return query;
    }
}

module.exports = interfaceDAOTiposServicios;