//Utilisteurs MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Utilisateur = sequelize.define("Utilisateurs", {
      nom: {
        type: SequelizeLib.STRING
      },
      prenom: {
        type: SequelizeLib.STRING
      },
      mail: {
        type: SequelizeLib.STRING
      },
      login: {
        type: SequelizeLib.STRING
      },
      password: {
        type: SequelizeLib.STRING
      },
      cree_le: {
        type: SequelizeLib.DATE
      },
      modifie_le: {
        type: SequelizeLib.DATE
      },
    },
    {
      timestamps: false,
    });
    return Utilisateur;
  };
