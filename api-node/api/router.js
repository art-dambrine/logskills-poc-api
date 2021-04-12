const { verificationToken } = require("./authentification/authJwt");

module.exports = app => {

    const express = require("express")
    const router = express.Router()
    const verificationSignUp = require('./authentification/verificationSignUp');
    const authJwt = require('./authentification/authJwt');

    //Gestion Activites
    const ActivitesController = require("./controllers/ActivitesController.js")
    router.get("/activites",[authJwt.verificationToken], ActivitesController.getAll)
    router.get("/activites/:id", [authJwt.verificationToken], ActivitesController.getByID)
    router.post("/activites", [authJwt.verificationToken], ActivitesController.create)
    router.put("/activites/:id", [authJwt.verificationToken], ActivitesController.update)
    router.delete("/activites/:id",[authJwt.verificationToken], ActivitesController.delete)

    //Gestion Utilisateurs
    const UtilisateursController = require('./controllers/UtilisateursController.js');
	router.post('/auth/signup', [verificationSignUp.controlDuplicationLoginOuEmail, verificationSignUp.existenceRole], UtilisateursController.signup);
	router.post('/auth/signin', UtilisateursController.signin);
	router.get('/profil', [authJwt.verificationToken], UtilisateursController.profil_utilisateur);
	//router.get('/test/admin', [authJwt.verificationToken, authJwt.verificationSiAdmin], UtilisateursController.adminBoard);


    //Gestion Catégorie
    const CategoriesController = require("./controllers/CategoriesController.js")
    router.get("/categories", CategoriesController.getAll)
    router.post("/categories", CategoriesController.create)

    //Gestion des Logs

    //Gestion des tags
    app.use('/', router);

};