const app = require("./modules/Main/app");

const Main = () => {
    app.listen(app.get("port"));
};

Main();