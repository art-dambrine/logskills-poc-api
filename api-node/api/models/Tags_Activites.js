//Tags MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Tag = sequelize.define("Tags_Activites", {
      id_tag: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
      },
      id_activites: {
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