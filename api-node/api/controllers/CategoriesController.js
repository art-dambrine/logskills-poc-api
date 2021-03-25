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