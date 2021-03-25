const express = require('express')
const cors = require('cors');
const port = 8123

//Init express
const app = express()

//Enable CORS(Cross Origin Resource Sharing)
app.use(cors());

// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Require the models
const db = require('./config/db.config'); 
const Roles = db.Roles;
// force: true will drop the table if it already exists
db.logskills_database.sync({force: true}).then(() => {
    console.log('Drop and Resync with { force: true }');
    initial();
  });


// include router
const router = require("./router")

//Require the routes
require("./router")(app);

//Listen on port
app.listen(port, () => console.log(`Listening on port ${port}`));

function initial(){
	Roles.create({
		id: 1,
		name: "USER"
	});
	
	Roles.create({
		id: 2,
		name: "ADMIN"
	});

}