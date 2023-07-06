//classDao
const classDaoSql = require("../repository/daoDiagnosticoProducto");

class interfaceDAODiagnosticoProductos {
    async setDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.setDiagnosticoProducto(data);
        return result;
    }

    async updateDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.updateDiagnosticoProducto(data);
        return result;
    }

    async updateFinalizarDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.updateFinalizarDiagnosticoProducto(data);
        return result;
    }

    async deleteDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteDiagnosticoProducto(data);
        return result;
    }

    async getDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.getDiagnosticoProducto(data);
        return result;
    }

    async setResultDiagnosticoProducto(data) {
        const dao = new classDaoSql();
        let result = await dao.setResultDiagnosticoProducto(data);
        return result;
    }

    async getResultDiagnosticoAlimentos(data) {
        const dao = new classDaoSql();
        let result = await dao.getResultDiagnosticoAlimentos(data);
        return result;
    }

    async getResultDiagnosticoNoAlimentos(data) {
        const dao = new classDaoSql();
        let result = await dao.getResultDiagnosticoNoAlimentos(data);
        return result;
    }

    async getIntIdEmpresario(data){
        const dao = new classDaoSql()
        let result = await dao.getIntIdEmpresario(data)
        return result
    }
}
module.exports = interfaceDAODiagnosticoProductos;
