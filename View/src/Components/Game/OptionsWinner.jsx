/* eslint-disable react/prop-types */
import Reset from "../../Icons/Reset"
import GameOver from "../../Icons/GameOver"
import { resetGame, endGame } from "../../Hooks/socket"
import { useTranslation } from "react-i18next"
import { useLocation } from 'react-router-dom'
export default function OptionsWinner({ player, winner, rival }) {
    const location = useLocation()
    const { t } = useTranslation(["data"])
    const handleEndGame = () => endGame({ idGame: location.pathname.split('/')[3], rival })
    const handleResetGame = () => resetGame({ idGame: location.pathname.split('/')[3], rival })
    return player === winner ? (
        <div className="p-2 flex flex-row gap-2">
            <button onClick={handleEndGame} className="flex gap-1 flex-row items-center text-center p-2 border-2 rounded-md font-bold bg-primary dark:bg-secondary text-secondary dark:text-primary hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary transition-all">
                {t("winnerModal.onlineOptions.buttonFinishGame")} <GameOver />
            </button>
            <button onClick={handleResetGame} className="flex gap-1 flex-row items-center text-center p-2 border-2 rounded-md font-bold bg-primary dark:bg-secondary text-secondary dark:text-primary hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary transition-all">
                {t("winnerModal.onlineOptions.buttonResetGame")} <Reset />
            </button>
        </div>
    ) : (
        <h1 className="p-2 text-secondary dark:text-primary font-bold">{t("winnerModal.onlineOptions.messageLoser")}</h1>
    )
}