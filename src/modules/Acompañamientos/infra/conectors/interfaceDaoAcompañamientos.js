//classDao
const classDaoSql = require("../repository/daoAcompañamientos")

class interfaceDAOAcompañamientos {
    async setAcompañamiento(data) {
        const dao = new classDaoSql();
        let result = await dao.setAcompañamiento(data);
        return result;
    }

    async getTipoAcompañamiento(data) {
        const dao = new classDaoSql()
        let result = await dao.getTipoAcompañamiento(data)
        return result
    }

    async getTipoActividad(data) {
        const dao = new classDaoSql()
        let result = await dao.getTipoActividad(data)
        return result
    }

    async updateAcompañamiento(data) {
        const dao = new classDaoSql()
        let result = await dao.updateAcompañamiento(data)
        return result
    }

    async deleteAcompañamiento(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteAcompañamiento(data)
        return result
    }
}
module.exports = interfaceDAOAcompañamientos