//Roles MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Tag = sequelize.define("Roles_Utilisateurs", {
      id_role: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
      },
      id_utilisateur: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
      },
    },
    {
      timestamps: false,
    });
    Tag.removeAttribute('id');
    return Tag;
  };