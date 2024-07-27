import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import LottieView from "lottie-react-native";
import auth from '../firebase/firebaseConfig'; // Adjust the path as necessary
import { createUserWithEmailAndPassword,  updateProfile, signInWithEmailAndPassword } from "@firebase/auth";
import { saveUserDataToStorage } from "../aysnStorage";
import {CommonActions} from '@react-navigation/native';



const { width, height } = Dimensions.get("window");
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const name = 'Idrees'

  // function for registration 
  // const registerUser =  () => {
  //   if (
  //     !email ||
  //     !password 
  //   ) {
  //     Alert.alert('Required Field', 'Please fill in all required fields.');
  //     return;
  //   }
  //   setIsLoading(true);

  //   createUserWithEmailAndPassword(auth, email.trim(), password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       return updateProfile(user, { displayName: name });
  //     })
  //     .then(() => {
  //       // User profile updated successfully
  //       const user = auth.currentUser;
  //       const userData = {
  //         uid: user.uid,
  //         name: name,
  //         email: user.email,
  //       };
  //       saveUserDataToStorage("userData", userData);

  //       setEmail("");
  //       // setName("");
  //       setPassword("");
  //       Alert.alert("Success", "User created successfully!");

  //       // navigation.navigate("Login");
  //     })
  //     .catch((error) => {
  //       Alert.alert("Authentication error:", error.message);
  //       // Handle the error, show an alert, etc.
  //     })
  //     .finally(() => {
  //       // This block will be executed regardless of success or error
  //       setIsLoading(false);
  //     });
  // };

  const handleAuthentication = async () => {
    try {
      setIsLoading(true);
      if (!email.trim() || !email.includes('@')) {
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
      }
      // Sign in
      await signInWithEmailAndPassword(auth, email.trim(), password);

      // Retrieve the current user
      const user = auth.currentUser;

      // Check if the user has a display name
      if (user.displayName) {
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        };

        await saveUserDataToStorage('userData', userData);
        Alert.alert('Success', 'Sign in Successfully!');
      

        // Navigate to the "Home" screen with the user's name
        navigation.navigate('Dashboard');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          })
        );

      
      } else {
        console.error('User does not have a display name');
      }
    } catch (error) {
      const errorCodeMatch = error.message.match(/\(([^)]+)\)/);
      const errorCode = errorCodeMatch ? errorCodeMatch[1] : null;
      Alert.alert('Error', errorCode);
    } finally {
      setIsLoading(false);
    }
  };

  


  return (
    <SafeAreaView style={{flex:1}}>
      <StatusBar style='light' backgroundColor='#1E3F66' />
      <View style={styles.container}>
        <LottieView
          source={require("../assets/json/login.json")}
          autoPlay
          loop
          style={styles.image}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPass} onPress={()=> navigation.navigate("Forgot")}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleAuthentication}>
          <Text style={styles.buttonText}>{isLoading? (<ActivityIndicator />): "Login"}</Text>
        </TouchableOpacity>
      </View>
  
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "80%",
    backgroundColor: "#dddddd",
    borderRadius: 30,
    padding: 12,
    marginBottom: 10,
    fontSize: 12,
    paddingHorizontal: 30,
  },
  button: {
    width: "80%",
    backgroundColor: "#1E3F66",
    borderRadius: 30,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "#ffffff",
  },
  forgotPass: {
    color: "#1E3F66",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 30,
  },
});
