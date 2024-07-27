import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Welcome from './Screens/Welcome';
import Login from './Screens/Login';
import DashboardScreen from './Screens/Dashboard';
import StudentInfo from './Screens/StudentInfo';
import StudentList from './Screens/StudentList';
import Forgot from './Screens/Forgot';
import { useEffect, useState } from 'react';
import { getDataFromStorage } from './aysnStorage';


const Stack = createNativeStackNavigator();
export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await getDataFromStorage('userData');
        setUserData(storedUserData);
      } finally {
        setLoading(false);
        // console.log(userData)
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    // You can return a loading indicator here if needed
   
    return(
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator />
        <Text>Loading ...</Text>
      </View>

    ) 
   
     
  }

  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}}
     initialRouteName={userData ? 'Dashboard' : 'Welcome'}
     >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="info" component={StudentInfo} />
      <Stack.Screen name="list" component={StudentList} />
      <Stack.Screen name="Forgot" component={Forgot} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
