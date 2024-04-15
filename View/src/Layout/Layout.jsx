import Footer from "../Components/Footer.jsx"
import Header from "../Components/Header.jsx"
import Main from "../Components/Main.jsx"
import { Outlet } from "react-router-dom"
import { Link } from "react-router-dom"
import LanguageSelector from "../Components/LanguageSelector/LanguageSelector.jsx"
import ThemeSelector from "../Components/ThemeSelector.jsx"
import Logo from '/Logo_letra_blanco.png'
import LogoDark from '/Logo_letra_negro.png'
import { useTheme } from "../Context/SettingsContext.jsx"
// eslint-disable-next-line react/prop-types
export default function Layout() {
    const {theme} = useTheme()
    return (
        <div className="layout bg-primary dark:bg-secondary">
            <Header>
                <Link to={'/'} className='p-2 rounded-md flex items-center justify-start'>
                    <img className="phone:h-max phone:w-2/3" src={theme === 'dark' ? Logo : LogoDark} alt='Logo en letras' />
                </Link>
                <ul className='flex justify-between gap-3 p-2 items-center '>
                    <ThemeSelector />
                    <LanguageSelector />
                </ul>
            </Header>
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </div>
    )
}