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