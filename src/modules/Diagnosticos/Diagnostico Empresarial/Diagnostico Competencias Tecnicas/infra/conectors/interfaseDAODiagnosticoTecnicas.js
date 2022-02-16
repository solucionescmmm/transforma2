//classDao
const classDaoSql = require("../repository/daoDiagnosticoTecnicas");

class interfaceDAODiagnosticoTecnicas {
    async setDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoTecnicas(data);
        return result;
    }

    async updateDiagnosticoTecnicas(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoTecnicas(data);
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
}
module.exports = interfaceDAODiagnosticoTecnicas;