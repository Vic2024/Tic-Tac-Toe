/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import Play from "../Icons/Play"
import { useTranslation } from "react-i18next"
const MessageResult = {
    1: {
        es: 'Haz ganado el juego',
        en: 'You have won the game',
    },
    2: {
        es: 'Haz Perdido el juego',
        en: 'You have lost the game',
    }
}
export default function CardIsResult({ result, game }) {
    const { t, i18n } = useTranslation(["data"])
    const lang = i18n.language
    return result && result !== null ? (
        <span className='p-2 font-bold text-xl'>{MessageResult[result][lang]}</span>
    ) : (
        <Link to={`/online/game/${game}`} className='border-2 phone:text-sm flex gap-2 p-2 rounded-md text-center bg-primary dark:bg-secondary text-secondary dark:text-primary hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary font-bold transition-all'>
            {t("gameLog.card.buttonPlay")} <Play />
        </Link>
    )
}