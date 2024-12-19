const classDaoSql = require("../repository/daoAdmin");

class interfaceDAOAdmin {

    async setCargaMasiva(data) {
        const dao = new classDaoSql();
        let result = await dao.setCargaMasiva(data);
        return result;
    }

    async truncateTmpCrearPersonaEmpresaria() {
        const dao = new classDaoSql();
        let result = await dao.truncateTmpCrearPersonaEmpresaria();
        return result;
    }

    async getNroDocumentoEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.getNroDocumentoEmpresario(data);
        return result;
    }

    async sp_setIdeaEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.sp_setIdeaEmpresario(data);
        return result;
    }
}

module.exports = interfaceDAOAdmin