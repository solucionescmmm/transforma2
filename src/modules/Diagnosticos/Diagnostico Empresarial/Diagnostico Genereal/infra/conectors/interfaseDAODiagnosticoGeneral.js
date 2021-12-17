//classDao
const classDaoSql = require("../repository/daoDiagnosticoGeneral")

class interfaceDAODiagnosticoGeneral {
    
    async setDiagnosticoGeneral(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoGeneral(data);
        return result;
    }

    async updateDiagnosticoGeneral(data) {
        const dao = new classDaoSql()
        let result = await dao.updateComentario(data)
        return result
    }

    async updateEmpresarioDiagnosticoGeneral(data) {
        const dao = new classDaoSql()
        let result = await dao.updateEmpresarioDiagnosticoGeneral(data)
        return result
    }

    async updateEmpresaDiagnosticoGeneral(data) {
        const dao = new classDaoSql()
        let result = await dao.updateEmpresaDiagnosticoGeneral(data)
        return result
    }

    async deleteDiagnosticoGeneral(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteDiagnosticoGeneral(data)
        return result
    }

    async getDiagnosticoGeneral(data) {
        const dao = new classDaoSql()
        let result = await dao.getDiagnosticoGeneral(data)
        return result
    }
}
module.exports = interfaceDAODiagnosticoGeneral