import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export interface AuthContextType {
  signInWithGoogle: () => Promise<void>;
  registerUserWithEmailAndPassword: (
    email: string,
    password: string,
    name: string
  ) => Promise<void>;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  user: any;
  userData: any;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isExistEmail: boolean
}
// interface initialeStateType {
//   signInWithGoogle: () => void
// }

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const AppContext = ({ children }: { children: React.ReactNode }) => {
  const provider = new GoogleAuthProvider();
  const collectionRef = collection(db, "users");
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isExistEmail, setIsExistEmail] = useState(false);

  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const q = query(collectionRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collectionRef, {
          uid: user?.uid,
          name: user?.displayName,
          authProvider: user?.providerId,
          email: user?.email,
          image: user?.photoURL,
        });
      }
      // setUser(user)
    } catch (err: string | any) {
      console.log(err.message);
    }
  };

  const registerUserWithEmailAndPassword = async (
    email: string,
    password: string,
    name: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      addDoc(collectionRef, {
        uid: user?.uid,
        name: name,
        providerId: "email/password",
        email: email,
      });
      setIsExistEmail(false)
    } catch (err: any | string) {
      console.log(err.message);
      setIsExistEmail(true)
    }
  };

  const resetPassword =async(email: string)=>{
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (err: string |any) {
       console.log(err.message)   
    }
  }


  const signOutUser = async()=>{
    try {
       await signOut(auth)
    } catch (err: string |any) {
      console.log(err.message)
    }
  }
  
  const userStatechanged = async() => {
    onAuthStateChanged(auth, async(user: string | any)=>{
        if (user) {
          const q = query(collectionRef, where("uid", "==", user.uid));
          await onSnapshot(q, (doc)=>{
            setUserData(doc?.docs[0]?.data())
          })
          setUser(user)
        } else {
          setUser(null)
          setUserData(null)
          navigate("/auth")
        }
    })
  }

useEffect(()=>{
    userStatechanged()
    if(user || userData){
      navigate("/")
    }else{
      navigate("/auth")
    }
  },[])

  const loginWithEmailPassword = async(email: string, password: string)=>{
    try{
      await signInWithEmailAndPassword(auth, email, password)
    }catch(err: string | any){
      console.log(err.message)
    }
  }


  return (
    <AuthContext.Provider
      value={{signInWithGoogle, registerUserWithEmailAndPassword, loginWithEmailPassword, resetPassword, signOutUser, user, userData, loading, setLoading, isExistEmail}}
    >
      {children}, 
    </AuthContext.Provider>
  );
};

export default AppContext;
