/* src/core/hooks/useAuth.js */
import { useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider
} from 'firebase/auth'
import { auth, db } from '@/core/firebase/firebaseConfig'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // estado global para verificar sesión
  const [error, setError] = useState(null);

  // Nuevos estados de carga específicos
  const [loginLoading, setLoginLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  // Detectar cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("onAuthStateChanged =>", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Registrar usuario (con Firestore)
  const register = async (email, password, extraData = {}) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: email.toLowerCase(),
        name: extraData.name || "",
        lastName: extraData.lastName || "",
        cellphone: extraData.cellphone || "",
        createdAt: serverTimestamp(),
      });

      setUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // Login con email y contraseña
  const login = async (email, password) => {
    setLoginLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
      setUser(userCredential.user);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoginLoading(false);
    }
  }

  // Login con Facebook
  const loginWithFacebook = async () => {
    setFacebookLoading(true);
    setError(null);
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const newUser = result.user;

      // Guardar/actualizar en Firestore si es primera vez
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email || "",
        name: newUser.displayName || "",
        photoURL: newUser.photoURL || "",
        provider: "facebook",
        createdAt: serverTimestamp(),
      }, { merge: true });

      setUser(newUser);
      return newUser;
    } catch (err) {
      console.error("Error loginWithFacebook:", err);
      setError(err.message);
      throw err;
    } finally {
      setFacebookLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    user, 
    loading, 
    error, 
    register, 
    login, 
    loginWithFacebook, 
    logout,
    // nuevos estados
    loginLoading,
    facebookLoading,
    registerLoading
  }
}