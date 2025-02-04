import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_GYM_BRO_API,
})
