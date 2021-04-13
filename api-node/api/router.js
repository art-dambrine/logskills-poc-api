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
    const Logs_ActivitesController = require("./controllers/Logs_ActivitesController.js")
    router.get("/logs",[authJwt.verificationToken], Logs_ActivitesController.getLastLogs)
    router.post("/activites/:id/logs", [authJwt.verificationToken], Logs_ActivitesController.create)
    router.delete("/activites/:idAct/logs/:idLog",[authJwt.verificationToken], Logs_ActivitesController.deleteOneActivitesLogs)
    router.delete("/activites/:idAct/logs/",[authJwt.verificationToken], Logs_ActivitesController.deleteAllActivitesLogs)

    //Gestion des tags
    //const TagsController = require("./controllers/TagsController.js")
    //router.get("/Tags",[authJwt.verificationToken], Logs_ActivitesController.getAll)


    app.use('/', router);

};