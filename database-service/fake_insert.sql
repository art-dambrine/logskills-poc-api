/* INSERT DATA */
INSERT INTO Utilisateurs (nom, prenom, mail, login, password, cree_le, modifie_le)
VALUES ('SYS', 'ADMIN', 'sysadmin@test.fr', 'SYSADM', '123', curdate(), curdate());

INSERT INTO Tags (nom)
VALUES ('Projet');

INSERT INTO Categories (nom)
VALUES ('Etudes');

INSERT INTO Activites (nom, temps_focus, temps_pause, nb_round, id_categorie, id_utilisateur, cree_le, modifie_le)
VALUES ('Code Java', 25, 5, 3, 1, 1, curdate(), curdate());

INSERT INTO Tags_Activites (id_tag, id_activite)
VALUES (1,1);

INSERT INTO Log_Activites (temps_total, temps_actif, id_activite, date)
VALUES (90, 75, 1, curdate());

INSERT INTO Categories (nom)
VALUES ('Loisirs');
INSERT INTO Categories (nom)
VALUES ('Travails');
INSERT INTO Categories (nom)
VALUES ('Codes');
INSERT INTO Categories (nom)
VALUES ('Sports');

