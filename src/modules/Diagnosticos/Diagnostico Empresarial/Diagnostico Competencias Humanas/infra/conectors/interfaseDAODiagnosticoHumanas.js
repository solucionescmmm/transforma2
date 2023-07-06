//classDao
const classDaoSql = require("../repository/daoDiagnosticoHumanas");

class interfaceDAODiagnosticoHumanas {
    async setDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoHumanas(data);
        return result;
    }

    async updateDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoHumanas(data);
        return result;
    }

    async updateFinalizarDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.updateFinalizarDiagnosticoHumanas(data);
        return result;
    }

    async deleteDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteDiagnosticoHumanas(data);
        return result;
    }

    async getDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoHumanas(data);
        return result;
    }

    async setResultDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.setResultDiagnosticoHumanas(data);
        return result;
    }

    async getResultDiagnosticoHumanas(data) {
        const dao = new classDaoSql();
        let result = await dao.getResultDiagnosticoHumanas(data);
        return result;
    }

    async getIntIdEmpresario(data){
        const dao = new classDaoSql()
        let result = await dao.getIntIdEmpresario(data)
        return result
    }
}
module.exports = interfaceDAODiagnosticoHumanas;