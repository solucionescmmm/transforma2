const classDaoSql = require("../repository/daoEmpresarios");

class interfaceDAOEmpresarios {
    
    async setEmpresarios(data) {
        const dao = new classDaoSql();
        let result = await dao.setEmpresario(data);
        return result;
    }

    async setEmpresa(data) {
        const dao = new classDaoSql();
        let result = await dao.setEmpresa(data);
        return result;
    }

    async setEmprendimineto(data) {
        const dao = new classDaoSql();
        let result = await dao.setEmprendimiento(data);
        return result;
    }

    async deleteEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteEmpresario(data);
        return result;
    }

    async getEmpresario() {
        const dao = new classDaoSql();
        let result = await dao.getEmpresario(data);
        return result;
    }

    async getCategoriaEmpresario() {
        const dao = new classDaoSql();
        let result = await dao.getCategoriaEmpresario(data);
        return result;
    }
}
module.exports = interfaceDAOEmpresarios;
