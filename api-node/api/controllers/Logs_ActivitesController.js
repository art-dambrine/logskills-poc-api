const db = require("../config/db.config");
const Logs_Activites = db.Logs_Activites;
const Activites = db.Activites;
const Tags = db.Tags;
const Op = db.SequelizeLib.Op;

//Renvois toutes les activités
exports.getAll = (req, res) => {

  var condition = {id : { [Op.eq] : `${req.userId}` }}

  Logs_Activites.findAll({where: condition}).then(queryResult =>{
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
      id_act=queryResult.dataValues['id']
      //Activities create
      if(id_act != null){
        Activites.create({
          temps_total: req.body.focus,
          temps_actif: req.body.pause,
          id_activite: req.param('id'),
          Date: Date.now(),
        }).then(activite => {
          for(let i=0; i<req.body.tags.length; i++){
            Tags.create(
              {
                nom:req.body.tags[i]
              }
            )
          }
          }).then(tags => {
            //activite.setTags(tags).then(() => {
              res.status(200).send("Logs ajouté");
            //      });
        }).catch(err => {
            res.status(500).send("Erreur -> " + err);
        });
      }
    }
  }); 
};

//Suppression de Log
exports.deleteOneActivitesLogs= (req, res)=>{
  Logs_Activites.destroy({
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
    Logs_Activites.destroy({
      where: {
          id_activite: req.param('id'), 
      }
    }).then(activite =>{
      res.status(200).send("Tout les logs de l'activité supprimé");
    }).catch(err => {
      res.status(500).send("Erreur -> " + err);
    });
  }

