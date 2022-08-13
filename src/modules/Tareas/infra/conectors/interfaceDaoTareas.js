//classDao
const classDaoSql = require("../repository/daoTareas")

class interfaceDAOTareas {
    async setTarea(data) {
        const dao = new classDaoSql();
        let result = await dao.setTarea(data);
        return result;
    }

    async updateTarea(data) {
        const dao = new classDaoSql()
        let result = await dao.updateTarea(data)
        return result
    }

    async deleteTarea(data) {
        const dao = new classDaoSql()
        let result = await dao.deleteTarea(data)
        return result
    }

    async getTarea(data) {
        const dao = new classDaoSql()
        let result = await dao.getTarea(data)
        return result
    }
}
module.exports = interfaceDAOTareas