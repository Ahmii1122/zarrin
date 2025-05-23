import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { useState, useEffect } from "react";

interface userparamstype {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface signInParams {
  email: string;
  password: string;
}

export const docreateUserWithEmailAndPassword = async ({
  firstName,
  lastName,
  email,
  password,
}: userparamstype) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("result", result);
    const docRef = await addDoc(collection(db, "users"), {
      uid: result.user.uid,
      email: email,
      firstName: firstName,
      lastName: lastName,
      role: "reader",
      createdAt: new Date(),
    });
    return result.user.uid;
    console.log("docRef", docRef);
    return result;
  } catch (error) {
    console.log(error);
    console.log("error in creating user");
  }
};

export const dosigninwithgoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const dosigninwithemailandpassword = async ({
  email,
  password,
}: signInParams) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const dologout = async () => {
  return await signOut(auth);
};

export const useAuth = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { user };
};
