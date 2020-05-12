// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('weather-journal-app/website'));
const port = 8000;
// Spin up the server
const server = app.listen(port, listening);
// Callback to debug
function listening(){
	console.log('server running');
	console.log(`running on localhost: ${port}`);};
// Initialize all route with a callback function
app.get('/all', function(req, res){
	res.send(projectData);
});

// Callback function to complete GET '/all'
app.post('/add', callBack);

function callBack(req, res){
	res.send('POST received');
};
// Post Route
app.post('/projectData', addData);

function addData(req, res){
	newEntry ={
		temperature:req.body.temp,
		date:req.body.date,
		userResponse:req.body.content,
};
	projectData.push(newEntry);
	res.send(projectData);
	console.log(body);
};