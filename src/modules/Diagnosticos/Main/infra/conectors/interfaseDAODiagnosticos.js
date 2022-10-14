const classDAO = require("../repository/daoDiagnosticos");

class interfaceDAODiagnosticos {
    async setDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.setDiagnosticos(data);
        return query;
    }

    async getDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.getDiagnosticos(data);
        return query;
    }

    async getTipoDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.getTipoDiagnosticos(data);
        return query;
    }

    async getEstadoDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.getEstadoDiagnosticos(data);
        return query;
    }

    async getIdEstadoDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.getIdEstadoDiagnosticos(data);
        return query;
    }

    async updateDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.updateDiagnosticos(data);
        return query;
    }

    async deleteDiagnosticos(data) {
        let dao = new classDAO();
        let query = await dao.deleteDiagnosticos(data);
        return query;
    }
}

module.exports = interfaceDAODiagnosticos;