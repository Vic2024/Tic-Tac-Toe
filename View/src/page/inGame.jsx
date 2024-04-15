import Square from "../Components/Game/Square"
import { TURNS } from "../constants"
import useGameOnline from "../Hooks/useGameOnline"
import WinnerModal from "../Components/Game/WinnerModal"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next"
export default function InGame() {
    const { t } = useTranslation(["data"])
    const { player, isLoading, game, updateBoard, winner, auth } = useGameOnline()
    return (
        <section className='w-fit text-center flex flex-col justify-center items-center gap-2 '>
            <div className='flex flex-col gap-2 justify-center items-center p-2'>
                {isLoading ? <Loader /> : (
                    <>
                        <span className='text-xl text-secondary dark:text-primary font-bold'>{t("game.currentPlayer")}</span>
                        <Square turnPosition>{player.data.character}</Square>
                    </>
                )
                }
            </div>
            <section className='grid gap-[10px] grid-cols-3'>
                {game.board.map((_, index) => {
                    return (
                        <Square
                            isMyTurn={isLoading ? null : game.turn === player.data.character}
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                        >
                            {game.board[index]}
                        </Square>
                    )
                })}
            </section>
            <section className='flex justify-center mt-[15px]  w-fit relative rounded-[10px]'>
                <Square turnPosition isSelected={game.turn === TURNS.X}>{TURNS.X}</Square>
                <Square turnPosition isSelected={game.turn === TURNS.O}>{TURNS.O}</Square>
            </section>
            <WinnerModal
                winner={winner}
                online
                player={isLoading ? null : player.data.character}
                auth={auth}
                rival={isLoading ? null : player.data.invited}
            />
        </section>
    )
}