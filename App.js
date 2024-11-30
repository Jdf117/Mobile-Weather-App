import React, { useState, useEffect } from 'react';
import getWeatherForecast from './services/weatherService';
import './styles/App.css'; // Reference to the new CSS file

const App = () => {
  const [city, setCity] = useState('Vancouver');  // Default to Vancouver
  const [currentWeather, setCurrentWeather] = useState(null);  // Current weather data
  const [forecast, setForecast] = useState([]);  // 5-day forecast data
  const [error, setError] = useState('');

  // Function to fetch weather and forecast for the given city
  const fetchWeather = async (city) => {
    try {
      const weatherData = await getWeatherForecast(city);

      // Current weather is the first item in the forecast list
      setCurrentWeather(weatherData.list[0]);  // Most recent weather (as "current")

      // Use forecast data for the next 5 days (at regular 24-hour intervals)
      const forecastData = weatherData.list.filter((_, index) => index % 8 === 0).slice(1, 6); 
      setForecast(forecastData);  // Set 5-day forecast
      setError('');
    } catch (error) {
      setError('City not found or error fetching weather');
      setCurrentWeather(null);
      setForecast([]);
    }
  };

  // Fetch Vancouver weather on load
  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <View className="app-container">
      <h1>Weather Forecast</h1>

      {/* Search Bar */}
      <View className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={() => fetchWeather(city)}>Get Forecast</button>
      </View>

      {/* Display any errors */}
      {error && <Text className="error">{error}</Text>}

      {/* Display Current Weather */}
      {currentWeather && (
        <View className="current-weather">
          <h2>Current Weather in {city}</h2>
          <Text>{currentWeather.weather[0].description}</Text>
          <Text>Temperature: {currentWeather.main.temp} °C</Text>
          <Text>Humidity: {currentWeather.main.humidity} %</Text>
        </View>
      )}

      {/* Display 5-Day Weather Forecast */}
      {forecast.length > 0 && (
        <View className="forecast-container">
          <h2>5-Day Weather Forecast</h2>
          <View className="forecast-grid">
            {forecast.map((day, index) => (
              <View key={index} className="forecast-day">
                <Text><strong>Day {index + 1}</strong></Text>
                <Text>{day.weather[0].description}</Text>
                <Text>Temp: {day.main.temp} °C</Text>
                <Text>Humidity: {day.main.humidity} %</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default App;

