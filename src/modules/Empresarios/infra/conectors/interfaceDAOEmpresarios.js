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


    async setEmpresarioSecundario(data) {
        const dao = new classDaoSql();
        let result = await dao.setEmpresarioSecundrio(data);
        return result;
    }

    async setInfoAdicional(data){
        const dao = new classDaoSql();
        let result = await dao.setInfoAdicional(data);
        return result
    }

    async updateEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresario(data);
        return result;
    }

    async updateEmpresa(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresa(data);
        return result;
    }

    async updateEmpresarioSecundario(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresarioSecundario(data);
        return result;
    }

    async updateInfoAdicional(data){
        const dao = new classDaoSql()
        let result = await dao.updateInfoAdicional(data)
        return result
    }

    async deleteEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteEmpresario(data);
        return result;
    }

    async deleteInfoEmpresa(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteInfoEmpresa(data);
        return result;
    }

    async deleteEmpresarioSecundario(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteEmpresarioSecundario(data);
        return result;
    }

    async deleteInfoAdiconal(data){
        const dao = new classDaoSql()
        let result = await dao.deleteInfoAdicional(data);
        return result
    }

    async getEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.getEmpresario(data);
        return result;
    }

    async getNroDocumentoEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.getNroDocumentoEmpresario(data);
        return result;
    }
}
module.exports = interfaceDAOEmpresarios;
