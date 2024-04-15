
/* eslint-disable react/prop-types */
import Square from "./Square"
import Button from "../Button.jsx"
import ButtonReturn from "../ButtonReturn.jsx"
import OptionsWinner from "./OptionsWinner.jsx"
import { useTranslation } from "react-i18next"
const WinnerModal = ({ winner, resetGame, online, player, auth, rival }) => {
    const { t } = useTranslation(["data"])
    if (winner === null) return null
    const winnerText = winner === false ? t("winnerModal.tie") : t("winnerModal.won")
    return (
        <section className='absolute w-[100vw] h-[100vh] top-0 left-0 grid place-items-center bg-modal'>
            <div className='bg-primary dark:bg-secondary h-[300px] w-[320px] border-solid border-[2px] border-secondary dark:border-primary rounded-[10px] flex flex-col justify-center items-center gap-[20] '>
                {online && (<ButtonReturn auth={auth} />)}
                <h2 className='font-bold text-[24px] text-secondary dark:text-primary mb-[24px] mt-[24px]'>{winnerText}</h2>
                <header className='mt-[0] mb-auto ml-auto mr-auto w-fit flex gap-[15] rounded-[10px] border-solid border-[2px] border-secondary dark:border-primary'>
                    {winner && <Square winner={winner}>{winner}</Square>}
                </header>
                <footer>
                    {
                        online ? (
                            <OptionsWinner player={player} rival={rival} winner={winner} />
                        ) : (
                            <Button onClick={resetGame}>{t("winnerModal.startAgain")}</Button>
                        )
                    }
                </footer>
            </div>
        </section >
    )
}

export default WinnerModal