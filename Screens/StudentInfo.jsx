import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  
} from "react-native";
import { getDatabase, ref, child, get, update } from "firebase/database";

import { SafeAreaView } from "react-native-safe-area-context";

export default StudentInfo = ({ route, navigation }) => {
  const { student } = route.params;



  const [count, setCount] = useState(student.total_attendance);
  const [attendance, setAttendance] = useState(student.total_attendance);

  const increment = () => {
    if (count < 32) {
      setCount(count + 1);
      setAttendance(count + 1);
    } else {
      Alert.alert(
        "Waning",
        "You have reached the maximum number of attentance"
      );
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setAttendance(count - 1);
    } else {
      Alert.alert(
        "Waning",
        "You have reached the minimum number of attentance"
      );
    }
  };
  
  const saveAttendanceToDatabase = () => {
    const db = getDatabase();
    const dbRef = ref(db, "/Students");

    get(child(dbRef, '/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const students = snapshot.val();
          const studentKey = Object.keys(students).find(
            key => students[key].name === student.name
          );

          if (studentKey) {
            const studentRef = ref(db, `Students/${studentKey}`);
            update(studentRef, { total_attendance: attendance })
              .then(() => {
                Alert.alert("Success", "Attendance updated successfully");
                navigation.navigate('Dashboard');
              })
              .catch((error) => {
                Alert.alert("Failed", `Error updating attendance: ${error}`);
              });
          } else {
            Alert.alert("Error", "Student not found in the database");
          }
        } else {
          Alert.alert("Error", "No students found in the database");
        }
      })
      .catch((error) => {
        Alert.alert("Failed", `Error fetching students: ${error}`);
      });
  };


  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {/* Profile header  */}
      <View style={styles.profile}>
        <Text style={styles.profileText}>Profile</Text>
      </View>

      {/* Profile image and student name */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("../assets/studentAvatar.jpg")}
          style={styles.profileImage}
        />
        <Text>{student.name}</Text>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.leftDetail}>
          <Text style={styles.leftText}>Dicipline</Text>
          <Text style={styles.leftText}>Semester</Text>
          <Text style={styles.leftText}>Position</Text>
          <Text style={styles.leftText}>Current CGPA</Text>
          <Text style={styles.leftText}>Starting year</Text>
        </View>
        <View style={styles.rightDetail}>
          <Text style={styles.rightText}>{student.discipline}</Text>
          <Text style={styles.rightText}>{student.semester}</Text>
          <Text style={styles.rightText}>{student.position}</Text>
          <Text style={styles.rightText}>{student["current GPA"]}</Text>
          <Text style={styles.rightText}>{student.starting_year}</Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        {/* <Counter student={student} onAttendanceChange={handleAttendanceChange} /> */}
        <View style={styles.AttendanceContainer}>
          <Button title="-" onPress={decrement} color="#1E3F66" />
          <Text style={styles.counterText}>{count}</Text>
          <Button title="+" onPress={increment} color="#1E3F66" />
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 50,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={saveAttendanceToDatabase}
        >
          <Text style={styles.buttonText}>Saved</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  profile: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "black",
    resizeMode: "contain"
  },
  detailSection: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 80,
    marginBottom: 20,
  },
  leftDetail: {
    width: 180,
    height: 300,
    backgroundColor: "rgba(30, 63, 102, 0.4)",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 8,
  },
  leftText: {
    fontWeight: "500",
    color: "black",
  },
  rightText: {
    fontWeight: "400",
    color: "black",
  },
  rightDetail: {
    width: 180,
    height: 300,
    backgroundColor: "rgba(188, 210, 232, 0.3)",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 8,
  },
  button: {
    width: "90%",
    backgroundColor: "#1E3F66",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ffffff",
  },
  AttendanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    gap: 25,
  },
  counterText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
