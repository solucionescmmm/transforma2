const classDAO = require("../repository/daoTipoCampos");

class interfaceDAOTipoCampos {
    async getTipoCampos(data) {
        let dao = new classDAO();
        let query = await dao.getTipoCampos(data);
        return query;
    }
}

module.exports = interfaceDAOTipoCampos;
