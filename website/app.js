/* Global Variables */
const form = document.querySelector('.appform');

// Base URL and API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const personalApiKey = '&appid=5beb43e13dc3fa8be428191e6e50a00c';

//Get the date data
let d = new Date();
let newDate = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate)
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // Get user input data for zipcode and the user's feeling
  const userZip = document.getElementById('zip').value;
  const content = document.getElementById('feeling').value;

  getWeather(baseURL, userZip, personalApiKey)
    .then(function (userData) {
      // Add date, temperature and user's feeling data to POST request to the server
      postData('/add', { date: newDate, temp: userData.main.temp, content })
    }).then(function (newData) {
      // Update browser content by calling the updateUI function
      updateUI()
    })
  // Reset form
  form.reset();
}

/* Function to GET Web API Data */
const getWeather = async (baseURL, userZip, personalApiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + userZip + personalApiKey);
  try {
    // UserData equals to the result of fetch function
    const userData = await res.json();
    console.log(userData)
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST the date, temperature and user's feeling data to the server */
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content
    })
  })

  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

/* Function to GET all data from the server */
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()

    // Update new date, temperature and user's feeling entry values
    document.getElementById('date').innerHTML = allData.date;
    // document.getElementById('temp').innerHTML = allData.temp
    document.getElementById('temp').innerHTML = ((1.8*(Number(allData.temp) - 273)) + 32).toFixed(2);
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log("error", error);
  }

};