const classDAO = require("../repository/daoProyectosEspeciales");

class interfaceDAOProyectosEspeciales {
    async setProyectosEspeciales(data) {
        let dao = new classDAO();
        let query = await dao.setProyectosEspeciales(data);
        return query;
    }

    async getProyectosEspeciales(data) {
        let dao = new classDAO();
        let query = await dao.getProyectosEspeciales(data);
        return query;
    }

    async updateProyectosEspeciales(data) {
        let dao = new classDAO();
        let query = await dao.updateProyectosEspeciales(data);
        return query;
    }

    async deleteProyectosEspeciales(data) {
        let dao = new classDAO();
        let query = await dao.deleteProyectosEspeciales(data);
        return query;
    }
}

module.exports = interfaceDAOProyectosEspeciales;