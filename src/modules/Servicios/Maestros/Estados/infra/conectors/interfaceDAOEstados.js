const classDAO = require("../repository/daoEstados");

class interfaceDAOEstados {
    async getEstados(data) {
        let dao = new classDAO();
        let query = await dao.getEstados(data);
        return query;
    }

    async getIdEstados(data) {
        let dao = new classDAO();
        let query = await dao.getIdEstados(data);
        return query;
    }
}

module.exports = interfaceDAOEstados;
