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

1. `GET http://api.monsite.ovh/categories` *permet de connaître toute les catégories disponibles)*

   *Présentation JSON attendue :*

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

   

