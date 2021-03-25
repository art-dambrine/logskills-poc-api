// import mariadb
module.exports = {
  HOST: "db",
  USER: "logskills_user",
  PASSWORD: "123",
  DB: "LOGSKILLS",
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    connectTimeout: 20000,
    acquireTimeout: 20000
  }
};
