import { useTranslation } from "react-i18next"
import { useMessages } from "../Context/ConnectionContext"
export default function Notification() {
    const { i18n } = useTranslation(["data"])
    const { message, setMessage } = useMessages()
    const handleMessage = (indexMessage) => setMessage((prevData) => [...prevData.filter((_, index) => index !== indexMessage)])

    return (
        <div className="absolute top-6 flex flex-col gap-1 right-6">
            {message && message.length !== 0 && (
                message.map((message, index) => (
                    <div key={index} className="relative animate-fade-down animate-once animate-duration-500 border-2 flex gap-1 justify-center items-center flex-row p-3 rounded-t-lg rounded-bl-lg bg-secondary dark:bg-primary text-primary dark:text-secondary font-bold transition-all">
                        <h1 className="">{message[i18n.language]}</h1>
                        <button onClick={() => handleMessage(index)} className=" absolute top-[1px] right-1 font-bold text-primary dark:text-secondary text-center text-xs hover:text-[#d1d5db] dark:hover:text-gray-back transition-all">X</button>
                    </div>
                ))
            )}
        </div>
    )
}