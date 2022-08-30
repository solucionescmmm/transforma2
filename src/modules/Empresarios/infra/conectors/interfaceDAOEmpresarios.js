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

    async setInfoAdicional(data){
        const dao = new classDaoSql();
        let result = await dao.setInfoAdicional(data);
        return result
    }

    async setIdea(data){
        const dao = new classDaoSql();
        let result = await dao.setIdea(data);
        return result
    }

    async setIdeaEmpresario(data){
        const dao = new classDaoSql();
        let result = await dao.setIdeaEmpresario(data);
        return result
    }

    async setHistorico(data){
        const dao = new classDaoSql();
        let result = await dao.setHistorico(data);
        return result
    }

    async updateEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresario(data);
        return result;
    }

    async updateIdea(data) {
        const dao = new classDaoSql();
        let result = await dao.updateIdea(data);
        return result;
    }

    async updateEmpresa(data) {
        const dao = new classDaoSql();
        let result = await dao.updateEmpresa(data);
        return result;
    }

    async updateInfoAdicional(data){
        const dao = new classDaoSql()
        let result = await dao.updateInfoAdicional(data)
        return result
    }

    async updateInactivarEmpresario(data){
        const dao = new classDaoSql()
        let result = await dao.updateInactivarEmpresario(data)
        return result
    }

    async updateFechaFinEmpresario(data){
        const dao = new classDaoSql()
        let result = await dao.updateFechaFinEmpresario(data)
        return result
    }

    async deleteEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteEmpresario(data);
        return result;
    }

    async deleteIdea(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteIdea(data);
        return result;
    }

    async deleteIdeaEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.deleteIdeaEmpresario(data);
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

    async deleteInfoAdicional(data){
        const dao = new classDaoSql()
        let result = await dao.deleteInfoAdicional(data);
        return result
    }

    async getIdeaEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.getIdeaEmpresario(data);
        return result;
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

    async getIdTipoEmpresario(data){
        const dao = new classDaoSql();
        let result = await dao.getIdTipoEmpresario(data);
        return result;
    }

    async getIdEmpresarioPrincipal(data){
        const dao = new classDaoSql();
        let result = await dao.getIdEmpresarioPrincipal(data);
        return result;
    }

    async getEmpresarioIdea(data){
        const dao = new classDaoSql();
        let result = await dao.getEmpresarioIdea(data);
        return result;
    }
}
module.exports = interfaceDAOEmpresarios;
