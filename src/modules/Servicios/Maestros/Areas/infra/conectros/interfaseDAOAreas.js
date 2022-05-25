const classDAO = require("../repository/daoAreas");

class interfaceDAOAreas {
    async setAreas(data) {
        let dao = new classDAO();
        let query = await dao.setAreas(data);
        return query;
    }

    async getAreas(data) {
        let dao = new classDAO();
        let query = await dao.getAreas(data);
        return query;
    }

    async updateAreas(data) {
        let dao = new classDAO();
        let query = await dao.updateAreas(data);
        return query;
    }

    async deleteAreas(data) {
        let dao = new classDAO();
        let query = await dao.deleteAreas(data);
        return query;
    }
}

module.exports = interfaceDAOAreas;