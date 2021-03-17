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

