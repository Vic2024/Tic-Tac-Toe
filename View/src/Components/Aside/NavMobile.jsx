/* eslint-disable react/prop-types */
import Nav from "./Nav"
import Logo from '/Logo_letra_blanco.png'
import LogoDark from '/Logo_letra_negro.png'
import { useTheme } from "../../Context/SettingsContext"
import { useTranslation } from "react-i18next"
import LogOut from "../../Icons/LogOut"
import Button from "../Button"
export default function NavMobile({ handleMenu, logout }) {
    const { t } = useTranslation(["data"])
    const { theme } = useTheme()
    const handleCLick = () => handleMenu()
    const handleLogOut = () => logout()
    return (
        <div onClick={handleCLick} className="animate-fade animate-duration-500 fixed w-screen border-red h-[100vh] top-0 left-0 bg-modal">
            <div className="animate-fade-right animate-duration-500 rounded-r-md p-2 flex flex-col h-[100vh] w-[50vw] bg-primary dark:bg-secondary ">
                <img className="p-2 object-cover w-max" src={theme === 'dark' ? Logo : LogoDark} alt='Logo en letras' />
                <Nav />
                <Button onClick={handleLogOut} ><LogOut /> {t("dashBoard.aside.logout")}</Button>
            </div>
        </div>
    )
}