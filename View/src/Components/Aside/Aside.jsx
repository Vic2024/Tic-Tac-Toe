import Button from "../Button"
import Logo from '/Logo_letra_blanco.png'
import LogoNegro from '/Logo_letra_negro.png'
import LogOut from "../../Icons/LogOut"
import { useState, useCallback, useEffect } from "react"
import { useAuth } from "../../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useTheme } from '../../Context/SettingsContext'
import { useTranslation } from "react-i18next"
import LanguageSelector from "../LanguageSelector/LanguageSelector"
import ThemeSelector from "../ThemeSelector"
import Menu from "../../Icons/Menu"
import Nav from "./Nav"
import { createPortal } from "react-dom"
import NavMobile from "./NavMobile"
import useResponsive from "../../Hooks/useResponsive"

export default function Aside() {
    const { isResponsive } = useResponsive()
    const { t } = useTranslation(["data"])
    const [aside, setAside] = useState(false)
    const handleMenu = () => setAside(!aside)
    const { theme } = useTheme()
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const logout = useCallback(() => {
        setAuth(null)
        window.localStorage.removeItem('LoggedUser')
        navigate('/')
    }, [setAuth, navigate])

    useEffect(() => {
        if (isResponsive !== true) setAside(false)
    }, [isResponsive])

    return (

        <aside className='[grid-area:aside] flex flex-col layout:flex-row layout:justify-between layout:items-center gap-1 p-2 rounded-md border-2 layout:border-none bg-primary text-secondary dark:bg-secondary dark:text-primary'>
            <div className="p-1">
                <img className="object-contain layout:hidden" src={theme === 'dark' ? Logo : LogoNegro} alt="Logo en Negro" />
                <button onClick={handleMenu} className="hidden layout:flex w-10 h-10 justify-center items-center bg-secondary text-primary dark:bg-primary dark:text-secondary  rounded-md">
                    <Menu />
                </button>
            </div>
            <ul className="relative p-2 flex flex-row layout:flex-row-reverse gap-2 items-center justify-evenly">
                <LanguageSelector />
                <ThemeSelector />
            </ul>
            <Nav hidden='layout:hidden' />
            {aside !== false ? createPortal(<NavMobile handleMenu={handleMenu} logout={logout} />, document.body) : null}
            <Button hidden='layout:hidden' onClick={logout} ><LogOut /> {t("dashBoard.aside.logout")}</Button>
        </aside>


    )
}