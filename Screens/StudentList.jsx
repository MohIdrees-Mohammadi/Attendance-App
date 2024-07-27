import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentList = ({ navigation, route }) => {
  const { classStudents, classId, studentID, myClassName } = route.params;

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleStudentDetail(item)}>
      <Text style={styles.studentName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Function to handle navigation to student detail screen
  const handleStudentDetail = (student) => {
    navigation.navigate("info", { student });
  };

  // Function to extract a unique key for each item in the FlatList
  const keyExtractor = (item, index) => {
    // Use the index as the key if item.id is undefined
    if (!item.id) {
      return index.toString();
    }
    // Otherwise, use item.id if available
    return item.id.toString();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.contentHeader}>
            <MaterialCommunityIcons
              name="google-classroom"
              size={17}
              color="white"
            />
            <Text style={styles.headerText}>{myClassName}</Text>
          </View>

          <View style={styles.contentHeader}>
            <Fontisto name="person" size={21} color="white" />
            <Text style={styles.headerText}>Mr. Adnan Amin </Text>
          </View>

          <View style={{ flexDirection: "row-reverse" }}>
            <Text style={{ fontWeight: "600", paddingHorizontal: 10, color: "#FBFCF8", }}>
              Total Strength: {classStudents.length}
            </Text>
          </View>
        </View>

        {/* Student list */}
        {classStudents.length > 0 ? (
          <FlatList
            data={classStudents}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <AntDesign
              name="exclamationcircle"
              size={50}
              color="rgba(46, 89, 132, 0.6)"
              style={{ margin: 35 }}
            />
            <Text
              style={{ textAlign: "center", color: "rgba(46, 89, 132, 0.6)" }}
            >
              No Students Found
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    marginBottom: 20,
    backgroundColor: "#1E3F66",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000", // shadow color
    shadowOffset: { width: 2, height: 2 }, // shadow offset
    shadowOpacity: 0.8, // shadow opacity
    shadowRadius: 2, // shadow radius
    elevation: 5, // elevation for Android
  },
  headerText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FBFCF8",
  },
  studentName: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "rgba(188, 210, 232, 0.3)",
    padding: 10,
    borderRadius: 10,
    fontWeight: "500",
 
  },
  contentHeader: {
    flexDirection: "row",
    gap: 20,

    alignItems: "center",

    padding: 10,
  },
  image: {
    height: "80%",
    width: "100%",

    marginBottom: 30,
  },
});

export default StudentList;
