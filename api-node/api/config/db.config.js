const dbConfig = require("./db.env.js");

//Connexion à la base de données
const SequelizeLib = require("sequelize");
const logskills_database = new SequelizeLib(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  waitForConnections: true,
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

db.Activites = require("../models/Activites.js")(logskills_database, SequelizeLib);
db.Utilisateurs = require("../models/Utilisateurs.js")(logskills_database, SequelizeLib);
db.Categories = require("../models/Categories.js")(logskills_database, SequelizeLib);
db.Logs_Activites= require('../models/Logs_Activites.js')(logskills_database, SequelizeLib);
db.Roles= require('../models/Roles.js')(logskills_database, SequelizeLib);
db.Tags = require('../models/Tags.js')(logskills_database, SequelizeLib);
db.Roles_Utilisateurs= require('../models/Roles_Utilisateurs.js')(logskills_database, SequelizeLib);
//db.Tags_Activites = require('../models/Tags_Activites.js')(logskills_database, SequelizeLib);
 
db.Roles.belongsToMany(db.Utilisateurs, { through: 'Roles_Utilisateurs', foreignKey: 'id_role', otherKey: 'id_utilisateur'});
db.Utilisateurs.belongsToMany(db.Roles, { through: 'Roles_Utilisateurs', foreignKey: 'id_utilisateur', otherKey: 'id_role'});

//db.Tags.belongsToMany(db.Activites, { through: 'Tags_Activites', foreignKey: 'id_tag', otherKey: 'id_activite'});
//db.Activites.belongsToMany(db.Tags, { through: 'Tags_Activites', foreignKey: 'id_activite', otherKey: 'id_tag'});

module.exports = db;
