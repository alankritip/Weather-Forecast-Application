# WeatherView:

A weather forecast application built with HTML, Tailwind CSS, and JavaScript using the OpenWeatherMap API. It allows users to search for weather by city name or current location, view current weather conditions, and see a 5-day forecast. Recent searches are stored in a dropdown for quick access.\

## GitHub Repository :\
**[GitHub project Link]()**

 ## Features :\
-> Search weather by city name or current location (geolocation).\
-> Display current weather (temperature, humidity, wind speed) with condition icons.\
-> Show a 5-day forecast with date, temperature, humidity, wind speed, and icons.\
-> Store up to 5 recent searches in a dropdown using localStorage.\
-> Responsive design for desktop, iPad Mini (768px), and iPhone SE (320px).\
-> Error handling for invalid inputs, API errors, and geolocation issues.\

 ## Setup :

  ### 1. Clone the Repository:\
       ```
          git clone <[Repository-url](https://github.com/alankritip/Weather-Forecast-Application)>
          cd weatherview
        ```\
  ### 2. Install Tailwind CSS:\
  -> Follow instructions at Tailwind CSS Installation.\
  -> Alternatively, use the provided src/output.css\

  ### 3. Get an OpenWeatherMap API Key:\
  -> Sign up at OpenWeatherMap and obtain an API key.\
  ->Replace the API_KEY constant in script.js with API key:\
    ```
    const API_KEY = 'd4a0439d0b81586b1caf6fb4a1cd80f9';
    ```\
  ### 4. Run the Application:\
  -> Open index.html in a browser, or\
  -> Serve the project using a local server.\
  
## Usage :\
 -> **Search by City**: Enter a city name in the input field and click "Search" or press Enter.\
 -> **Use Current Location**: Click "Use Current Location" to fetch weather based on your geolocation.\
 -> **Recent Cities**: Click the input field to show a dropdown of recent searches (if any). Select a city to view its weather.\
 -> **View Weather**: Check current weather (temperature, humidity, wind speed) and the 5-day forecast below.\

## Project Structure :\
 <ins>index.html</ins> :  Main HTML file with the UI structure.\
 <ins>src/output.css</ins> : Compiled Tailwind CSS file.\
 <ins>script.js</ins> : JavaScript logic for API calls, event handling, and UI updates.\

## Version Control :\
  The project uses Git for version control. View the commit history in the GitHub repository: <[Repository-url](https://github.com/alankritip/Weather-Forecast-Application)>.\

## Dependencies :\
 -> Tailwind CSS for styling.\
 -> Font Awesome for icons.\
 -> OpenWeatherMap API for weather data.\

## Notes :\
-> Ensure a stable internet connection for API requests.\
-> Geolocation requires browser permission and HTTPS (use a local server for testing).\
-> The application is tested for responsiveness on desktop, iPad Mini (768px), and iPhone SE (320px).
