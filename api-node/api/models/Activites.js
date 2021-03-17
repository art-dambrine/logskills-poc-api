//Activites MODEL
 
module.exports = (sequelize, SequelizeLib) => {
  const Activite = sequelize.define("Activites", {
    id_activite: {
      type: SequelizeLib.INTEGER,
      primaryKey: true
    },
    nom: {
      type: SequelizeLib.STRING
    },
    temps_focus: {
      type: SequelizeLib.INTEGER
    },
    temps_pause: {
      type: SequelizeLib.INTEGER
    },
    nb_round: {
      type: SequelizeLib.INTEGER
    },
    id_categorie: {
      type: SequelizeLib.INTEGER
    },
    id_utilisateur: {
      type: SequelizeLib.INTEGER
    },
    cree_le: {
      type: SequelizeLib.DATE
    },
    modifie_le: {
      type: SequelizeLib.DATE
    },
  });
  Activite.removeAttribute('id');
  Activite.removeAttribute('createdAt');
  Activite.removeAttribute('updatedAt');
  return Activite;
};




