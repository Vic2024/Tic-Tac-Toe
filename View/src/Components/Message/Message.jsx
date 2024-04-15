import color from "./Colors"
import Success from "../../Icons/Success"
import Error from "../../Icons/Error"
import Warning from "../../Icons/Warning"
import Alert from "../../Icons/Alert"
/* eslint-disable react/prop-types */
export default function Message({ message, type }) {
    return message && (
        <div className='fixed right-0 bottom-16 m-5'>
            <div className={`animate-toast flex gap-2 items-center ${color[type].back} border-l-4 ${color[type].border} py-2 px-3 shadow-md mb-2 text-primary phone:text-[14px]`}>
                {/* Icon */}
                {type === 'success' && (<Success />)}
                {type === 'error' && (<Error />)}
                {type === 'warning' && (<Warning />)}
                {type === 'alert' && (<Alert />)}
                {/* Text */}
                <h2 className='text-primary phone:text-[14px]'>
                    {message}
                </h2>
            </div>
        </div>
    )
}