import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    myBackground:{
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gradient: {
      flex: 1,
      height: 570,
      width: 500,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
      color: 'black',
    },
    button:{
      fontSize: 20,
      textDecorationLine: 'underline',
      color: '#fff',
      marginBottom: 10,
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
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  
  });
  