const dbConfig = require("../config/db.js");

//Connexion à la base de données
const SequelizeLib = require("sequelize");
const logskills_database = new SequelizeLib(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.SequelizeLib = SequelizeLib;
db.logskills_database = logskills_database;

db.Activites = require("./Activites.js")(logskills_database, SequelizeLib);
db.Utilisateurs = require("./Utilisateurs.js")(logskills_database, SequelizeLib);


module.exports = db;
