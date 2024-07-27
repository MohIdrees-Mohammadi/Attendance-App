import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

import { signOut } from "@firebase/auth";
import auth from "../firebase/firebaseConfig";
import { clearDataFromStorage, getDataFromStorage } from "../aysnStorage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue } from "firebase/database";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { classes } from "../constants/classes";

export default function DashboardScreen({ navigation, route }) {
  const [data, setData] = useState(null);
  const [studentID, setStudentID] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  // const { userData } = route.params;

  // Fetching Data from Database
  useEffect(() => {
    // Reference to your Firebase Realtime Database
    const db = getDatabase();
    const dbRef = ref(db, "/Students");

    // Fetch data from Firebase
    onValue(dbRef, (snapshot) => {
      const firebaseData = snapshot.val();
      setData(firebaseData);
    });
  }, []);

  // Function to parse time string into hours and minutes
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":");
    let parsedHours = parseInt(hours);
    if (period === "PM" && parsedHours !== 12) {
      parsedHours += 12;
    }
    return { hours: parsedHours, minutes: parseInt(minutes) };
  };
  // Get current time
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let myArray = [];
  let upCommingClasses = [];
  classes.forEach((cls) => {
    // Parse the start and end time of the class
    const { hours: startHours, minutes: startMinutes } = parseTime(
      cls.startTime
    );
    const classStartTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      startHours,
      startMinutes
    );

    const { hours: endHours, minutes: endMinutes } = parseTime(cls.endTime);
    const classEndTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      endHours,
      endMinutes
    );

    // Compare the current time with the start and end time of the class

    if (currentDate >= classStartTime && currentDate <= classEndTime) {
      console.log(`Class '${cls.name}' is currently in session.`);
      myArray.push(cls.name);
      // addClass(cls.name)
    } else if (currentDate > classEndTime) {
      console.log(`Class '${cls.name}' has already ended.`);
    } else {
      console.log(`Class '${cls.name}' has not started yet.`);
      upCommingClasses.push(cls.name);
    }
  });

  const handleClassPress = (classId) => {
    const selectedClass = classes.find((cls) => cls.id === classId);
    const myClassName = selectedClass.name;

    filterStudentsByClass(myClassName, classId);
  };
  const filterStudentsByClass = (className, classId) => {
    const classStudents = Object.values(data).filter(
      (student) => student.subject === className
    );

    // Extract student IDs and names for navigation
    const studentIDs = classStudents.map((student) => student.name);

    // Navigate to the list screen with the required data
    navigation.navigate("list", {
      classId,
      classStudents,
      studentID: studentIDs,
      myClassName: className,
    });
  };

  // logout function
  const logout = async () => {
    try {
      // Call the signOut function to log the user out
      try {
        await AsyncStorage.clear();
        // console.log('AsyncStorage cleared successfully.');
      } catch (e) {
        // console.error('Error clearing AsyncStorage:', e);
      }

      await clearDataFromStorage("userData");
      await signOut(auth);

      // Manually clear Firebase authentication token
      // await auth.signOut();

      // Clear user data from local storage
      Alert.alert("Success", "Sign out successfully");
      // You can navigate to the login screen or perform any other action after logout
      navigation.navigate("Login");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" backgroundColor="#1E3F66" />
      <View style={styles.Uppercontainer}>
        <View style={styles.profileContainer}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.greeting}>Dashboard</Text>
            <Text style={styles.email}>idrprinx@gmail.com</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity onPress={logout}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Logout</Text>
            </TouchableOpacity>
            <Image
              source={require("../assets/profile.jpeg")}
              style={styles.profilePhoto}
            />
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Calendar onSelectDate={setSelectedDate} selected={selectedDate} /> */}

          <View style={{ marginTop: 15 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {classes.map((cls) => (
                <TouchableOpacity
                  key={cls.id}
                  onPress={() => handleClassPress(cls.id)}
                >
                  <View style={styles.classBox}>
                    <Text style={styles.className}>{cls.name}</Text>
                    <Text style={styles.classTime}>
                      {cls.startTime} - {cls.endTime}
                    </Text>
                    <Text style={styles.remainingDays}>
                      {cls.remainingDays} days left
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Text style={styles.totalClasses}>
              Total Classes _ {classes.length}
            </Text>
          </View>
          {/* current classes */}
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Text style={styles.subTitle}>
              Current Class _ {myArray.length}
            </Text>
            {myArray.length > 0 ? (
              myArray.map((className, index) => (
                <View key={index} style={styles.lclassContainer}>
                  <Text style={styles.lclassName}>{className}</Text>
                </View>
              ))
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AntDesign
                  name="exclamationcircle"
                  size={24}
                  color="#1E3F66"
                  style={{ marginTop: 35 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#1E3F66",
                  }}
                >
                  No class currently ongoing.
                </Text>
              </View>
            )}
          </View>
          {/* upcomming classes */}
          <View style={{ marginTop: 30, marginBottom: 10 }}>
            <Text style={styles.subTitle}>
              Upcomming Classes _ {upCommingClasses.length}
            </Text>
            {/* <View style={styles.classBox}> */}
            {upCommingClasses.length > 0 ? (
              upCommingClasses.map((cls, index) => (
                <View key={index} style={styles.lclassContainer}>
                  <Text style={styles.lclassName}>{cls}</Text>
                </View>
              ))
            ) : (
              // <Text></Text>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <AntDesign
                  name="exclamationcircle"
                  size={24}
                  color="#1E3F66"
                  style={{ marginTop: 35 }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    color: "#1E3F66",
                  }}
                >
                  No upcoming classes for the day.
                </Text>
              </View>
            )}
            {/* </View> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Uppercontainer: {
    flex: 1,
    // backgroundColor: "#FBFCFB",
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#000", // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },
  email: {
    fontSize: 11,
    color: "white",
    textAlign: "right",
  },
  classBox: {
    backgroundColor: "rgb(237, 237, 237)",

    width: 200,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 5,
    borderBottomColor: "#1E3F66",
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 2, height: 2 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 2, // shadow radius
    elevation: 5, // elevation for Android
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  classTime: {
    fontSize: 14,
    marginBottom: 5,
  },
  remainingDays: {
    fontSize: 12,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: "rgba(30, 63, 102, 0.7)",
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 3, // shadow radius
    elevation: 5, // elevation for Android

    // alignSelf: 'center'
  },
  profileContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1E3F66",
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 2 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 2, // shadow radius
    elevation: 5, // elevation for Android
  },
  totalClasses: {
    paddingHorizontal: 12,
    marginBottom: 10,
    fontWeight: "500",
    color: "#1E3F66",
    textAlign: "right",
    marginTop: 10,
  },
  subTitle: {
    paddingHorizontal: 12,
    marginBottom: 10,
    fontWeight: "500",
    color: "#1E3F66",
    // textAlign: 'right'
  },
  ltitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lclassContainer: {
    backgroundColor: "rgb(237, 237, 237)",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderLeftWidth: 5,
    // borderColor: "#ccc",
    marginHorizontal: 10,
    borderLeftColor: "#1E3F66",
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 0, height: 1 }, // shadow offset
    shadowOpacity: 0.4, // shadow opacity
    shadowRadius: 2, // shadow radius
    elevation: 2, // elevation for Android
  },
  lclassName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
