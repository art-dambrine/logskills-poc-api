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
const db = require('./models'); 
db.logskills_database.sync();



// include router
const router = require("./router")

//Require the routes
require("./router")(app);

//Listen on port
app.listen(port, () => console.log(`Listening on port ${port}`));
