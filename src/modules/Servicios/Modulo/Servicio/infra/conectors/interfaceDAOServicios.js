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

    async setResultServicios(data) {
        let dao = new classDAO();
        let result = await dao.setResultServicios(data);
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

    async getServiciosActivos(data) {
        let dao = new classDAO();
        let result = await dao.getServiciosActivos(data);
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

    async deleteModuloServicios(data) {
        let dao = new classDAO();
        let result = await dao.deleteModuloServicios(data);
        return result;
    }

    async deleteSedeTipoTarifaServicios(data) {
        let dao = new classDAO();
        let result = await dao.deleteSedeTipoTarifaServicios(data);
        return result;
    }

    async deleteAreaServicios(data) {
        let dao = new classDAO();
        let result = await dao.deleteAreaServicios(data);
        return result;
    }
}

module.exports = interfaceDAOServicios;