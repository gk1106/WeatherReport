import React, { useState } from 'react';
import axios from 'axios';

function WeatherSearch() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: city, 
          appid: '26fe962e955af9b2d1d8d255ea481806', 
          units: 'metric', 
        },
      });

      
      const data = response.data;
      setWeatherData({
        city: data.name, 
        temperature: data.main.temp.toFixed(2), 
        condition: data.weather[0].description,  
        wind_speed: data.wind.speed, 
      });
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) fetchWeather();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Weather Finder</h1>
      <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-3 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Search
        </button>
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {weatherData && (
        <div className="mt-6 p-4 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700">{weatherData.city}</h2>
          <p className="text-lg">Temperature: <span className="font-bold">{weatherData.temperature}°C</span></p>
          <p className="text-lg">Condition: <span className="font-bold">{weatherData.condition}</span></p>
          <p className="text-lg">Wind Speed: <span className="font-bold">{weatherData.wind_speed} km/h</span></p>
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
