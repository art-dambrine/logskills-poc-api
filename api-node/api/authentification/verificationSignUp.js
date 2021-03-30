
const db = require('../config/db.config.js');
const config = require('../config/securite.config.js');
const ListRoles = config.ListeRoles; 
const Utilisateurs = db.Utilisateurs;
const Roles = db.Roles;

controlDuplicationLoginOuEmail = (req, res, next) => {
	Utilisateurs.findOne({
		where: {
			login: req.body.login
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Echec de l'enregistrement : l'utilisateur existe déja");
			return;
		}
		
		// -> Check Email is already in use
		Utilisateurs.findOne({ 
			where: {
				mail: req.body.mail
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Echec de l'enregistrement : l'adresse mail est déja utilisée");
				return;
			}
				
			next();
		});
	});
}

existenceRole = (req, res, next) => {	
	for(let i=0; i<req.body.roles.length; i++){
		if(!ListRoles.includes(req.body.roles[i].toUpperCase())){
			res.status(400).send("Le role choisi n'existe pas = " + req.body.roles[i]);
			return;
		}
	}
	next();
}


const verificationSignUp = {};
verificationSignUp.controlDuplicationLoginOuEmail = controlDuplicationLoginOuEmail;
verificationSignUp.existenceRole = existenceRole;

module.exports = verificationSignUp;