import { Text, View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Card } from '@rneui/themed';
import { styles } from '@/styles/styles'

export default function AboutScreen() {
  return (
    <>
    
    <View style={styles.container}> 
      <LinearGradient       colors={['#0c93cf', '#afd7e8','#f4d41f','#fe9555']}
        style={styles.container}>
          <Card containerStyle={{width: '80%', borderRadius: 5}}>
              <Text style={styles.text}>Hello! Welcome to my weather app v1.0! This is my first mobile app. It is still in its early stages but I plan to add more features in the future!</Text>
          </Card>
      </LinearGradient>
    </View>

    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#25292e',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     color: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
