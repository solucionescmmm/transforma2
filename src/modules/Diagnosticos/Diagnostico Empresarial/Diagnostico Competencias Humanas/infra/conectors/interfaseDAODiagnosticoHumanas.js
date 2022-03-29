//classDao
const classDaoSql = require("../repository/daoDiagnosticoHumanas");

class interfaceDAODiagnosticoHumana {
    async setDiagnosticoHumana(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoHumanas(data);
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
module.exports = interfaceDAODiagnosticoHumana;