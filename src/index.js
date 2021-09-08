//Paquetes
require("dotenv-flow").config();

//Librerias
const https = require("https");
const fs = require("fs");

//Modulos
const app = require("./modules/Main/app");

const Main = () => {
    if (process.env.NODE_ENV === "production") {
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
            .listen(process.env.PORT, function () {
                console.log("HTTPS server listening on port " + process.env.PORT + "...");
            });
    } else {
        app.listen(app.get("port"));
    }
};

Main();
