const classDAO = require("../repository/daoObjetivos");

class interfaceDAOObjetivos {
    async setObjetivos(data) {
        let dao = new classDAO();
        let query = await dao.setObjetivos(data);
        return query;
    }

    async getObjetivos(data) {
        let dao = new classDAO();
        let query = await dao.getObjetivos(data);
        return query;
    }

    async updateObjetivos(data) {
        let dao = new classDAO();
        let query = await dao.updateObjetivos(data);
        return query;
    }

    async deleteObjetivos(data) {
        let dao = new classDAO();
        let query = await dao.deleteObjetivos(data);
        return query;
    }
}

module.exports = interfaceDAOObjetivos;