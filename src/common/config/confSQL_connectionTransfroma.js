require("dotenv-flow").config();

const conexion = {
  user: process.env.DBTRANSFORMA_USER,
  password: process.env.DBTRANSFORMA_PASS,
  server: process.env.DBTRANSFORMA_SERVER,
  database: process.env.DBTRANSFORMA_SCHEMA,
  options: {
    rowCollectionOnRequestCompletion: true,
    encrypt: true,
    enableArithAbort: true,
    useUTC: false,
  },
  parseJSON: true,
};

module.exports = conexion;
