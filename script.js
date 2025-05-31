const API_KEY = 'd4a0439d0b81586b1caf6fb4a1cd80f9'; // OpenWeatherMap API key
const cityInput = document.getElementById('city');
const searchBtn = document.querySelector('button[onclick="getWeather()"]');
const currentLocationBtn = document.getElementById('currentLocationBtn');
const recentCities = document.getElementById('citySelect');
const weatherContainer = document.getElementById('weather-container');
const weatherIcon = document.getElementById('weather-icon');
const tempDiv = document.getElementById('temp-div');
const weatherInfo = document.getElementById('weather-info');
const forecastHeading = document.getElementById('forecast-heading');
const forecast = document.getElementById('forecast');

// Load recent cities from localStorage
let recentSearches = JSON.parse(localStorage.getItem('recentCities')) || [];

// Toggle recent cities dropdown visibility
function toggleRecentCities(show) {
  if (show && recentSearches.length > 0) {
    recentCities.classList.remove('hidden');
  }
}

// Update recent cities dropdown
function updateRecentCities() {
  if (recentSearches.length === 0) {
    toggleRecentCities(false);
    return;
  }
  recentCities.innerHTML = '<option value="" disabled selected>Select a recent city</option>' +
    recentSearches.map(city => `<option value="${city}">${city}</option>`).join('');
  toggleRecentCities(false); // Hide by default, shown on input focus
}
