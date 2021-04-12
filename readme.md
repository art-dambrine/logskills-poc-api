#DOCKER-COMPOSE-NODEJS-EXPRESS-MARIADB
In this sample, we will look at the functionality provided by 'Docker Compose' for defining and running multi-container Docker applications.

We are going to use 'mariadb' like our specialized database and 'Node.js' as our platform for creating highly performant web applications.

### RUN THE PROJECT
`docker-compose up`

### INSPECT YOUR MYSQL CONTAINER(to see your database)
1. docker ps
2. docker exec -it YOUR_MARIADB_CONTAINER_ID bash
3. mysql -u root -p
4. put the password(123)
5. enter 
6. use LOGSKILLS;
7. show tables;
8. describe EMPLOYEE;

### START DEV

Before starting dev environment with docker-compose you need to npm install : run `./before_dev_npm.sh`
````bash
#!/bin/bash
docker run -ti --rm --name node-builder -v $PWD/api-node/api:/usr/src node:lts-alpine3.10 sh -c "cd /usr/src && npm install"
````

Then run `docker-compose up`



### Specs API
*---------RAPPEL---------*
*Source : https://grokonez.com/node-js/jwt/nodejs-jwt-authentication-nodejs-express-restapis-json-web-token-bcryptjs-sequelize-mysql*
*Pour acceder à une page sécurisé, le token de l'utilisateur, généré par la fonction SignIn, doit être envoyé dans le header sous forme de Clé-Valeur*
*KEY: x-access-token* 
*EXEMPLE VALUE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTM4MzM5NTM0LCJleHAiOjE1Mzg0MjU5MzR9.wKse6-ERNP4g_sPBdM72GZgpNpHH87UGbzYH3_0mdpo*


*GESTION DES UTILISATEURS*

1. `POST http://api.monsite.ovh/auth/signup` *Enregistrement d'un utilisateur*
    *Format de la requete :*
    ```json
    {
        "nom": "Adam",
        "prenom": "Francois",
        "mail": "adam.francois@gmail.com",
        "login": "Fradam",
        "password": "123456789",
        "roles": ["utilisateur"]
    }
    ```
    *Format de la reponse :*

    200 OK - Utilisateur enregistré

2. `POST http://api.monsite.ovh/auth/signin` *Connexion d'un utilisateur*
    *Format de la requete :*
    ```json
    {
        "login": "Fradam",
        "password": "123456789"
    }
    ```
    *Format de la reponse :*
    ```json
    {
        "auth": true,
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTM4MzM5NTM0LCJleHAiOjE1Mzg0MjU5MzR9.wKse6-ERNP4g_sPBdM72GZgpNpHH87UGbzYH3_0mdpo",
    }
    ```

3. `GET http://api.monsite.ovh/profil` *recuperation du profil de l'utilisateur (nom, prenom, mail, roles)*
    *PAGE SECURISE: Tout les roles*
    *Format de la reponse :*
    ```json
    {
        "description": "page de l'utilisateur",
        "utilisateur" :{
            "nom": "Adam",
            "prenom": "Francois",
            "mail": "adam.francois@gmail.com",
            "login": "Fradam",
            "roles": [
                {
                    "id": 3,
                    "nom": "utilisateur"
                }
            ]
        }   
    }
    ```

4. `GET http://api.monsite.ovh/admin-profil` *Liste de tout les profils créé dans la base*
    *PAGE SECURISE: Role ADMIN uniquement*
    *Format de la requete :*
    *Format de la reponse :*

5. `GET http://api.monsite.ovh/categories` *permet de connaître toute les catégories disponibles)*
   *Format de la reponse :*

   ```json
   [
       {
           "id": 1,
           "nom": "Guitare"
       },
       {
           "id": 2,
           "nom": "Piano"
       },
       {
           "id": 3,
           "nom": "Natation"
       },
       {
           "id": 4,
           "nom": "Code"
       },
       {
           "id": 5,
           "nom": "Révisions"
       }
   ]
   ```

6. `POST http://api.monsite.ovh/categories` *permet de créé une categorie)*
   *PAGE SECURISE: Role ADMIN uniquement*
    *Format de la requete :*
    *Format de la reponse :*
