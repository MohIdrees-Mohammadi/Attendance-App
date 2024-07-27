import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function ClassDetailScreen({ route }) {
  const { classId } = route.params;

  // Dummy data for student
  const students = [
    { id: 1, name: 'John Doe', photo: require('./path/to/john.jpg'), records: ['Record 1', 'Record 2', 'Record 3'] },
    { id: 2, name: 'Jane Doe', photo: require('./path/to/jane.jpg'), records: ['Record 4', 'Record 5', 'Record 6'] },
  ];

  // Find the class by id
  const selectedClass = classes.find((cls) => cls.id === classId);

  return (
    <View style={styles.container}>
      <Text style={styles.className}>{selectedClass.name}</Text>
      <Text style={styles.classTime}>{selectedClass.startTime} - {selectedClass.endTime}</Text>
      <Text style={styles.remainingDays}>{selectedClass.remainingDays} days left</Text>

      <Text style={styles.sectionTitle}>Students</Text>
      {students.map((student) => (
        <View key={student.id} style={styles.studentContainer}>
          <Image source={student.photo} style={styles.studentPhoto} />
          <Text style={styles.studentName}>{student.name}</Text>
          <Text>{student.records.join(', ')}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  classTime: {
    fontSize: 18,
    marginBottom: 10,
  },
  remainingDays: {
    fontSize: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
