module.exports = (sequelize, SequelizeLib) => {
	const Role = sequelize.define('Roles', {
	  id_role: {
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
	Role.removeAttribute('id');
	return Role;
}