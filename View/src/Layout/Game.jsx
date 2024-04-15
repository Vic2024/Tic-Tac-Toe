import Header from "../Components/Header"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer"
import Main from "../Components/Main"
import { Link } from "react-router-dom"
import DashBoard from "../Icons/Dashboard"
import { useAuth } from "../Context/AuthContext"
import { useTranslation } from "react-i18next"
import ThemeSelector from "../Components/ThemeSelector"
import LanguageSelector from "../Components/LanguageSelector/LanguageSelector"
export default function Game() {
    const { t } = useTranslation(["data"])
    const { auth } = useAuth()
    return (
        <section className='layout bg-primary dark:bg-secondary'>
            <Header>
            <ul className='flex justify-between gap-3 p-2 items-center '>
                    <ThemeSelector />
                    <LanguageSelector />
                </ul>
                <Link to={`/online/dashboard/${auth.id}/game_log`} className='flex gap-2 border-2 p-2 rounded-md bg-secondary hover:bg-primary text-primary hover:text-secondary dark:bg-primary dark:hover:bg-secondary dark:text-secondary dark:hover:text-primary transition-all text-center font-bold'>
                    {t("game.buttonReturnDashboard")}
                    <DashBoard />
                </Link>
            </Header>
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </section>
    )
}

