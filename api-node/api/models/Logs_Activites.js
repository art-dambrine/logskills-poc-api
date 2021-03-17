//Log_Activites MODEL
 
module.exports = (sequelize, SequelizeLib) => {
    const Log_Activite = sequelize.define("Logs_Activites", {
      id_log_activite: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
      },
      temps_total: {
        type: SequelizeLib.INTEGER
      },
      temps_actif: {
        type: SequelizeLib.INTEGER
      },
      id_activite: {
        type: SequelizeLib.INTEGER
      },
      date : {
        type: SequelizeLib.DATE
      }
    });
    Log_Activite.removeAttribute('id');
    Log_Activite.removeAttribute('createdAt');
    Log_Activite.removeAttribute('updatedAt');
    return Log_Activite;
  };
  
  
  
  
  