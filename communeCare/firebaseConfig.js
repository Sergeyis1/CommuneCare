import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDjpaGjVPhkTe-EYaT9cGPtUg_q5VfTnYU",
    authDomain: "communecare121.firebaseapp.com",
    projectId: "communecare121",
    storageBucket: "communecare121.appspot.com",
    messagingSenderId: "476585888476",
    appId: "1:476585888476:Android:3e5c9f7b73b5ffd1908219"
  };
  
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
  // Initialize Firebase Auth with AsyncStorage
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export { app, firestore, auth };
