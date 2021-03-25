module.exports = (sequelize, SequelizeLib) => {
	const Role = sequelize.define('Roles', {
	  id_role: {
        type: SequelizeLib.INTEGER,
        primaryKey: true
	  },
	  name: {
		  type: SequelizeLib.STRING
	  }
	});
	Role.removeAttribute('id');
    Role.removeAttribute('createdAt');
    Role.removeAttribute('updatedAt');
	return Role;
}