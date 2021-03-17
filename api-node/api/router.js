module.exports = app => {
    const express = require("express")
    const router = express.Router()

    //Gestion Activites
    const ActivitesController = require("./controllers/ActivitesController.js")
    router.get("/activites", ActivitesController.getAllActivites)
    /*router.get("/create", ActivitesController.create)
    router.post("/", ActivitesController.store)
    router.get("/:id/edit", ActivitesController.edit)
    router.put("/:id", ActivitesController.update)
    router.delete("/:id", ActivitesController.destroy)*/

    //Gestion Utilisateurs

    //Gestion Catégorie

    //Gestion des Logs

    //Gestion des tags
    app.use('/', router);
};