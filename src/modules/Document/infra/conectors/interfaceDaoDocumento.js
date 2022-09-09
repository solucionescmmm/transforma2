//classDao
const classDaoSql = require("../repository/daoDocumento")

class interfaceDAODocumento {
    async setDocumento(data) {
        const dao = new classDaoSql();
        let result = await dao.setDocumento(data);
        return result;
    }

    async updateDocumento(data) {
        const dao = new classDaoSql()
        let result = await dao.updateDocumento(data)
        return result
    }

    async deleteDocumento(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteDocumento(data)
        return result
    }

    async getDocumento(data) {
        const dao = new classDaoSql()
        let result = await dao.getDocumento(data)
        return result
    }
}
module.exports = interfaceDAODocumento