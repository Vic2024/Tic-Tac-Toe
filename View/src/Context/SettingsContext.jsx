/* eslint-disable react/prop-types */
import React from "react";
const SettingsContext = React.createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const { theme, setTheme } = React.useContext(SettingsContext)
    return { theme, setTheme }
}
export const SettingsProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(() => {
        const savedTheme = window.localStorage.getItem('savedTheme')
        if (savedTheme) return savedTheme
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            window.localStorage.setItem('savedTheme','dark')
            return 'dark'
        }
        window.localStorage.setItem('savedTheme','light')
        return 'light'
    })
    React.useEffect(() => {
        if (theme === 'dark') {
            document.querySelector('html').classList.add('dark')
            document.body.style.background = '#242424'
        } else {
            document.querySelector('html').classList.remove('dark')
            document.body.style.background = '#eee'
        }
    }, [theme])
    return <SettingsContext.Provider value={{ theme, setTheme }}>
        {children}
    </SettingsContext.Provider>
}