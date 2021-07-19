//libreias
routes = require('express').Router()

//Clases
const classController = require("../../app/controllers/ctrl_Main")


//Routes
routes.get("/trasnforma/api/authtoken", async(req, res) => {
    let classMain = new classController()
    await classMain.getDataUser(req, res)
})

module.exports = routes