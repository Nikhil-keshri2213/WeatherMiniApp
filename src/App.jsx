import './App.css'
import Hourly from './components/Hourly';
import { FaMapMarkedAlt, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  //const api_key = "f70e9878ba844b8584a124142251705"
  const api_key = import.meta.env.VITE_API_KEY;
  const api_url = "https://api.weatherapi.com/v1/forecast.json"

  const handelKeyPress = (e) =>{
    if(e.key === "Enter"){
      fetchData(city);
    }
  }

  const fetchData = async(query) =>{
    try{
      const response = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=1`);
      console.log(response.data);
      setWeatherData(response.data)
      setError('')
    }
    catch(err){
      setError("City Not found or Something wrong.")
      setWeatherData(null)
    }
  }

const getCurrentLocation=()=>{
  if(navigator.geolocation){
    console.log("GeoLocation is supported");
    navigator.geolocation.getCurrentPosition((pos)=>{
      const {latitude,longitude} = pos.coords
      
      // console.log(latitude,longitude)
      
      const query = `${latitude},${longitude}`
      fetchData(query)
    },(err)=>{
      setError(err.message)
    })
  }else{
    console.log("GeoLocation is not supported");
  }
}


  return (
  <div className='animated-gradient bg-gradient-to-br from-blue-200 via-blue-500 to-indigo-900 min-h-screen flex flex-col items-center justify-center p-4 rounded-2xl'>
    
    <h1 className='text-4xl font-bold text-white mb-6 drop-shadow-lg'>🌤 SkyCast : Real-Time Weather App.☁️</h1>

    <div className='bg-white shadow-2xl p-6 rounded-2xl w-full max-w-md'>

      {/* Search Input Section */}
      <div className='flex items-center bg-slate-200 rounded-3xl px-3 py-2 shadow-sm'>
        <FaSearch className='text-gray-600 w-5 h-5' />
        <input
          type="text"
          placeholder='Search city...'
          onKeyUp={handelKeyPress}
          onChange={(e)=>setCity(e.target.value)}
          value={city}
          className='ml-3 bg-transparent h-10 p-2 focus:outline-none w-full text-gray-800 placeholder-gray-400'
        />
        <button 
          onClick={getCurrentLocation}
          className='ml-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200'>
          <FaMapMarkedAlt className='w-5 h-5' />
        </button>
      </div>

      {/* Weather Info */}
      {weatherData && (
        <div className='mt-6 text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>{weatherData.location.name}, {weatherData.location.region}</h2>
          <img
            src={weatherData.current.condition.icon}
            className='mx-auto h-28 my-3'
            alt="Weather"
          />
          <p className='text-xl font-bold text-gray-700'>{weatherData.current.temp_c}℃ / {weatherData.current.temp_f}℉</p>
          <p className='text-gray-500 font-medium capitalize text-2xl'>{weatherData.current.condition.text}</p>

          <Hourly hourlyData={weatherData.forecast.forecastday[0].hour} forecastDate={weatherData.forecast.forecastday[0].date}/>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className='text-red-500 text-center mt-4'>{error}</p>
      )}
      <footer className='text-slate-600 font-medium capitalize text-sm mt-4 text-right w-full'>@Developed by Nikhil Keshri</footer>
    </div>
  </div>
);

}

export default App;
