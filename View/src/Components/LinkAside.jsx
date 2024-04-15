/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
export default function LinkAside({ children, path, handleIsPath, isPath }) {
    const handleClick = () => handleIsPath(path)
    return (
        <Link to={path} onClick={handleClick} className={`font-bold relative flex flex-row  items-center gap-2 rounded-md text-center ${isPath ? ' bg-[#d1d5db] dark:bg-gray-back' : ' transition ease-in-out hover:bg-[#d1d5db] dark:hover:bg-gray-back'} text-secondary dark:text-primary phone:text-sm p-3`}>
            {children}
        </Link>
    )
}