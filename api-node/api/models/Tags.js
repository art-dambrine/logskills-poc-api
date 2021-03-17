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
    });
    Tag.removeAttribute('id');
    Tag.removeAttribute('createdAt');
    Tag.removeAttribute('updatedAt');
    return Tag;
  };
  
  
  
  
  