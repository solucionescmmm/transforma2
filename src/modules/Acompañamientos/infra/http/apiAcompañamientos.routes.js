//librerias
const routes = require("express").Router();

//Classes
const classController = require("../../app/controllers/ctrl_Acompañamientos");

//Routes
routes.post(
  "/transforma/api/Acompanamientos/setAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.setAcompañamiento(req, res);
  }
);

routes.post(
  "/transforma/api/Acompanamientos/setSesionAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.setSesionAcompañamiento(req, res);
  }
);


routes.get(
  "/transforma/api/Acompanamientos/getAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.getAcompañamiento(req, res);
  }
);

routes.get(
  "/transforma/api/Acompanamientos/getTipoAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.getTipoAcompañamiento(req, res);
  }
);

routes.get(
  "/transforma/api/Acompanamientos/getTipoActividad",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.getTipoActividad(req, res);
  }
);

routes.put(
  "/transforma/api/Acompanamientos/updateAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.updateAcompañamiento(req, res);
  }
);

routes.put(
  "/transforma/api/Acompanamientos/updateSesionAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.updateSesionAcompañamiento(req, res);
  }
);

routes.put(
  "/transforma/api/Acompanamientos/updateFinalizarSesionAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.updateFinalizarSesionAcompañamiento(req, res);
  }
);

routes.delete(
  "/transforma/api/Acompanamientos/deleteAcompanamiento",
  async (req, res) => {
    let controllerAcompañamientos = new classController();
    await controllerAcompañamientos.deleteAcompañamiento(req, res);
  }
);

module.exports = routes;
