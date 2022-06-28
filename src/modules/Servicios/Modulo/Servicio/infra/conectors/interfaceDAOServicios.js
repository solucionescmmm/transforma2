const classDAO = require("../repository/daoServicios");

class interfaceDAOServicios {
    async setServicios(data) {
        let dao = new classDAO();
        let result = await dao.setServicios(data);
        return result;
    }

    async setModuloServicios(data) {
        let dao = new classDAO();
        let result = await dao.setModuloServicios(data);
        return result;
    }

    async setSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let result = await dao.setSedeTipoTarifaServicio(data);
        return result;
    }

    async setAreasServicios(data) {
        let dao = new classDAO();
        let result = await dao.setAreasServicios(data);
        return result;
    }

    async getServicios(data){
        let dao = new classDAO()
        let result = dao.getServicios(data)
        return result
    }

    async updateServicios(data) {
        let dao = new classDAO();
        let result = await dao.updateServicios(data);
        return result;
    }

    async updateModuloServicios(data) {
        let dao = new classDAO();
        let result = await dao.updateModuloServicios(data);
        return result;
    }

    async updateSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let result = await dao.updateSedeTipoTarifaServicio(data);
        return result;
    }

    async updateAreasServicios(data) {
        let dao = new classDAO();
        let result = await dao.updateAreasServicios(data);
        return result;
    }

    async getServicios(data) {
        let dao = new classDAO();
        let result = await dao.getServicios(data);
        return result;
    }

    async updateServicios(data) {
        let dao = new classDAO();
        let result = await dao.updateServicios(data);
        return result;
    }

    async deleteServicios(data) {
        let dao = new classDAO();
        let result = await dao.deleteServicios(data);
        return result;
    }
}

module.exports = interfaceDAOServicios;