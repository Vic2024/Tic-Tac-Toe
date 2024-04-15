import H1 from "../Components/h1"
import ContainerInputs from "../Layout/Form/ContainerInputs"
import Input from "../Components/Form/Input"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Indicators from "../Components/LinkIndicators"
import Indication from "../Components/Indication"
import { useAuth } from "../Context/AuthContext"
import { useTranslation } from "react-i18next"
import { useSearchGame } from "../Context/SearchGameContext"
import '../table.css'
export default function SearchGame() {
    const { t } = useTranslation(["data"])
    const [isPath, setIsPath] = useState(window.location.pathname.split('/')[5])
    const { auth } = useAuth()
    const handleIsPath = (path) => setIsPath(path.split('/')[5])
    const { setSearchValue } = useSearchGame()
    const handleChange = (e) => setSearchValue(e.target.value)
    return (
        <section className='p-2 flex flex-col  h-full gap-2'>
            <div className="text-center"><H1>{t("searchGame.h1")}</H1></div>
            <div className="p-2 self-center">
                <ContainerInputs>
                    <Input onChange={handleChange} helpMessage={t("searchGame.input.helpMessageSearchGame")} width='w-full' label={t("searchGame.input.labelSearchGame")} name='searchGame' type='text' />
                </ContainerInputs>
            </div>
            <div className="self-center flex gap-2 p-2">
                <Indicators
                    isPath={isPath === 'usersOnline' ? true : false}
                    handleIsPath={handleIsPath}
                    path={`/online/dashboard/${auth.id}/searchgame/usersOnline`}
                >
                    <Indication color='bg-green-back' />
                    Online
                </Indicators>
                <Indicators
                    isPath={isPath === 'usersOffline' ? true : false}
                    handleIsPath={handleIsPath}
                    path={`/online/dashboard/${auth.id}/searchgame/usersOffline`}
                >
                    <Indication color='bg-red-error' />
                    Offline
                </Indicators>
            </div>
            <Outlet />
        </section >
    )
}