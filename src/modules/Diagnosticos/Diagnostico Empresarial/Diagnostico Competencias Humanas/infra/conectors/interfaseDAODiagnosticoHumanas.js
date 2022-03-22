//classDao
const classDaoSql = require("../repository/daoDiagnosticoHumanas");

class interfaceDAODiagnosticoHumana {
    async setDiagnosticoHumana(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoHumana(data);
        return result;
    }

    async updateDiagnosticoHumana(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoHumanas(data);
        return result;
    }

    async deleteDiagnosticoHumana(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteDiagnosticoHumana(data);
        return result;
    }

    async getDiagnosticoHumana(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoHumana(data);
        return result;
    }
}
module.exports = interfaceDAODiagnosticoHumana;