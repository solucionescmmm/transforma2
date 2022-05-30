const classDAO = require("../repository/daoAtributos");

class interfaceDAOAtributos {
    async setAtributos(data) {
        let dao = new classDAO();
        let query = await dao.setAtributos(data);
        return query;
    }

    async getAtributos(data) {
        let dao = new classDAO();
        let query = await dao.getAtributos(data);
        return query;
    }

    async updateAtributos(data) {
        let dao = new classDAO();
        let query = await dao.updateAtributos(data);
        return query;
    }

    async deleteAtributos(data) {
        let dao = new classDAO();
        let query = await dao.deleteAtributos(data);
        return query;
    }
}

module.exports = interfaceDAOAtributos;
