/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import Return from "../Icons/Return"
export default function ButtonReturn({ auth }) {
    const navigate = useNavigate()
    return (
        <button
            className="mt-2 mr-2 self-end border-2 p-1 rounded-md bg-primary dark:bg-secondary text-secondary dark:text-primary hover:bg-secondary dark:hover:bg-primary hover:text-primary dark:hover:text-secondary transition-all"
            onClick={() => navigate(`/online/dashboard/${auth.id}/game_log`)}
        >
            <Return />
        </button>
    )
}