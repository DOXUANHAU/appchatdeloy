// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsivoAHNdSG-kPq69vb_EDyJ8lnmIq1Ec",
  authDomain: "chatappsocket-83a71.firebaseapp.com",
  projectId: "chatappsocket-83a71",
  storageBucket: "chatappsocket-83a71.appspot.com",
  messagingSenderId: "115098821298",
  appId: "1:115098821298:web:c8dec5f3bedc85bb329fab",
  measurementId: "G-J2K2TRDS8X",
};

// Initialize Firebase
const admin = initializeApp(firebaseConfig);
const storage = getStorage();
// const analytics = getAnalytics(app);

function useFirebase() {
  return storage;
}

export default useFirebase;
