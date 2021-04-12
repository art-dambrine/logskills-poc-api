
const db = require('../config/db.config.js');
const config = require('../config/securite.config.js');
const User = db.Utilisateurs;
const Role = db.Roles;
const Roles_Utilisateur = db.Roles_Utilisteurs;

const Op = db.SequelizeLib.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const { Utilisateurs } = require('../config/db.config.js');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Fonction: SignUp");
	
	User.create({
		nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
		login: req.body.login,
		password: bcrypt.hashSync(req.body.password, 8),
		cree_le: Date.now(),
		modifie_le: Date.now()
	}).then(user => {
		Role.findAll({
		  where: {
			nom: {
			  [Op.or]: req.body.roles
			}
		  }
		}).then(roles => {
			user.setRoles(roles).then(() => {
				res.send("Utilisateurs enregistré");
            });
		}).catch(err => {
			res.status(500).send("Erreur -> " + err);
		});
	}).catch(err => {
		res.status(500).send("Echec de l'enregistrement -> " + err);
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			login: req.body.login
		}
	}).then(user => {
		if (!user) {
			return res.status(404).send('Utilisateur inexistant.');
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Login ou mot de passe incorrect" });
		}
		
		var token = jwt.sign({ id: user.id_utilisateur }, config.secret, {
		  expiresIn: 86400 // expires in 24 hours
		});
		
		res.status(200).send({ auth: true, accessToken: token });
		
	}).catch(err => {
		res.status(500).send('Erreur -> ' + err);
	});
}

exports.profil_utilisateur = (req, res) => {
	User.findOne({
		where: {id_utilisateur: req.userId},
		attributes: ['nom', 'login', 'mail'],
		include: [{
			model: Role,
			attributes: ['id_role', 'nom'],
			through: {
				attributes: ['id_role', 'id_utilisateur'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Information de l'utilisateur",
			"utilisateur": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Echec de recupération des informations de l'utilisateur",
			"error": err
		});
	})
}
/*
exports.adminBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'nom'],
			through: {
				attributes: ['id_utilisateur', 'id_role'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Admin Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Admin Board",
			"error": err
		});
	})
}

exports.managementBoard = (req, res) => {
	User.findOne({
		where: {id: req.userId},
		attributes: ['name', 'username', 'email'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		res.status(200).json({
			"description": "Management Board",
			"user": user
		});
	}).catch(err => {
		res.status(500).json({
			"description": "Can not access Management Board",
			"error": err
		});
	})
}*/
