// import mariadb
module.exports = {
  HOST: process.env.DATABASE_HOST,
  USER: process.env.DATABASE_USER,
  PASSWORD: process.env.DATABASE_PASS,
  DB: process.env.DATABASE_NAME,
  dialect: "mariadb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    connectTimeout: 20000,
    acquireTimeout: 20000
  }
};
