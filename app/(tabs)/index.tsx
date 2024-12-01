import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import getWeatherForecast from '../../service/weatherService';
import { Card } from '@rneui/themed';
import { styles } from '@/styles/styles';
import {LinearGradient} from 'expo-linear-gradient';

import * as Location from 'expo-location';


type Weather = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
};

type ForecastDay = {
  weather: { description: string }[];
  main: { temp: number; humidity: number };
};

export default function App () {
  const [city, setCity] = useState('');  
  const [cityInput, setCityInput] = useState('');
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);  // Current weather data
  const [forecast, setForecast] = useState<ForecastDay[]>([]);  // 5-day forecast data
  const [error, setError] = useState('');
  const [location, setLocation] = useState();

  // useEffect(() => {
  //   async function getCurrentLocation() {
      
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setError('Permission to access location was denied');
  //       return;
  //     }

  //     let currentLocation = await Location.getCurrentPositionAsync({});
  //     setLocation(currentLocation);
  //     console.log(currentLocation);
  //   }

  //   getCurrentLocation();
  // }, []);

  // let text = 'Waiting...';
  // if (error) {
  //   text = error;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  // const geocode = async () => {
  //   const geoCodedLocation = await Lcat
  // }

    // Function to fetch weather and forecast for the given city
    const fetchWeather = async (city: any) => {
      try {
        const weatherData = await getWeatherForecast(city);
        //console.log(weatherData);
        // Current weather is the first item in the forecast list
        setCurrentWeather(weatherData.list[0]);  // Most recent weather (as "current")
  
        // Use forecast data for the next 5 days (at regular 24-hour intervals)
        const forecastData = weatherData.list.filter((_ : any, index: any) => index % 8 === 0).slice(1, 6); 
        setForecast(forecastData);  // Set 5-day forecast
        setError('');
      } catch (error) {
        setError('City not found or error fetching weather');
        setCurrentWeather(null);
        setForecast([]);
      }
    }
    // Fetch Vancouver weather on load
    useEffect(() => {
      fetchWeather(city);
    }, []);

    const handlePress = () => {
      setCity(cityInput);
      fetchWeather(cityInput);
    }

  return (
    <>
    <View style={styles.myBackground}>
      <LinearGradient       colors={['#0c93cf', '#afd7e8','#f4d41f','#fe9555']}
        style={styles.container}>
    <ScrollView style={{width: '100%'}}>
      <Card containerStyle={{borderRadius: 10}}>
      <View style={styles.container}>
        <Card.Title style={{marginTop: 10}} >Enter your location!</Card.Title>
        <TextInput style={styles.input} value={cityInput} placeholder="Input your city" onChangeText={setCityInput}/>
        <TouchableOpacity style={styles.button}><Button title="Forecast" onPress={handlePress}/></TouchableOpacity>
      </View>

      <Text>{location}</Text>
      </Card>
         {/* Display Current Weather */}
        <Card containerStyle={{borderRadius: 10}}>
         {currentWeather && (
          <View style={styles.container}>
            <Card.Title>Current Weather in {city}</Card.Title>
            {/* <Text style={styles.currentWeather} >Current Weather in {city}</Text> */}
            <Text style={styles.description}>{currentWeather.weather[0].description}</Text>
            <Text style={styles.temp}>Temp: {currentWeather.main.temp} °C</Text>
            <Text style={styles.humidity}>Humidity: {currentWeather.main.humidity} %</Text>
          </View>
         )}
        </Card>  

        <Card containerStyle={{borderRadius: 10}}>
          {forecast.length > 0 && (
            <View style={styles.forecastContainer}>
              <Card.Title>Weather Forecast </Card.Title>
              <ScrollView horizontal={true}>
              <View style={{flexDirection: 'row'}}>
              {forecast.map((day, index) => (
                <Card containerStyle={{borderRadius: 10, marginBottom: 10}}>
                  <View key={index} style={styles.container}>
                    <Text style={{fontSize: 20, marginBottom: 10}}>Day {index + 1}</Text>
                    <Text style={styles.description}>{day.weather[0].description}</Text>
                    <Text style={styles.temp}>Temp: {day.main.temp} °C</Text>
                    <Text style={styles.humidity}>Humidity: {day.main.humidity} %</Text>
                  </View>
                </Card>
              ))}
              </View>
              </ScrollView>
            </View>
          )}
        </Card>

    </ScrollView>
    </LinearGradient>
    </View>
    </>

  );
}



