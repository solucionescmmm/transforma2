const classDAO = require("../repository/daoSedes");

class interfaceDAOSedes {
    async setSedes(data) {
        let dao = new classDAO();
        let query = await dao.setSedes(data);
        return query;
    }

    async getSedes(data) {
        let dao = new classDAO();
        let query = await dao.getSedes(data);
        return query;
    }

    async updateSedes(data) {
        let dao = new classDAO();
        let query = await dao.updateSedes(data);
        return query;
    }

    async deleteSedes(data) {
        let dao = new classDAO();
        let query = await dao.deleteSedes(data);
        return query;
    }
}

module.exports = interfaceDAOSedes;
