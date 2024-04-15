/* eslint-disable react/prop-types */
import CardIsResult from "./CardIsResult"
import { useTranslation } from "react-i18next"
const stateOfGameTrnanslate = {
    en: {
        "Pending": "Pending",
        "Processing": "Processing",
        "Finished": "Finished"
    },
    es: {
        "Pending": "Pendiente",
        "Processing": "Procesando",
        "Finished": "Finalizado"
    }
}
const requestRivalTranslate = {
    en: {
        "Pending": "Pending",
        "OK": "OK"
    },
    es: {
        "Pending": "Pendiente",
        "OK": "OK"
    }
}
export default function CardGame({ username, name, lastname, character, request, state_of_game, turn, isNotAccept, game, result }) {
    const { t, i18n } = useTranslation(["data"])
    const lang = i18n.language
    return (
        <div className='border-2 p-2 rounded-md flex flex-col gap-2 '>
            <header className='p-2 text-center'>
                <h1 className='font-bold text-xl'>{t("gameLog.card.title", { username })}</h1>
            </header>
            <main className='grid grid-cols-3 gap-2 items-center layout:grid-cols-1 '>
                <div className='p-2 flex flex-col gap-2'>
                    <div className='p-2 flex justify-between'>
                        <span className='font-bold'>{t("gameLog.card.name")}</span>
                        <span className='font-bold'>{name}</span>
                    </div>
                    <div className='p-2 flex justify-between '>
                        <span className='font-bold'>{t("gameLog.card.lastname")}</span>
                        <span className='font-bold'>{lastname}</span>
                    </div>
                </div>
                <div className='p-2 flex flex-col gap-2'>
                    <div className='p-2 flex justify-between'>
                        <span className='font-bold'>{t("gameLog.card.characterRival")}</span>
                        <span className='font-bold'>{character}</span>
                    </div>
                    <div className='p-2 flex justify-between'>
                        <span className='font-bold text-sm'>{t("gameLog.card.requestRival")}</span>
                        <span className='font-bold text-sm'>{requestRivalTranslate[lang][request]}</span>
                    </div>
                </div>
                <div className='p-2 flex flex-col gap-2'>
                    <div className='p-2 flex justify-between'>
                        <span className='font-bold'>{t("gameLog.card.stateOfGame")}</span>
                        <span className='font-bold'>{stateOfGameTrnanslate[lang][state_of_game]}</span>
                    </div>
                    <div className='p-2 flex justify-between '>
                        <span className='font-bold'>{t("gameLog.card.turn")}</span>
                        <span className='font-bold'>{turn}</span>
                    </div>
                </div>
            </main>
            <footer className='p-2 flex justify-end layout:justify-center items-center'>
                {isNotAccept !== true ?
                    (
                        <CardIsResult game={game} result={result} />
                    )
                    : <span className='font-bold'>{t("gameLog.card.waitingAnswer")}</span>
                }
            </footer>
        </div>
    )
}