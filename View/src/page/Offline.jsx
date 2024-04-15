import ListOfPlayers from "../Components/ListOfPlayers"
import { useAuth } from "../Context/AuthContext"
import processingData from "../Helper/ProcessingData"
import { useEffect, useState } from "react"
import { usePlayers } from "../Context/ConnectionContext"
import Messages from "./Messages"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next"
import PaginationButtons from "../Components/PaginationButtons"
import { useSearchGame } from "../Context/SearchGameContext"
import FindPlayer from "../Components/FindPlayer"
import { useNavigate } from 'react-router-dom'
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
export default function UsersOffline() {
    const navigate = useNavigate()
    const { searchValue } = useSearchGame()
    const { t, i18n } = useTranslation(["data"])
    const { players } = usePlayers()
    const [playersOff, setPlayersOff] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [isLoading, seIsLoading] = useState(true)
    const { auth } = useAuth()
    const [page, setPage] = useState(0)
    const endOffset = page + 6
    const currentPlayers = playersOff.slice(page, endOffset)
    const pageCount = Math.ceil(playersOff.length / 6)
    const handlePage = (selected) => {
        const newOffSet = (selected * 6) % playersOff.length
        setPage(newOffSet)
    }
    useEffect(() => {
        async function getUsers() {
            async function getUser() {
                const result = await fetch('/api/user', {
                    headers: {
                        authorization: `bearer ${auth.token}`,
                        username: auth.username
                    }
                })
                if (result.status === 401) {
                    window.localStorage.removeItem('LoggedUser')
                    navigate(`/`)
                } else if (result.status === 200) {
                    const res = await result.json()
                    setAllUsers([...res.data])
                }
            }
            getUser()
        }
        getUsers()
    }, [auth, navigate])


    useEffect(() => {
        const result = processingData({
            usersOnline: [...players],
            usersOffline: allUsers
        })
        setPlayersOff([...result])
        seIsLoading(false)


    }, [allUsers, players,])

    return isLoading === true ? (
        <Loader />
    ) : searchValue.length !== 0 && playersOff.length !== 0 ? <FindPlayer players={playersOff.filter(player => player.username.toLowerCase().includes(searchValue.toLowerCase()))} /> : currentPlayers && currentPlayers.length > 0 ? (
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