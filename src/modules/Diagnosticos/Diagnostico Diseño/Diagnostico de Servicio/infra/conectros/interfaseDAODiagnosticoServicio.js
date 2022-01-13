//classDao
const classDaoSql = require("../repository/daoDiagnosticoServicio")

class interfaceDAODiagnosticoServicios {
    
    async setDiagnosticoServicio(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoServicio(data);
        return result;
    }

    async updateDiagnosticoServicio(data) {
        const dao = new classDaoSql()
        let result = await dao.updateDiagnosticoServicio(data)
        return result
    }

    async deleteDiagnosticoServicio(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteDiagnosticoServicio(data)
        return result
    }

    async getDiagnosticoServicio(data) {
        const dao = new classDaoSql()
        let result = await dao.getDiagnosticoServicio(data)
        return result
    }
}
module.exports = interfaceDAODiagnosticoServicios