//classDao
const classDaoSql = require("../repository/daoDiagnosticoExpress");

class interfaceDAODiagnosticoExpress {
    async setDiagnosticoExpress(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoExpress(data);
        return result;
    }

    async updateDiagnosticoExpress(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoExpress(data);
        return result;
    }

    async updateEmpresarioDiagnosticoExpress(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresarioDiagnosticoExpress(data);
        return result;
    }

    async updateEmpresaDiagnosticoExpress(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresaDiagnosticoExpress(data);
        return result;
    }

    async deleteDiagnosticoExpress(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteDiagnosticoExpress(data);
        return result;
    }

    async getDiagnosticoExpress(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoExpress(data);
        return result;
    }
}
module.exports = interfaceDAODiagnosticoExpress;
