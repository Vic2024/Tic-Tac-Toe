import { AuthProvider } from "../Context/AuthContext"
import ProtectedRoute from "./ProtectedRoute"
import ConnectionProvider from "../Context/ConnectionContext"
import { Outlet } from "react-router-dom"
import { createPortal } from "react-dom"
import Notification from "../Components/Notification"
// eslint-disable-next-line react/prop-types
export default function Permissions() {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <ConnectionProvider>
                    <Outlet />
                    {createPortal(<Notification />, document.body)}
                </ConnectionProvider>
            </ProtectedRoute>
        </AuthProvider>
    )
}