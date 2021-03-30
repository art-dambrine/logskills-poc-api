CREATE TABLE `Utilisateurs` (
  `id_utilisateur` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nom` varchar(255),
  `prenom` varchar(255),
  `mail` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `cree_le` datetime,
  `modifie_le` datetime
);

CREATE TABLE `Categories` (
  `id_categorie` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL
);

CREATE TABLE `Tags` (
  `id_tag` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL
);

CREATE TABLE `Tags_Activites` (
  `id_tag` int NOT NULL,
  `id_activite` int NOT NULL,
  PRIMARY KEY (`id_tag`, `id_activite`)
);

CREATE TABLE `Activites` (
  `id_activite` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `temps_focus` int NOT NULL,
  `temps_pause` int NOT NULL,
  `nb_round` int NOT NULL,
  `id_categorie` int,
  `id_utilisateur` int NOT NULL,
  `cree_le` datetime,
  `modifie_le` datetime
);

CREATE TABLE `Log_Activites` (
  `id_log_activite` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `temps_total` int NOT NULL,
  `temps_actif` int NOT NULL,
  `id_activite` int NOT NULL,
  `date` datetime NOT NULL
);

ALTER TABLE `Activites` ADD FOREIGN KEY (`id_categorie`) REFERENCES `Categories` (`id_categorie`);

ALTER TABLE `Activites` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateurs` (`id_utilisateur`);

ALTER TABLE `Log_Activites` ADD FOREIGN KEY (`id_activite`) REFERENCES `Activites` (`id_activite`);

ALTER TABLE `Tags_Activites` ADD FOREIGN KEY (`id_activite`) REFERENCES `Activites` (`id_activite`);

ALTER TABLE `Tags_Activites` ADD FOREIGN KEY (`id_tag`) REFERENCES `Tags` (`id_tag`);

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