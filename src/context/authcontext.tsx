import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

interface UserData {
  uid: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userdata: UserData | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userdata: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userdata, setUserdata] = useState<UserData | null>(null);

  const fetchUserData = async (user: User) => {
    console.log("Fetching user data for uid:", user.uid);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      console.log("User data found:", docSnap.data());
      setUserdata(docSnap.data() as UserData);
    } else {
      console.log("No user data found for uid:", user.uid);
      setUserdata(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser);
    } else {
      setUserdata(null);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, userdata }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
