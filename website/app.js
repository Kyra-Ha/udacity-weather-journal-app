/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=da2dedf6081a89b5f00c0907148184d4'
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener("click", performAction);
/* Function called by event listener */
function performAction(e){
	const newZip = document.getElementById('zip').value;
	const content = document.getElementById('feelings').value;
	getZip(baseURL, newZip, apiKey)
		.then(function(data){
			postData('https://localhost:8000/add', {date: newDate, temperature: data.temp, content});
			console.log(data);
		}).then(function(){
			updateUI();
		})
};
/* Function to GET Web API Data*/
const getZip = async (baseURL, zip, key) => {
	const res = await fetch(baseURL+zip+key)
	try{
		const data = await res.json();
		console.log(data);
		return data;
	}
	catch(error){
		console.log("error", error)
	}
}
/* Function to POST data */

const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			date: data.date,
			temp: data.temp,
			content: data.content,
		}),
	});
	try{
		const newData = await response.json();
		return newData;
	}catch(error) {
		console.log("error", error);
	}
	return response.json();
};

/* Function to GET Project Data */
const retrieveData = async (url='') => {
	const request = await fetch(url);
	try{
		const allData = await request.json();
	}
	catch(error){
		console.log("error", error);
	}
};

// function postGet() {
// 	postData('/all',{temperature:data.temp, date: data.date, content: data.content})
// 	.then(function(data){
// 		retrieveData('/all')
// 	})
// 	.then(
// 		updateUI('/all')
// 		);
// };



//Update UI
const updateUI = async() => {
	const request = await fetch('https://localhost:8000/all')
	try{
		const allData = await request.json()
		console.log(allData);
		document.getElementById('date').innerHTML = allData[0].date;
		document.getElementById('temp').innerHTML = allData[0].temp;
		document.getElementById('content').innerHTML = allData[0].content;

	}catch(error){
		console.log("error",error);
	}
}