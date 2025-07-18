import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth } from "../Component/firebase/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)
  const [darkMode,setDarkMode]=useState(
    localStorage.getItem('theme')==="dark"
  )
  const createUserSignupAccount = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(false)
    return signInWithEmailAndPassword(auth, email, password);
  };
 const userSignUpWithGoogle=()=>{
 return signInWithPopup(auth, provider)
 }
  const userLogout=()=>{
    return signOut(auth)
  }

  const updateUserProfile=(name,photo)=>{
    return updateProfile(auth.currentUser,{
        displayName:name,
        photoURL:photo
    })
  }

  useEffect(() => {
    if(darkMode){
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme','dark')
    }
    else{
         document.documentElement.classList.remove('dark')
         localStorage.setItem('theme','light')
  
    }
  const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
    setUser(currentUser);
      if (currentUser?.email) {
        setUser(currentUser)

        // Get JWT token
        await axios.post(
          `${import.meta.env.VITE_API_KEY}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
      } else {
        setUser(currentUser)
        await axios.get(`${import.meta.env.VITE_API_KEY}/logout`, {
          withCredentials: true,
        })
      }
    setLoading(false);
  });
  return () => unsubscribe();
}, [darkMode]);
  const info = {
    createUserSignupAccount,
    signInUser,
    user,
    loading,
    userLogout,
    userSignUpWithGoogle,
    updateUserProfile,
    darkMode,
    setDarkMode
  };
  
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
