const classDAO = require("../repository/daoServicios");

class interfaceDAOServicios {
    async setServicios(data) {
        let dao = new classDAO();
        let query = await dao.setServicios(data);
        return query;
    }

    async setModuloServicios(data) {
        let dao = new classDAO();
        let query = await dao.setModuloServicios(data);
        return query;
    }

    async setSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let query = await dao.setSedeTipoTarifaServicio(data);
        return query;
    }

    async setAreasServicios(data) {
        let dao = new classDAO();
        let query = await dao.setAreasServicios(data);
        return query;
    }

    async getServicios(data) {
        let dao = new classDAO();
        let query = await dao.getServicios(data);
        return query;
    }

    async updateServicios(data) {
        let dao = new classDAO();
        let query = await dao.updateServicios(data);
        return query;
    }

    async deleteServicios(data) {
        let dao = new classDAO();
        let query = await dao.deleteServicios(data);
        return query;
    }

    async deleteModuloServicios(data) {
        let dao = new classDAO();
        let query = await dao.deleteModuloServicios(data);
        return query;
    }

    async deleteSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let query = await dao.deleteSedeTipoTarifaServicio(data);
        return query;
    }

    async deleteAreasServicios(data) {
        let dao = new classDAO();
        let query = await dao.deleteAreasServicios(data);
        return query;
    }
}

module.exports = interfaceDAOServicios;