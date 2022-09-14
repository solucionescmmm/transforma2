const classDAO = require("../repository/daoPaquetes");

class interfaceDAOPaquetes {
    async setPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.setPaquetes(data);
        return result;
    }

    async setServiciosPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.setServiciosPaquetes(data);
        return result;
    }

    async setSedeTipoTarifaPaquete(data) {
        let dao = new classDAO();
        let result = await dao.setSedeTipoTarifaPaquete(data);
        return result;
    }

    async setAreasPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.setAreasPaquetes(data);
        return result;
    }

    async getPaquetes(data){
        let dao = new classDAO()
        let result = dao.getPaquetes(data)
        return result
    }

    async updatePaquetes(data) {
        let dao = new classDAO();
        let result = await dao.updatePaquetes(data);
        return result;
    }

    async updateModuloPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.updateModuloPaquetes(data);
        return result;
    }

    async updateSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let result = await dao.updateSedeTipoTarifaServicio(data);
        return result;
    }

    async updateAreasPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.updateAreasPaquetes(data);
        return result;
    }

    async getPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.getPaquetes(data);
        return result;
    }

    async getAtributosTiposPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.getAtributosTiposPaquetes(data);
        return result;
    }

    async getPaquetesActivos(data) {
        let dao = new classDAO();
        let result = await dao.getPaquetesActivos(data);
        return result;
    }

    async updatePaquetes(data) {
        let dao = new classDAO();
        let result = await dao.updatePaquetes(data);
        return result;
    }

    async deletePaquetes(data) {
        let dao = new classDAO();
        let result = await dao.deletePaquetes(data);
        return result;
    }

    async deleteServiciosPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.deleteServiciosPaquetes(data);
        return result;
    }

    async deleteSedeTipoTarifaPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.deleteSedeTipoTarifaPaquetes(data);
        return result;
    }

    async deleteAreasPaquetes(data) {
        let dao = new classDAO();
        let result = await dao.deleteAreasPaquetes(data);
        return result;
    }
}

module.exports = interfaceDAOPaquetes;