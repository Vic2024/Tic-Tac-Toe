/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React from "react";
const AuthContext = React.createContext()

export const useAuth = () => {
    const { auth, setAuth } = React.useContext(AuthContext)
    return { auth, setAuth }
}
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = React.useState(() => {
        const user = window.localStorage.getItem('LoggedUser')
        return user ? JSON.parse(user) : null
    })
    return <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
    </AuthContext.Provider>
}