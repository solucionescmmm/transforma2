//Paquetes
require("dotenv-flow").config();

//Librerias
const https = require("https");
const http = require("http");
const fs = require("fs");
const socketIo = require("socket.io");

//Modulos
const app = require("./index");

class clsServer {
    #objServer;

    async main() {
        await this.#server();
        this.#socket();
    }

    async #server() {
        if (app.get("typeServer") === "dev") {
            this.#objServer = https
                .createServer(
                    {
                        key: fs.readFileSync(
                            "/var/www/transforma-dev.demismanos.org/ssl/transforma-dev.demismanos.org-le.key"
                        ),
                        cert: fs.readFileSync(
                            "/var/www/transforma-dev.demismanos.org/ssl/transforma-dev.demismanos.org-le.crt"
                        ),
                    },
                    app
                )
                .listen(app.get("port"), () => {
                    console.log(
                        "HTTPS server listening on port " +
                            app.get("port") +
                            "..."
                    );
                });
        } else if (app.get("typeServer") === "test") {
            this.#objServer = https
                .createServer(
                    {
                        key: fs.readFileSync(
                            "/var/www/transforma-test.demismanos.org/ssl/transforma-test.demismanos.org-le.key"
                        ),
                        cert: fs.readFileSync(
                            "/var/www/transforma-test.demismanos.org/ssl/transforma-test.demismanos.org-le.crt"
                        ),
                    },
                    app
                )
                .listen(app.get("port"), () => {
                    console.log(
                        "HTTPS server listening on port " +
                            app.get("port") +
                            "..."
                    );
                });
        } else if (app.get("typeServer") === "prod") {
            this.#objServer = https
                .createServer(
                    {
                        key: fs.readFileSync(
                            "/var/www/transforma.demismanos.org/ssl/transforma.demismanos.org-le.key"
                        ),
                        cert: fs.readFileSync(
                            "/var/www/transforma.demismanos.org/ssl/transforma.demismanos.org-le.crt"
                        ),
                    },
                    app
                )
                .listen(app.get("port"), () => {
                    console.log(
                        "HTTPS server listening on port " +
                            app.get("port") +
                            "..."
                    );
                });
        } else {
            this.#objServer = http.createServer(app).listen(app.get("port"));
        }
    }

    #socket() {
        const io = socketIo(this.#objServer, {
            cors: {
                origin:
                    app.get("typeServer") === "dev"
                        ? "https://transforma-dev.demismanos.org"
                        : app.get("typeServer") === "test"
                        ? "https://transforma-test.demismanos.org"
                        : app.get("typeServer") === "prod"
                        ? "https://transforma.demismanos.org"
                        : "http://localhost:3000",
                methods: ["GET", "POST", "DELETE", "PUT"],
            },
        });

        io.on("connection", (client) => {
            const clsSetComentario = require("../../Comentarios/domain/setComentario.service");
            const clsUpdateComentario = require("../../Comentarios/domain/updateComentario.service");
            const clsDeleteComentario = require("../../Comentarios/domain/deleteComentario.service");
            const clsSetRespuesta = require("../../Comentarios/domain/setRespuesta.service");
            const clsDeleteRespuesta = require("../../Comentarios/domain/deleteRespuesta.service");
            const clsUpdateRespuesta = require("../../Comentarios/domain/updateRespuesta.service");
            const serviceGetComentarios = require("../../Comentarios/domain/getComentario.service");

            client.on("mdlComentarios:setComentario", async (data) => {
                let serviceSetComentario = new clsSetComentario(data);

                let responseSetComentario = await serviceSetComentario.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit(
                    "mdlComentarios:setComentario",
                    responseSetComentario
                );
            });

            client.on("mdlComentarios:getComentarios", async (data) => {
                let response = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", response);
            });

            client.on("mdlComentarios:deleteComentario", async (data) => {
                let serviceDeleteComentario = new clsDeleteComentario({
                    intId: data.intId,
                });

                let responseDelete = await serviceDeleteComentario.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit("mdlComentarios:deleteComentario", responseDelete);
            });

            client.on("mdlComentarios:updateComentario", async (data) => {
                let serviceUpdateComentario = new clsUpdateComentario(data);

                let responseUpdate = await serviceUpdateComentario.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit("mdlComentarios:updateComentario", responseUpdate);
            });

            client.on("mdlComentarios:setRespuesta", async (data) => {
                console.log(data);
                let serviceSetRespuesta = new clsSetRespuesta(data);

                let responseSetRespuesta = await serviceSetRespuesta.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit(
                    "mdlComentarios:setRespuesta",
                    responseSetRespuesta
                );
            });

            client.on("mdlComentarios:deleteRespuesta", async (data) => {
                let serviceDeleteRespuesta = new clsDeleteRespuesta(data);

                let responseDelete = await serviceDeleteRespuesta.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit("mdlComentarios:deleteRespuesta", responseDelete);
            });

            client.on("mdlComentarios:updateRespuesta", async (data) => {
                let serviceUpdate = new clsUpdateRespuesta(data);

                let responseUpdate = await serviceUpdate.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit("mdlComentarios:updateRespuesta", responseUpdate);
            });

            client.on("mdlComentarios:checkComentario", async (data) => {
                let serviceUpdateComentario = new clsUpdateComentario(data);

                let responseUpdate = await serviceUpdateComentario.main();

                let responseGetData = await serviceGetComentarios({
                    intIdEmpresario: data.intIdEmpresario,
                });

                client.emit("mdlComentarios:getComentarios", responseGetData);
                client.emit("mdlComentarios:checkComentario", responseUpdate);
            });
        });
    }
}

module.exports = clsServer;
