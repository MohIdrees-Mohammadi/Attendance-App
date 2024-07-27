import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-v5NlI8d0U7fWPhuSfO-iwHzJbhZ9680",
  authDomain: "viseion-based-attendence-sys.firebaseapp.com",
  databaseURL: "https://viseion-based-attendence-sys-default-rtdb.firebaseio.com",
  projectId: "viseion-based-attendence-sys",
  storageBucket: "viseion-based-attendence-sys.appspot.com",
  messagingSenderId: "481530340476",
  appId: "1:481530340476:web:786becdbae008a444355f9",
  measurementId: "G-PNTFL021BZ"
  };

// Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // Access the auth instance
// export const auth = getAuth(firebaseApp);

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
export default auth;