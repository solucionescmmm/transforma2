//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Acompañamientos");

//Routes
routes.post(
  "/transforma/api/Acompañamientos/setAcompañamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.setAcompañamiento(req, res);
  }
);

routes.get(
  "/transforma/api/Acompañamientos/getAcompañamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.getAcompañamiento(req, res);
  }
);

routes.get(
  "/transforma/api/Acompañamientos/getTipoAcompañamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.getTipoAcompañamiento(req, res);
  }
);

routes.get(
  "/transforma/api/Acompañamientos/getTipoActividad",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.getTipoActividad(req, res);
  }
);

routes.put(
  "/transforma/api/Acompañamientos/updateAcompañamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.updateAcompañamiento(req, res);
  }
);

routes.delete(
  "/transforma/api/Acompañamientos/deleteAcompañamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.deleteAcompañamiento(req, res);
  }
);

module.exports = routes;
