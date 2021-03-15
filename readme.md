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