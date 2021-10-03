//Servidor
const clsServer = require("./modules/Main/app/server");

const init = () => {
    let server = new clsServer();

    server.main();
};

init();
