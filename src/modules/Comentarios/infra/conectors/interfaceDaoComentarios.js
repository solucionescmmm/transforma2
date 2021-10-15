//classDao
const classDaoSql = require("../repository/daoComentarios")

class interfaceDAOComentarios {
    async setComentario(data){
        const dao = new classDaoSql();
        let result = await dao.setComentario(data);
        return result;
    }

    async updateComentario(data){
        const dao = new classDaoSql()
        let result = await dao.updateComentario(data)
        return result
    }

    async deleteComentario(data){
        const dao = new classDaoSql()
        let result = await dao.deleteComentario(data)
        return result
    }

    async getComentario(data){
        const dao = new classDaoSql()
        let result = await dao.getComentario(data)
        return result
    }
}
module.exports = interfaceDAOComentarios