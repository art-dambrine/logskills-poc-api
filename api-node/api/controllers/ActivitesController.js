const db = require("../config/db.config");
const Utilisateurs = db.Utilisateurs;
const Activites = db.Activites;
const Categories = db.Categories;
const Tags = db.Tags;
const Op = db.SequelizeLib.Op;

//Renvois toutes les activités
exports.getAll = (req, res) => {

  var condition = {id_utilisateur : { [Op.eq] : `${req.userId}` }}

  Activites.findAll({where: condition}).then(queryResult =>{
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

  var condition = {id_utilisateur: { [Op.eq] : `${req.userId}` }, id : req.param('id')}

  Activites.findAll({where: condition}).then(queryResult =>{
    if (queryResult[0] != null){
      res.status(200).send(queryResult)
    }
    else res.status(404).send({message : "Pas d'activité trouvé"})
  }).catch(err=>{
      res.status(500).send({
        message: err.message
      });
  })
};

//Création d'une activité
exports.create = (req, res) => {
  // Save User to Database
	console.log("Création de l'activité");
  var id_cat = null;

  //Check if categories exist
	Categories.findOne({
    where: {
      id : req.body.id_categorie
    },
    attributes: ['id']
  }).then(queryResult =>{
    if (queryResult != null){
      id_cat=queryResult.dataValues['id']
      //Activities create
      if(id_cat != null){
        Activites.create({
          nom: req.body.nom,
          temps_focus: req.body.focus,
          temps_pause: req.body.pause,
          nb_round: req.body.round,
          id_categorie: req.body.id_categorie,
          id_utilisateur: req.userId,
          cree_le: Date.now(),
          modifie_le: Date.now()
        }).then(activite => {
          if(req.body.hasOwnProperty('tags')){
            for(let i=0; i<req.body.tags.length; i++){
              Tags.create(
                {
                  nom:req.body.tags[i]
                }
              )
            }    
          }
          }).then(tags => {
            //activite.setTags(tags).then(() => {
              res.status(200).send("Activité créé");
            //      });
        }).catch(err => {
            res.status(500).send("Erreur -> " + err);
        });
      }
    }
  }); 
};

//Mise a jour d'une activité
exports.update= (req,res)=>{
  Activites.findOne({ 
    where: { 
      id: req.param('id'), 
      id_utilisateur: req.userId 
    } 
  }).then(activite =>{
    if (activite != null) {
      if(req.body.hasOwnProperty('nom'))
        var nom = req.body.nom
      else var nom = activite.nom
      if(req.body.hasOwnProperty('focus'))
        var focus = req.body.focus
      else var focus = activite.focus
      if(req.body.hasOwnProperty('pause'))
        var pause = req.body.pause
      else var pause = activite.pause
      if(req.body.hasOwnProperty('round'))
        var round = req.body.round
      else var round = activite.round
      if(req.body.hasOwnProperty('id_categorie'))
        var id_categorie = req.body.id_categorie
      else var id_categorie = activite.id_categorie
      activite.update({
        nom: nom,
        temps_focus: focus,
        temps_pause: pause,
        nb_round: round,
        id_categorie: id_categorie,
        modifie_le: Date.now()
      }).then(activite =>{res.status(200).send("Activité mise à jour")}).catch(err=> {res.status(500).send("Errreur dans la mise à jour de l'acivité : "+ err)})
    }
  }).catch(err => {
    res.status(500).send("Erreur -> " + err);
  });
}

exports.delete= (req, res)=>{
  Activites.destroy({
    where: {
        id: req.param('id'), 
        id_utilisateur: req.userId 
    }
  }).then(activite =>{
    res.status(200).send(": Activité supprimé");
  }).catch(err => {
    res.status(500).send("Erreur -> " + err);
  });
}



