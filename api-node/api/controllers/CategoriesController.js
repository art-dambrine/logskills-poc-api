const db = require("../config/db.config")
const Categorie = db.Categories;
const Op = db.SequelizeLib.Op;

//Renvois toutes les categories
exports.getAll = (req, res) => {

    Categorie.findAll().then(queryResult =>{
      if (queryResult[0] != null){
        res.status(200).send(queryResult)
      }
      else res.status(404).send({message : "Erreur dans la récupération de la liste des catégories"})
    }).catch(err=>{
        res.status(500).send({
          message: err.message
        });
    })
};

//Création d'une catégorie
exports.create = (req, res) =>{
  Categorie.findOne({
    where: {
        nom: req.body.nom
      }
  }).then(queryResult =>{
    if (queryResult) res.status(500).send({ message: "La catégorie existe déja"});
    else{
      Categorie.create({
        nom: req.body.nom
      }).then(categorie =>{
        res.status(200).send({message : "Catégorie créé", id_categorie: categorie.id_categorie});
      }).catch(err=>{
        res.status(500).send({message :"Erreur, Impossible de créer cette catégorie"});
      })
    }
  }).catch(err =>{
     res.status(500).send({
      message: "Erreur, Impossible de vérifier l'existence de cette catégorie"
     });
  })
}
