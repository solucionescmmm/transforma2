const classDAO = require("../repository/daoAreasServicios");

class interfaceDAOAreasServicios {
    async setAreasServicios(data) {
        let dao = new classDAO();
        let query = await dao.setAreasServicios(data);
        return query;
    }

    async getAreasServicios(data) {
        let dao = new classDAO();
        let query = await dao.getAreasServicios(data);
        return query;
    }

    async updateAreasServicios(data) {
        let dao = new classDAO();
        let query = await dao.updateAreasServicios(data);
        return query;
    }

    async deleteAreasServicios(data) {
        let dao = new classDAO();
        let query = await dao.deleteAreasServicios(data);
        return query;
    }
}

module.exports = interfaceDAOAreasServicios;