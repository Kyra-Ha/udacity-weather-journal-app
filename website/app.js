// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=da2dedf6081a89b5f00c0907148184d4'
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
let imperialUnit = "&unit=imperial"

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener("click", performAction);
/* Function called by event listener */
function performAction(e){
	const newZip = document.getElementById('zip').value;
	const content = document.getElementById('feelings').value;
	getZip(baseURL, newZip, apiKey, imperialUnit)
		.then(function(data){
			postData('add', {date: newDate, temp: data.main.temp, content});
			console.log(data);
		}).then(function(){
			updateUI();
		})
};
/* Function to GET Web API Data*/
const getZip = async (baseURL, zip, key, unit) => {
	const res = await fetch(baseURL+zip+key+unit)
	try{
		const data = await res.json();
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
			temp: data.temp,
			date: data.date,
			content: data.content
		}),

	});
	try{
		const newData = await response.json();
		console.log(newData);
		return newData;
	}catch(error) {
		console.log("error", error);
	}
	return response.json();
};
/* Function to GET Project Data */
const retrieveData = async (url='') => {
	const request = await fetch('http://localhost:8000/all');
	try{
		const allData = await request.json();
	}
	catch(error){
		console.log("error", error);
	}
};


//Update UI
const updateUI = async() => {
	const request = await fetch('all')
	try{
		const allData = await request.json()
		console.log(allData);
		document.getElementById('date').innerHTML = "Date:\n" + allData.date;
		document.getElementById('temp').innerHTML = "Temperature:\n" + Math.round((allData.temperature-273.15)*(9/5)+32) +"\n F";
		document.getElementById('content').innerHTML = "My Feelings:\n" + allData.content;

	}catch(error){
		console.log("error",error);
	}
};