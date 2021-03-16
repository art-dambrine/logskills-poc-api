/* INSERT DATA */
INSERT INTO Utilisateurs (nom, prenom, mail, login, password, cree_le, modifier_le)
VALUES ('SYS', 'ADMIN', 'sysadmin@test.fr', 'SYSADM', '123', curdate(), curdate());

INSERT INTO Activites (nom, tags, mail, login, password, cree_le, modifier_le)
VALUES ('SYS', 'ADMIN', 'sysadmin@test.fr', 'SYSADM', '123', curdate(), curdate());