// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
  user: any;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);

  // Login com Google
  const loginWithGoogle = async () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: "YOUR_GOOGLE_CLIENT_ID",
    });

    if (response?.type === "success") {
      const credential = GoogleAuthProvider.credential(
        response.params.id_token
      );
      await signInWithPopup(auth, credential).then((result) => {
        setUser(result.user);
        AsyncStorage.setItem("user", JSON.stringify(result.user));
      });
    } else {
      promptAsync();
    }
  };

  // Login com Email e Senha
  const loginWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      await AsyncStorage.setItem("user", JSON.stringify(result.user));
    } catch (error) {
      console.error("Login falhou: ", error);
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, loginWithGoogle, loginWithEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
