import axios from 'axios'

export const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`
        localStorage.setItem('token', token)
    } else {
        delete axios.defaults.headers.common['authorization']
        localStorage.removeItem('token')
    }
}