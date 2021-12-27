//classDao
const classDaoSql = require("../repository/daoDiagnosticoProducto")

class interfaceDAODiagnosticoProductos {
    
    async setDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoProducto(data);
        return result;
    }

    async updateDiagnosticoProducto(data) {
        const dao = new classDaoSql()
        let result = await dao.updateDiagnosticoProducto(data)
        return result
    }

    async deleteDiagnosticoProducto(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteDiagnosticoProducto(data)
        return result
    }

    async getDiagnosticoProducto(data) {
        const dao = new classDaoSql()
        let result = await dao.getDiagnosticoProducto(data)
        return result
    }
}
module.exports = interfaceDAODiagnosticoProductos