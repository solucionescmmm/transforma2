//Paquetes
require("dotenv-flow").config();

//Librerias
const https = require("https");
const fs = require("fs");

//Modulos
const app = require("./modules/Main/app");

const Main = () => {
    console.log(app.get("typeServer"));

    if (app.get("typeServer") === "production") {
        https
            .createServer(
                {
                    key: fs.readFileSync(
                        "/var/www/servicios.demismanos.org/ssl/servicios.demismanos.org-le.key"
                    ),
                    cert: fs.readFileSync(
                        "/var/www/servicios.demismanos.org/ssl/servicios.demismanos.org-le.crt"
                    ),
                },
                app
            )
            .listen(app.get("port"), () => {
                console.log("HTTPS server listening on port " + app.get("port") + "...");
            });
    } else {
        app.listen(app.get("port"));
    }
};

Main();
