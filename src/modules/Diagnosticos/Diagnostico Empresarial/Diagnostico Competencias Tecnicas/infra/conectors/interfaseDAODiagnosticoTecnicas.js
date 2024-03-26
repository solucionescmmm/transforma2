//classDao
const classDaoSql = require("../repository/daoDiagnosticoTecnicas");

class interfaceDAODiagnosticoTecnicas {
    async setDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoTecnicas(data);
        return result;
    }

    async setResultDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.setResultDiagnosticoTecnicas(data);
        return result;
    }

    async updateDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoTecnicas(data);
        return result;
    }

    async updateFinalizarDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.updateFinalizarDiagnosticoTecnicas(data);
        return result;
    }

    async deleteDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteDiagnosticoTecnicas(data);
        return result;
    }

    async getDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoTecnicas(data);
        return result;
    }

    async getDiagnosticoTecnicasNivel(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoTecnicasNivel(data);
        return result;
    }

    async getResultDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.getResultDiagnosticoTecnicas(data);
        return result;
    }
}
module.exports = interfaceDAODiagnosticoTecnicas;