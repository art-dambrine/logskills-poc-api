CREATE TABLE `Utilisateurs` (
  `id_utilisateur` int PRIMARY KEY AUTO_INCREMENT,
  `nom` varchar(255),
  `prenom` varchar(255),
  `mail` varchar(255),
  `login` varchar(255),
  `password` varchar(255),
  `cree_le` datetime,
  `modifie_le` datetime
);

CREATE TABLE `Categories` (
  `id_categorie` int PRIMARY KEY AUTO_INCREMENT,
  `nom` varchar(255)
);

CREATE TABLE `Tags` (
  `id_tag` int PRIMARY KEY AUTO_INCREMENT,
  `nom` varchar(255)
);

CREATE TABLE `Tags_Activites` (
  `id_tag` int,
  `id_activite` int,
  PRIMARY KEY (`id_tag`, `id_activite`)
);

CREATE TABLE `Activites` (
  `id_activite` int PRIMARY KEY AUTO_INCREMENT,
  `nom` varchar(255),
  `id_tags_activite` int,
  `temps_focus` int,
  `temps_pause` int,
  `nb_round` int,
  `id_categorie` int,
  `id_utilisateur` int,
  `cree_le` datetime,
  `modifie_le` datetime
);

CREATE TABLE `Log_Activites` (
  `id_log_activite` int PRIMARY KEY AUTO_INCREMENT,
  `temps_total` int,
  `temps_actif` int,
  `id_activite` int,
  `date` datetime
);

ALTER TABLE `Activites` ADD FOREIGN KEY (`id_categorie`) REFERENCES `Categories` (`id_categorie`);

ALTER TABLE `Activites` ADD FOREIGN KEY (`id_utilisateur`) REFERENCES `Utilisateurs` (`id_utilisateur`);

ALTER TABLE `Log_Activites` ADD FOREIGN KEY (`id_activite`) REFERENCES `Activites` (`id_activite`);

ALTER TABLE `Tags` ADD FOREIGN KEY (`id_tag`) REFERENCES `Tags_Activites` (`id_tag`);

ALTER TABLE `Activites` ADD FOREIGN KEY (`id_tags_activite`) REFERENCES `Tags_Activites` (`id_activite`);