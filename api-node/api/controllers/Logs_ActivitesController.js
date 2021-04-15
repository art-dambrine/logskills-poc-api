const db = require("../config/db.config");
const Activites = db.Activites;
const Logs = db.Logs_Activites;
const Tags = db.Tags;
const Op = db.SequelizeLib.Op;
const database = db.logskills_database 

function getAllActivitiesId(userID){
  var ids;
  var condition = {id_utilisateur : { [Op.eq] : `${userID}` }}
  //get all user activities
  Activites.findAll({where: condition}).then(queryResult =>{
    if (queryResult[0] != null){
      queryResult.forEach(element => {
        ids=element.dataValues['id']
      })
    }
  })
  return ids
}

//Renvois toutes les activités
exports.getLastLogs = async (req, res) => {
  var request = "SELECT * FROM Logs_Activites WHERE Logs_Activites.id_activite IN (SELECT id FROM Activites WHERE id_utilisateur = " + req.userId + ") ORDER BY date DESC LIMIT 10;"
  const results = await database.query(request);
  if (results[0]!= null){
        res.status(200).send(results[0])
  }
  else res.status(500).send({message : "Erreur dans la récupération de la liste des logs de l'activitées"})
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
              res.status(200).send({message : "Logs ajouté", id: osef.id});
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

function dateDiff(date1, date2){
  var diff = {}                           // Initialisation du retour
  var tmp = date2 - date1;

  tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60;                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
  diff.min = tmp % 60;                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
  diff.hour = tmp % 24;                   // Extraction du nombre d'heures
   
  tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
  diff.day = tmp;
   
  return diff;
}

function getFirstWeekDay() {
  var d = new Date(Date.now());
  var day = d.getDay();
  var diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

function getLastWeekDay(d) {
  var d = new Date(Date.now());
  var day = d.getDay();
  var diff = d.getDate() - day + 7; // adjust when day is sunday

  return new Date(d.setDate(diff));
}

exports.getStats= async (req, res)=>{

  var JSONResponse = {}
  var subJSONResponse = {}
  if(req.body.hasOwnProperty('date_debut'))
    var dateDeb = new Date (req.body.date_debut);
  else var dateDeb = getFirstWeekDay();
  if(req.body.hasOwnProperty('date_fin'))
    var dateFin = new Date (req.body.date_fin);
  else {
    var dateFin = getLastWeekDay();
    dateFin.setDate(dateFin.getDate()+1)
  }
  if(dateDeb == dateFin){
    dateFin.setDate(dateDeb.getDate()+1)
  }
  
  console.log(dateDeb)
  console.log(dateFin)

  var nbJours = dateDiff(dateDeb, dateFin).day;
  
  var requestDaily = "SELECT ROUND(SUM(temps_actif)/"+nbJours+") AS focus_moyen_jour_periode "+
  "FROM Logs_Activites "+ 
  "WHERE Logs_Activites.id_activite IN (SELECT id FROM Activites WHERE id_utilisateur = " + req.userId + ") AND date >= '" + dateDeb.toISOString().split('T')[0] + "' AND date < '" + dateFin.toISOString().split('T')[0] + "';"
  const results = await database.query(requestDaily);
  if (results[0]!= null){
      Object.assign(JSONResponse,results[0][0])
  }
  else res.status(500).send({message : "Erreur dans la récupération de la liste des logs de l'activitées"})
  for(let i=1; i<nbJours+1; i++){
    temp = new Date(dateFin);
    temp.setDate(dateFin.getDate() - i);
    var dateTemp = temp.toISOString().split('T')[0]
    temp.setDate(dateFin.getDate() - i+1);
    var dateTemp2 = temp.toISOString().split('T')[0]
    var requestByDay = "SELECT SUBSTRING_INDEX(date, ' ', 1) AS date_jour, SUM(temps_actif) AS focus_total_jour " +
    "FROM Logs_Activites " +
    "WHERE Logs_Activites.id_activite IN (SELECT id FROM Activites WHERE id_utilisateur = " + req.userId + ") AND date >= '" + dateTemp +"' AND date < '" + dateTemp2 +"' GROUP BY date_jour;"
    const results2 = await database.query(requestByDay);
    if (results2[0] != null){
      Object.assign(subJSONResponse,results2[0][0])
    }
    else res.status(500).send({message : "Erreur dans la récupération de la liste des logs de l'activitées"})
  }
  JSONResponse['focus_jours']=  subJSONResponse
  
  requestByAct = "SELECT id_activite, SUM(temps_actif) AS focus_total_activite "+
  "FROM Logs_Activites "+
  "WHERE Logs_Activites.id_activite IN (SELECT id FROM Activites WHERE id_utilisateur = " + req.userId + ") AND date >= '" + dateDeb.toISOString().split('T')[0] + "' AND date < '" + dateFin.toISOString().split('T')[0] + "' GROUP BY id_activite ORDER BY focus_total_activite DESC;"
  const results3 = await database.query(requestByAct);
  if (results3[0]!= null){
     JSONResponse['focus_activites']= results3[0];  
  }
  else res.status(500).send({message : "Erreur dans la récupération de la liste des logs de l'activitées"})
  
  res.status(200).send(JSONResponse);
}

