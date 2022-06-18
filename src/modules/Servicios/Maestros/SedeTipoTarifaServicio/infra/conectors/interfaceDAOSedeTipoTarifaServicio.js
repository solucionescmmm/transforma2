const classDAO = require("../repository/daoSedeTipoTarifaServicio");

class interfaceDAOSedeTipoTarifaServicio {
    async setSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let query = await dao.setSedeTipoTarifaServicio(data);
        return query;
    }

    async getSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let query = await dao.getSedeTipoTarifaServicio(data);
        return query;
    }

    async updateSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let query = await dao.updateSedeTipoTarifaServicio(data);
        return query;
    }

    async deleteSedeTipoTarifaServicio(data) {
        let dao = new classDAO();
        let query = await dao.deleteSedeTipoTarifaServicio(data);
        return query;
    }
}

module.exports = interfaceDAOSedeTipoTarifaServicio;
