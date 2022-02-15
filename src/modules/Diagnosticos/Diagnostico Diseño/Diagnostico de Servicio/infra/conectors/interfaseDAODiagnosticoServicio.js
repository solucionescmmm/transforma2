//classDao
const classDaoSql = require("../repository/daoDiagnosticoServicio");

class interfaceDAODiagnosticoServicios {
    async setDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoServicio(data);
        return result;
    }

    async updateDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoServicio(data);
        return result;
    }

    async deleteDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteDiagnosticoServicio(data);
        return result;
    }

    async getDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoServicio(data);
        return result;
    }

    async setResultDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.setResultDiagnosticoServicio(data);
        return result;
    }

    async getResultDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.getResultDiagnosticoServicio(data);
        return result;
    }

    async getIntIdEmpresario(data){
        const dao = new classDaoSql()
        let result = await dao.getIntIdEmpresario(data)
        return result
    }
}
module.exports = interfaceDAODiagnosticoServicios;
