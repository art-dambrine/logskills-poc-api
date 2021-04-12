//Categorie MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Categorie = sequelize.define("Categories", {
      nom: {
        type: SequelizeLib.STRING
      }
    },
    {
      timestamps: false,
    });
    return Categorie;
  };
  
  
  
  
  