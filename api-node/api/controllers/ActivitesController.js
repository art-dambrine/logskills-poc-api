const db = require("../config/db.config")
const Activites = db.Activites;
const Op = db.SequelizeLib.Op;

//Renvois toutes les activités
exports.getAll = (req, res) => {

  Activites.findAll().then(queryResult =>{
    if (queryResult[0] != null){
      res.status(200).send(queryResult)
    }
    else res.status(404).send({message : "Erreur dans la récupération de la liste des activitées"})
  }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
  })
};

//Renvois toutes les activités d'un utilisateurs (parameters : user_id) 
exports.getByID = (req, res) => {
  var userID = req.body.id_utilisateur

  var condition = {id_utilisateur : { [Op.eq] : `${userID}` }}

  Activites.findAll({where: condition}).then(queryResult =>{
    if (queryResult[0] != null){
      res.status(200).send(queryResult)
    }
    else res.status(404).send({message : "l'utilisateur n'existe pas"})
  }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
  })
};



