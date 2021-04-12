//Tags MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Tag = sequelize.define("Tags", {
      nom: {
        type: SequelizeLib.STRING
      }
    },
    {
      timestamps: false,
    });
    return Tag;
  };
  
  
  
  
  