import H1 from "../Components/h1"
import { useNotification } from '../Context/ConnectionContext'
import CardNotifi from "../Components/CardNotifi"
import Messages from "./Messages"
import { useState, useEffect } from "react"
import PaginationButtons from "../Components/PaginationButtons"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next"
export default function Request() {
    const { t } = useTranslation(["data"])
    const { notifi } = useNotification()
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const endOffset = page + 6
    const currentNotifi = notifi.slice(page, endOffset)
    const pageCount = Math.ceil(notifi.length / 6)
    const handlePage = (selected) => {
        const newOffSet = (selected * 6) % notifi.length
        setPage(newOffSet)
    }
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000)
        return () => clearInterval()
    }, [])
    useEffect(() => {
        if (notifi.length !== 0 && currentNotifi.length === 0) {
            setPage((prevData) => prevData - 6)
        }
    }, [currentNotifi, notifi])
    return (
        <section className='flex gap-4 flex-col p-2 h-full'>
            <div className="flex flex-col justify-center items-center">
                <H1 >{t("request.h1")}</H1>
                <h2 className="text-cetner phone:text-base  text-xl font-bold">{t("request.note")}</h2>
            </div>
            {isLoading === true ? (<Loader />) : currentNotifi && currentNotifi.length > 0 ? (
                <div className="flex-1 p-2 flex flex-col gap-2 overflow-y-auto">
                    <div className="p-2 flex-1 grid grid-cols-3 layout:grid-cols-1 gap-4 overflow-y-auto">
                        {currentNotifi.map(card => <CardNotifi key={card.id} card={card} />)}
                    </div>
                    <div className="p-2">
                        <PaginationButtons handlePage={handlePage} page={page} pageCount={pageCount} />
                    </div>
                </div>
            ) : <Messages message={t("requestNotFound")} />}

        </section>
    )
}

