module.exports = (sequelize, SequelizeLib) => {
	const Role = sequelize.define('Roles', {
	  nom: {
		  type: SequelizeLib.STRING
	  }
	},
	{
	  timestamps: false,
	});
	return Role;
}