const classDaoSql = require("../repository/daoAdmin");

class interfaceDAOAdmin {

    async setCargaMasiva(data) {
        const dao = new classDaoSql();
        let result = await dao.setCargaMasiva(data);
        return result;
    }

    async getNroDocumentoEmpresario(data) {
        const dao = new classDaoSql();
        let result = await dao.getNroDocumentoEmpresario(data);
        return result;
    }
}

module.exports = interfaceDAOAdmin