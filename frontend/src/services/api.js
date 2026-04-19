import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const startSession = (name, role, email) => api.post('/api/session/start', { name, role, email })
export const sendMessage = (candidateId, text) => api.post('/api/session/message', { candidateId, text })
export const endSession = (candidateId) => api.post('/api/session/end', { candidateId })