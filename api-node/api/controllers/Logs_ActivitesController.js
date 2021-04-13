const db = require("../config/db.config");
const Activites = db.Activites;
const Logs = db.Logs_Activites;
const Tags = db.Tags;
const Op = db.SequelizeLib.Op;

//Renvois toutes les activités
exports.getThreeLast = (req, res) => {

  var condition = {id_utilisateur : { [Op.eq] : `${req.userId}` }}
  //get all user activities
  Activites.findAll({where: condition}).then(queryResult =>{
    if (queryResult[0] != null){
      queryResult.foreach(element => {
        
      })
    }
  })
  Logs.findAll({where: condition}).then(queryResult =>{
    if (queryResult[0] != null){
      res.status(200).send(queryResult)
    }
    else res.status(404).send({message : "Erreur dans la récupération de la liste des logs activitées"})
  }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
  })
};

//Création d'un log
exports.create = (req, res) => {
  // Save User to Database
	console.log("Enregistrment dans le journal des logs de l'activité ");
  var id_act = null;

  //Check if categories exist
	Activites.findOne({
    where: {
      id : req.param('id')
    },
    attributes: [ 'id']
  }).then(queryResult =>{
    if (queryResult != null){
      id_act=queryResult.dataValues['id'];
      if(id_act != null){
        Logs.create({
          temps_total: req.body.temps_total,
          temps_actif: req.body.temps_actif,
          id_activite: id_act,
          date: Date.now()
        }).then(osef => {
              res.status(200).send("Logs ajouté");
        }).catch(err => {
            res.status(500).send("Erreur -> " + err);
        });
      }
    }
    else res.status(404).send("L'activité passé en parametre n'existe pas");
  }); 
};

//Suppression de Log
exports.deleteOneActivitesLogs= (req, res)=>{
  Logs.destroy({
    where: {
        id: req.param('idLog'),
        id_activite: req.param('idAct'), 
    }
  }).then(activite =>{
    res.status(200).send("Log supprimé");
  }).catch(err => {
    res.status(500).send("Erreur -> " + err);
  });
}

//Suppression de Log
exports.deleteAllActivitesLogs= (req, res)=>{
    Logs.destroy({
      where: {
          id_activite: req.param('id'), 
      }
    }).then(activite =>{
      res.status(200).send("Tout les logs de l'activité supprimé");
    }).catch(err => {
      res.status(500).send("Erreur -> " + err);
    });
  }

