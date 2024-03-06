// Function to fetch weather data by latitude and longitude
function getPogoda() {
  const bishkekLatitude = 42.8792;
  const bishkekLongitude = 74.5827;
  const apiKey = "a869a4a22d48723b3cbb4d9383c76519";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${bishkekLatitude}&lon=${bishkekLongitude}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherInfo(data, "Bishkek"); // Call the updateWeatherInfo function with the fetched data
      hideError(); // Hide the error message if the request is successful
    })    
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to hide error message
function hideError() {
  const errorElement = document.getElementById("error");
  errorElement.classList.add("hidden");
}


// Function to update weather information in the UI
function updateWeatherInfo(data, cityName) {
  const temperature = document.querySelector(".temperature");
  const description = document.querySelector(".general-info-data-short");
  const dateInfo = document.querySelector(".date-info");
  const cityElement = document.getElementById("cityName");

  // Update city name
  cityElement.textContent = cityName;

  // Update temperature (convert from Kelvin to Celsius)
  temperature.textContent = `${Math.round(data.main.temp - 273.15)}°C`;

  // Update weather description
  description.textContent = data.weather[0].description;

  // Get current date
  const currentDate = new Date();

  // Update date information
  dateInfo.textContent = currentDate.toLocaleDateString();
}




// Search functionality
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    searchCity(city);
  } else {
    console.error('Please enter a city name.');
  }
});

function searchCity(city) {
  const apiKey = "a869a4a22d48723b3cbb4d9383c76519";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then((data) => {
      updateWeatherInfo(data, city); // Pass city as a parameter
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to fetch weather data for Bishkek on page load
window.addEventListener('load', () => {
  getPogoda();
});

