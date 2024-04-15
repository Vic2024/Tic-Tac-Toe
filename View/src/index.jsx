import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './IndexRoute.jsx';
import './index.css'
import { SettingsProvider } from './Context/SettingsContext.jsx';
import './config/i18next.config.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  </React.StrictMode>,
)
/* export default function Main() {z
  return (
    <h1>Holaaaa mundo</h1>
  )
} */

/* export const App = React.createElement(() => {
  return (
    <React.StrictMode>
      <SettingsProvider>
        <RouterProvider router={router} />
      </SettingsProvider>
    </React.StrictMode>
  )
}) */