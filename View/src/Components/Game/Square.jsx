/* eslint-disable react/prop-types */
const Square = ({ children, isSelected, updateBoard, index, turnPosition, winner, isMyTurn }) => {
    /* const className = `square ${isSelected ? 'is-selected' : ''}` */
    const className = `
     grid place-items-center ${isMyTurn !== false ? 'cursor-pointer' : 'cursor-not-allowed'} text-5xl w-[100px] h-[100px] rounded-[5px]
     ${isSelected ? 'text-[#fff] bg-[#09f]' : ''}
     ${turnPosition || winner ? 'pointer-events-none h-[70px] w-[70px] border-transparent' : 'border-[2px] border-solid border-secondary dark:border-primary transition-all'}
    `
    const handleClick = () => updateBoard(index)
    return (
        <div onClick={isMyTurn !== false ? handleClick : null} className={className}
        >
            {children}
        </div>
    )
}

export default Square