// Personal API Key for OpenWeatherMap API
let apiKey = '&appid=da2dedf6081a89b5f00c0907148184d4'
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="
const newZip = document.getElementById('zip').value;
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener("click", performAction);
/* Function called by event listener */
function performAction(e){
	getZip(baseURL, newZip, apiKey);
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
		body: JSON.stringify(data),
	});
	try{
		const newData = await response.json();
		return newData;
	}catch(error) {
		console.log("error", error);
	}
};

/* Function to GET Project Data */
const retrieveData = async (url='') => {
	const req = await fetch(url);
	try{
		const allData = await request.json();
	}
	catch(error){
		console.log("error", error);
	}
};

function postGet() {
	postData('/all',{temperature:data.temperature, date: data.date, userResponse: data.userResponse})
	.then(function(data){
		retrieveData('/all')
	})
	.then(
	updateUI()
	)
};

//Update UI
const updateUI = async() => {
	const request = await fetch('/all')
	try{
		const allData = await request.json()
		console.log(allData);
	document.getElementById('date').innerHTML = allData[0].date;
	document.getElementById('temp').innerHTML = allData[0].temperature;
	document.getElementById('content').innerHTML = allData[0].userResponse;

	}catch(error){
		console.log("error",error);
	}
}