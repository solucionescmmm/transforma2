//classs
const classDaoSql = require("../repository/daoUsuarios");

class interfaceDAOUsuarios {
    async getUsuarios(data) {
        const dao = new classDaoSql();
        let result = await dao.getUsuarios(data);
        return result;
    }

    async getRolesUsuario(data) {
        const dao = new classDaoSql();
        let result = await dao.getRolesUsuario(data);
        return result;
    }
}
module.exports = interfaceDAOUsuarios;
