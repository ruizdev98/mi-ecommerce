import axios from "axios"

const api = axios.create({
  baseURL: "https://ecommerce-api-he4w.onrender.com/api",
})

export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

// 🧠 RESTAURAR TOKEN AL REFRESCAR
const token = localStorage.getItem("token")
if (token) {
  setAuthToken(token)
}

export default api