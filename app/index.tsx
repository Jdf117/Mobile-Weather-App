import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from 'react';
import getWeatherForecast from '../service/weatherService';
import { Card } from '@rneui/themed';

import axios from 'axios';
import {Link} from 'expo-router';
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";

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
  const [city, setCity] = useState('');  // Default to Vancouver
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);  // Current weather data
  const [forecast, setForecast] = useState<ForecastDay[]>([]);  // 5-day forecast data
  const [error, setError] = useState('');


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

  return (
    <>
    <ScrollView>
      <Card containerStyle={{borderRadius: 10}}>
      <View style={styles.container}>
        <Card.Title style={{marginTop: 10}} >Enter your location!</Card.Title>
        <TextInput style={styles.input} value={city} placeholder="Input your city" onChangeText={setCity}/>
        <TouchableOpacity style={styles.button}><Button title="Forecast" onPress={() => fetchWeather(city)}/></TouchableOpacity>
      </View>

      </Card>
         {/* Display Current Weather */}
        <Card containerStyle={{borderRadius: 10}}>
         {currentWeather && (
          <View style={styles.container}>
            <Card.Title>Current Weather in {city}</Card.Title>
            {/* <Text style={styles.currentWeather} >Current Weather in {city}</Text> */}
            <Text style={styles.description}>{currentWeather.weather[0].description}</Text>
            <Text style={styles.temp}>Temperature: {currentWeather.main.temp} °C</Text>
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

  

{/* 
        <View style={styles.container} >
      <Text style={styles.text}>Home Screen</Text>
      <Link href='/about' style={styles.button}> Go to About screen</Link>
    </View> */}

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  text:{
    color: '#fff',
  },
  button:{
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    marginBottom: 10
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 200
  },
  currentWeather:{
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  forecastContainer: {
    alignItems: 'center'
  },
  description:{
    marginBottom: 5,
    fontStyle: 'normal',
  },
  temp:{
    marginBottom: 5,
    color: 'red'
  },
  humidity:{
    marginBottom: 5,
    color: '#57aacf'
  }

});


