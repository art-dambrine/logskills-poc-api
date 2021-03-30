//Utilisteurs MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Utilisateur = sequelize.define("Utilisateurs", {
      id_utilisateur: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
      },
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
    Utilisateur.removeAttribute('id');
    return Utilisateur;
  };
