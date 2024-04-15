import LogoEnBlanco from '/Logo_tic-tac-toe_blanco.png'
import LogoEnNegro from '/Logo_tic-tac-toe_negro.png'
import Computer from '../Icons/Computer.jsx'
import Online from '../Icons/Online.jsx'
import H1 from '../Components/h1.jsx'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../Context/SettingsContext.jsx'
import { useTranslation } from 'react-i18next'
export default function Index() {
    const { t } = useTranslation(["data"])
    const { theme } = useTheme()
    const navigate = useNavigate()
    const [isLogged] = useState(() => {
        const user = window.localStorage.getItem('LoggedUser')
        return user ? JSON.parse(user) : null
    })
    const handleLogin = async () => {
        if (isLogged) {
            try {
                const result = await fetch('/api/refresh-token', { method: 'POST', headers: { refresh: isLogged.refreshToken } })
                if (result.status === 200) {
                    const res = await result.json()
                    const newData = { ...isLogged, token: res.data }
                    window.localStorage.setItem('LoggedUser', JSON.stringify(newData))
                    navigate(`online/dashboard/${isLogged.id}/searchgame/usersOnline`)
                } else {
                    navigate('/login')
                }
            } catch (err) {
                throw new Error(err)
            }
        } else navigate('/login')

    }
    return (
        <section className='p-2 flex gap-2 h-full flex-row layout:flex-col justify-evenly items-center'>
            <img className='object-fit w-max h-max layout:hidden' src={theme === 'dark' ? LogoEnBlanco : LogoEnNegro} alt="Logo Tic Tac Toe en blanco" />
            <div className='p-2 flex w-1/2 layout:w-full gap-2 flex-col justify-center items-center'>
                <H1>{t('index.title')}</H1>
                <div className='flex p-2 gap-2'>
                    <Link to='/local-game' className='flex phone:text-sm justify-center items-center text-xl gap-2 border-2 p-2 rounded-md text-secondary dark:text-primary font-bold hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary transition-all'>
                        <Computer />
                        Local
                    </Link>
                    <button onClick={handleLogin} className='flex phone:text-sm justify-center items-center text-xl gap-2 border-2 p-2 rounded-md text-secondary dark:text-primary font-bold hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary transition-all'>
                        <Online />
                        Online
                    </button>
                </div>
            </div>
        </section>
    )
}