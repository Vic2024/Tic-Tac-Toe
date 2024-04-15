/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
export default function ProtectedRoute({children}) {
    const { auth } = useAuth()
    if (!auth) {
        return <Navigate to='/login' replace />
    }

    return children
}