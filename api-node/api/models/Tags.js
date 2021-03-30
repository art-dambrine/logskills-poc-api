//Tags MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Tag = sequelize.define("Tags", {
      id_tag: {
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
    Tag.removeAttribute('id');
    return Tag;
  };
  
  
  
  
  