const classDAO = require("../repository/daoTiposServicios");

class interfaceDAOTiposServicios {
    async setTiposServicios(data) {
        let dao = new classDAO();
        let result = await dao.setTiposServicios(data);
        return result;
    }

    async setAtributosTiposServicios(data) {
        let dao = new classDAO();
        let result = await dao.setAtributosTiposServicios(data);
        return result;
    }

    async getTiposServicios(data) {
        let dao = new classDAO();
        let result = await dao.getTiposServicios(data);
        return result;
    }

    async updateTiposServicios(data) {
        let dao = new classDAO();
        let result = await dao.updateTiposServicios(data);
        return result;
    }

    async deleteTiposServicios(data) {
        let dao = new classDAO();
        let result = await dao.deleteTiposServicios(data);
        return result;
    }
}

module.exports = interfaceDAOTiposServicios;