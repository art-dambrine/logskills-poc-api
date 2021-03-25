const { verificationToken } = require("./authentification/authJwt");

module.exports = app => {

    const express = require("express")
    const router = express.Router()
    const verificationSignUp = require('./authentification/verificationSignUp');
    const authJwt = require('./authentification/authJwt');

    //Gestion Activites
    const ActivitesController = require("./controllers/ActivitesController.js")
    router.get("/activites", ActivitesController.getAll)
    /*router.get("/create", ActivitesController.create)
    router.post("/", ActivitesController.store)
    router.get("/:id/edit", ActivitesController.edit)
    router.put("/:id", ActivitesController.update)
    router.delete("/:id", ActivitesController.destroy)*/

    //Gestion Utilisateurs
    const UtilisateursController = require('./controllers/UtilisateursController.js');
	router.post('/auth/signup', [verificationSignUp.controlDuplicationLoginOuEmail, verificationSignUp.existenceRole], UtilisateursController.signup);
	router.post('/auth/signin', UtilisateursController.signin);
	//router.get('/test/user', [authJwt.verificationToken], UtilisateursController.userContent);
	//router.get('/test/admin', [authJwt.verificationToken, authJwt.verificationSiAdmin], UtilisateursController.adminBoard);


    //Gestion Catégorie
    const CategoriesController = require("./controllers/CategoriesController.js")
    router.get("/categories", CategoriesController.getAll)

    //Gestion des Logs

    //Gestion des tags
    app.use('/', router);

};