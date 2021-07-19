require("dotenv-flow").config();

//librerias
const express = require("express");
const cors = require("cors");
const app = express();
const authToken = require("../../../common/middleware/authGoogle");

//config
app.set("port", process.env.PORT);

//Middleware
app.use(cors());
app.use(express.json());
app.use("/trasnforma/api", authToken);

//router
app.use(require("../infra/http/apiMain.routes"))

module.exports = app;