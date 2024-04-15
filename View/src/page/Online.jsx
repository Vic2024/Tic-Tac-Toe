import { useEffect, useState } from "react"
import { usePlayers } from "../Context/ConnectionContext"
import ListOfPlayers from "../Components/ListOfPlayers"
import PaginationButtons from "../Components/PaginationButtons"
import LayoutTable from "../Layout/LayoutTable"
import Messages from "./Messages"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next"
import { useSearchGame } from "../Context/SearchGameContext"
import FindPlayer from "../Components/FindPlayer"
const title = {
    en: [
        "NAME",
        "LASTNAME",
        "USERNAME",
        "ACTIVITY",
        "ACTION"
    ],
    es: [
        "NOMBRE",
        "APELLIDO",
        "NOMBRE DE USUARIO",
        "ACTIVIDAD",
        "ACCION"
    ]
}
export default function UsersOnline() {
    const { searchValue } = useSearchGame()
    const { t, i18n } = useTranslation(["data"])
    const { players } = usePlayers()
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const endOffset = page + 4
    const currentPlayers = players.slice(page, endOffset)
    const pageCount = Math.ceil(players.length / 4)
    const handlePage = (selected) => {
        const newOffSet = (selected * 4) % players.length
        setPage(newOffSet)
    }
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000)
        return () => clearInterval()
    }, [])

    return (
        <LayoutTable>
            {isLoading === true ? (
                <Loader />
            ) : searchValue.length !== 0 && players.length !== 0 ? <FindPlayer players={players.filter(player => player.username.toLowerCase().includes(searchValue.toLowerCase()))} /> : currentPlayers && currentPlayers.length > 0 ? (
                <div className="p-2 flex-1 flex h-screen flex-col gap-2 overflow-y-auto">
                <div className="p-2 h-screen flex-1 overflow-y-auto">
                    <ListOfPlayers
                        titles={title[i18n.language]}
                        data={currentPlayers}
                    />
                </div>
                <div className=" p-2">
                    <PaginationButtons handlePage={handlePage} page={page} pageCount={pageCount} />
                </div>
            </div>
            ) : <Messages message={t("userNotFoundOnline")} />

            }
        </LayoutTable >
    )
}