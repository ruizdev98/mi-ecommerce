/* src/core/hooks/useAuth.js */
import { useState, useEffect } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth, db } from '@/core/firebase/firebaseConfig'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import api from "@/core/api/api"


export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Nuevos estados de carga específicos
  const [loginLoading, setLoginLoading] = useState(false)
  const [facebookLoading, setFacebookLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  const syncUserWithBackend = async (firebaseUser) => {
    if (!firebaseUser) return

    try {
      await api.post("/auth/sync")
    } catch (error) {
      console.error("Error syncing user with backend:", error)
    }
  }

  // Detectar cambios de sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true)

      if (currentUser) {
        await syncUserWithBackend(currentUser)
        setUser(currentUser)
      } else {
        setUser(null)
      }

      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Registrar usuario (con Firestore)
  const register = async (email, password, extraData = {}) => {
    setRegisterLoading(true)
    setError(null)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password)
      const newUser = userCredential.user

      // Guardar datos adicionales en Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        uid: newUser.uid,
        email: email.toLowerCase(),
        name: extraData.name || '',
        lastName: extraData.lastName || '',
        cellphone: extraData.cellphone || '',
        createdAt: serverTimestamp(),
      })

      setUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setRegisterLoading(false)
    }
  }

  // Login con email y contraseña
  const login = async (email, password) => {
    setLoginLoading(true)
    setError(null)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      const loggedUser = userCredential.user

      setUser(loggedUser)
      return loggedUser
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoginLoading(false)
    }
  }

  // Login con Facebook
  const loginWithFacebook = async () => {
    setFacebookLoading(true)
    setError(null)
    try {
      const provider = new FacebookAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const newUser = result.user

      // Guardar/actualizar en Firestore si es primera vez
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email || "",
        name: newUser.displayName || "",
        photoURL: newUser.photoURL || "",
        provider: "facebook",
        createdAt: serverTimestamp(),
      }, { merge: true })

      setUser(newUser)
      return newUser
    } catch (err) {
      console.error("Error loginWithFacebook:", err)
      setError(err.message)
      throw err
    } finally {
      setFacebookLoading(false)
    }
  };

  // Login con Google
  const loginWithGoogle = async () => {
    setGoogleLoading(true)
    setError(null)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const newUser = result.user

      // Guardar/actualizar en Firestore
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email || "",
        name: newUser.displayName || "",
        photoURL: newUser.photoURL || "",
        provider: "google",
        createdAt: serverTimestamp(),
      }, { merge: true });

      setUser(newUser)
      return newUser
    } catch (err) {
      console.error("Error loginWithGoogle:", err)
      setError(err.message)
      throw err;
    } finally {
      setGoogleLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth)
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      setUser(null)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    user, 
    loading, 
    error, 
    register, 
    login, 
    loginWithFacebook,
    loginWithGoogle,
    logout,
    loginLoading,
    facebookLoading,
    googleLoading,
    registerLoading
  }
}