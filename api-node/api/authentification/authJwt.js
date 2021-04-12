const jwt = require('jsonwebtoken');
const config = require('../config/securite.config.js');
const db = require('../config/db.config.js');
const Role = db.role;
const User = db.user;

verificationToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'Token manquant' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Erreur authentification -> ' + err 
				});
		}
		req.userId = decoded.id;
		console.log("Token verifié || id user : " + req.userId)
		next();
	});
}

verificationSiAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findById(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].nom);
					if(roles[i].nom.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send("Vous devez être administrateur pour effectuer cette action");
				return;
			})
		})
}

const authJwt = {};
authJwt.verificationToken = verificationToken;
authJwt.verificationSiAdmin  = verificationSiAdmin ;

module.exports = authJwt;