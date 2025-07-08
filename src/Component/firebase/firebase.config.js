// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   // apiKey:import.meta.env.VITE_apiKey,
//   // authDomain:import.meta.env.VITE_authDomain,
//   // projectId:import.meta.env.VITE_projectId,
//   // storageBucket:import.meta.env.VITE_storageBucket,
//   // messagingSenderId:import.meta.env.VITE_messagingSenderId,
//   // appId:import.meta.env.VITE_appId,
//   apiKey: "AIzaSyBvwgjA7FLCqTHeA4i4KTXFaOKyA_YTLQc",
//   authDomain: "employee-management-app-e3a87.firebaseapp.com",
//   projectId: "employee-management-app-e3a87",
//   storageBucket: "employee-management-app-e3a87.firebasestorage.app",
//   messagingSenderId: "454263516563",
//   appId: "1:454263516563:web:495af9b7707413de040c66"
// };
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey, 
  authDomain:import.meta.env.VITE_authDomain, 
  projectId:import.meta.env.VITE_projectId, 
  storageBucket:import.meta.env.VITE_storageBucket, 
  messagingSenderId:import.meta.env.VITE_messagingSenderId, 
  appId:import.meta.env.VITE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);