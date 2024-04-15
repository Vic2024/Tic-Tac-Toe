/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
export default function Indicators({ children, path, handleIsPath, isPath }) {
    const handleClick = () => handleIsPath(path)
    const isNotPath = 'bg-secondary hover:bg-primary text-primary hover:text-secondary dark:bg-primary dark:hover:bg-secondary dark:text-secondary dark:hover:text-primary '
    return (
        <Link
            to={path}
            onClick={handleClick}
            className={`p-2 font-bold ${isPath ? '' : isNotPath} transition-all phone:text-sm border-2 flex justify-center items-center gap-2 rounded-md `}
        >
            {children}
        </Link>
    )
}