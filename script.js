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

// Add city to recent searches
function addToRecentSearches(city) {
  if (city && !recentSearches.includes(city)) {
    recentSearches.unshift(city);
    if (recentSearches.length > 5) recentSearches.pop();
    localStorage.setItem('recentCities', JSON.stringify(recentSearches));
    updateRecentCities();
  }
}

// Show error message with specific handling for API status codes
function showError(message, status = null) {
  let errorMessage = message;
  if (status === 404) {
    errorMessage = 'City not found. Please check the spelling.';
  } else if (status === 429) {
    errorMessage = 'API rate limit exceeded. Please try again later.';
  } else if (status) {
    errorMessage = `API error (${status}). Please try again.`;
  }
  document.getElementById('errorMessage').textContent = errorMessage;
  document.getElementById('errorMessage').classList.remove('hidden');
  weatherContainer.classList.add('hidden');
  weatherIcon.classList.add('hidden');
  tempDiv.textContent = '';
  weatherInfo.textContent = '';
  forecastHeading.classList.add('hidden');
  forecast.classList.add('hidden');
  forecast.innerHTML = '';
}

// Validate city input for invalid characters
function validateCityInput(city) {
  const regex = /^[a-zA-Z\s-]+$/; // Allow letters, spaces, and hyphens
  return regex.test(city);
}

// Fetch current weather by city
async function fetchWeatherByCity(city) {
  if (!validateCityInput(city)) {
    showError('Invalid city name. Use letters, spaces, or hyphens only.');
    return;
  }
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('API error', { cause: response.status });
    const data = await response.json();
    console.log('Weather Icon Code:', data.weather[0].icon); // Debug icon code
    displayCurrentWeather(data);
    addToRecentSearches(city);
    await fetchForecast(data.coord.lat, data.coord.lon);
  } catch (error) {
    showError('Invalid city name or API error.', error.cause);
  }
}

// Fetch current weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('Location not found', { cause: response.status });
    const data = await response.json();
    console.log('Weather Icon Code:', data.weather[0].icon); // Debug icon code
    displayCurrentWeather(data);
    addToRecentSearches(data.name);
    await fetchForecast(lat, lon);
  } catch (error) {
    showError('Unable to fetch weather for your location.', error.cause);
  }
}

// Fetch 5-day forecast
async function fetchForecast(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    if (!response.ok) throw new Error('Forecast not available', { cause: response.status });
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    showError('Unable to fetch forecast.', error.cause);
  }
}

// Display current weather
function displayCurrentWeather(data) {
  document.getElementById('errorMessage').classList.add('hidden');
  weatherContainer.classList.remove('hidden');
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.classList.remove('hidden');
  tempDiv.textContent = `${Math.round(data.main.temp)}°C`;
  weatherInfo.innerHTML = `
    <p class="text-white">${data.name} (${new Date().toISOString().split('T')[0]})</p>
    <div class="flex justify-around mt-6">
      <p class="text-white"><i class="fa-solid fa-wind"></i> ${data.wind.speed} m/s</p>
      <p class="text-white"><i class="fa-solid fa-droplet"></i> ${data.main.humidity}%</p>
    </div>
  `;
  forecastHeading.classList.remove('hidden');
  forecast.classList.remove('hidden');
}
