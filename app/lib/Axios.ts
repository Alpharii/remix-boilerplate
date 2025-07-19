import axios from "axios"

let authToken: string | null = null

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10_000,
  withCredentials: true,
})

Axios.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Global function to set the API token
export function setApiToken(token: string) {
  authToken = token
}