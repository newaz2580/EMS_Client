import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../Component/firebase/firebase.config";

const AuthProvider = ({ children }) => {
    const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true)
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

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });
  return () => unsubscribe();
}, []);
  const info = {
    createUserSignupAccount,
    signInUser,
    user,
    loading,
    userLogout,
    userSignUpWithGoogle
  };
  console.log(user);
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
