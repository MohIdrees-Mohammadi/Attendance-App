import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get("window")

export default function Welcome({navigation}) {
  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar style='light' backgroundColor='#1E3F66' />
    <View style={styles.container}>
      <Text style={styles.title}>Attendance App</Text>
      <LottieView source={require('../assets/json/welcome.json')} autoPlay loop  style={styles.image} />
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1E3F66',
   

  },
  title: {
    fontSize: height*0.033,
    fontWeight: 'bold',
    marginBottom: height*0.003,
    color: '#ffffff',
  },
  image: {
    width: width*0.8,
    height: height*0.4,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: 'rgba(46, 89, 132, 0.9)',
    paddingVertical: height*0.01,
    paddingHorizontal: height*0.03,
    borderRadius: height*0.01,
  },
  buttonText: {
    fontSize: height*0.023,
    color: '#ffffff',
  },
});
