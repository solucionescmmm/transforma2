//Class
const classInterfaceDAOListas = require("../Infra/conectors/interfaceDAOListas");

const getListas = async(data) => {
    let dao = new classInterfaceDAOListas();
    let result = await dao.getListas(data);
    return result;
};
module.exports = getListas;