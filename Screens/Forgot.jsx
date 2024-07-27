import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,

  StyleSheet,
  Alert,
  Image,

  Button,
  TouchableOpacity,
} from "react-native";


// import { auth } from "../firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import LottieView from "lottie-react-native";

const Forgot = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    if (!email.trim() || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent");
        Alert.alert("Success", "Password reset email sent");
        setEmail("");
      })
      .catch((error) => {
        let errorMessage =
          "Failed to send password reset email. Please try again.";
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No user found with this email address.";
            break;
          case "auth/invalid-email":
            errorMessage = "Please enter a valid email address.";
            break;
          case "auth/too-many-requests":
            errorMessage =
              "Too many password reset requests have been made for this email. Please try again later.";
            break;
          case "auth/network-request-failed":
            errorMessage =
              "Unable to connect to the network. Please check your internet connection and try again.";
            break;
          default:
            errorMessage =
              "An unexpected error occurred. Please try again later.";
        }
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, zIndex: -10 }}>
        
          <View style={styles.container}>
            <View>
              <LottieView
                source={require("../assets/json/reset.json")}
                autoPlay
                loop
                style={{
                  width: 345,
                  height: 255,
                  resizeMode: "contain",
                  marginBottom: 35,
                }}
              />
            </View>

            <View style={{ width: "100%", marginBottom: 15 }}>
              <TextInput
                style={styles.input}
                placeholder="E-mail Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor='gray'
              />
              <Text style={{ padding: 10, color: '#1E3F66' }}>
                Get a recovery code to change password
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
          </View>
       
      </SafeAreaView>
    </>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 63,
    borderColor: '#1E3F66',
    borderWidth: 1,
    borderRadius: 18,
    padding: 17,
    width: "100%",
  },
  goBackText: {
    marginTop: 20,
    color: "blue",
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
});
