const conexionSecury = {
  user: process.env.DBSECURITYTRANSFORMA_USER,
  password: process.env.DBSECURITYTRANSFORMA_PASS,
  server: process.env.DBSECURITYTRANSFORMA_SERVER,
  database: process.env.DBSECURITYTRANSFORMA_SCHEMA,
  options: {
    rowCollectionOnRequestCompletion: true,
    encrypt: true,
    enableArithAbort: true,
    useUTC: false,
  },
  parseJSON: true,
};

module.exports = conexionSecury;