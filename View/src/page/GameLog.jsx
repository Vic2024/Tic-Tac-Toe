import H1 from "../Components/h1"
import CardGame from "../Components/CardGame"
import Messages from "./Messages"
import { useGames } from "../Context/ConnectionContext"
import { useNotification } from "../Context/ConnectionContext"
import { useState, useEffect } from "react"
import Loader from "../Components/Loader"
import PaginationButtons from "../Components/PaginationButtons"
import { useTranslation } from "react-i18next"
export default function GameLog() {
    const { t } = useTranslation(["data"])
    const { games } = useGames()
    const { notifi } = useNotification()
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const endOffset = page + 3
    const currentGames = games.slice(page, endOffset)
    const pageCount = Math.ceil(games.length / 3)
    const handlePage = (selected) => {
        const newOffSet = (selected * 3) % games.length
        setPage(newOffSet)
    }
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000)
        return () => clearInterval()
    }, [])
    useEffect(() => {
        if (games.length !== 0 && currentGames.length === 0) {
            setPage((prevData) => prevData - 3)
        }
    }, [currentGames, games])
    return (
        <section className='p-2 flex gap-2 flex-col h-full'>
            <H1>{t("gameLog.h1")}</H1>
            {isLoading === true ? <Loader /> : currentGames && currentGames.length > 0 ? (
                <div className="p-2 flex-1 flex flex-col gap-2 overflow-y-auto ">
                    <div className="p-2 flex flex-col flex-1 overflow-y-auto gap-2 ">
                        {currentGames.map(game => (
                            <CardGame key={game.id}
                                name={game.name}
                                lastname={game.lastname}
                                username={game.username}
                                character={game.character}
                                request={game.request}
                                state_of_game={game.state_of_game}
                                turn={game.turn}
                                game={game.gameid}
                                result={game.result}
                                isNotAccept={notifi.map(el => el.content).includes(game.idrivals)}
                            />
                        ))
                        }
                    </div>
                    <div className="p-2">
                        <PaginationButtons handlePage={handlePage} page={page} pageCount={pageCount} />
                    </div>
                </div>
            ) : <Messages message={t("gameNotFound")} />
            }
        </section>
    )
}
