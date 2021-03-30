//Categorie MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Categorie = sequelize.define("Categories", {
      id_categorie: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
      },
      nom: {
        type: SequelizeLib.STRING
      }
    },
    {
      timestamps: false,
    });
    Categorie.removeAttribute('id');
    return Categorie;
  };
  
  
  
  
  