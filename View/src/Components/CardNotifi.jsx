import { sendResponse } from "../Hooks/socket"
import { useTranslation } from "react-i18next"
/* eslint-disable react/prop-types */
export default function CardNotifi({ card }) {
    const { t } = useTranslation(["data"])
    const handleClick = (e) => sendResponse({ card, action: e.target.id })
    return card && (
        <div className='border-2 self-start flex flex-col gap-2 p-2 rounded-md'>
            <h2 className='text-lg self-center font-bold' >{card.date.split('T')[0]}</h2>
            <h2 className='text-lg self-center font-bold' >{t("request.card.title", { user_from: card.user_from })}</h2>
                <div className='p-2 justify-between w-full flex flex-row items-start gap-2'>
                    <h3 className='text-base font-bold'>{t("request.card.character", { character: card.character })}</h3>
                    <h3 className='text-base font-bold'>{t("request.card.stateOfRequest", { request: card.request })}</h3>
                </div>
                <div className='flex self-center gap-4'>
                    <button
                        onClick={handleClick}
                        id="aceppt"
                        className='p-2 phone:text-sm font-bold rounded-md text-primary bg-green-back hover:bg-hover-green transition-all'
                    >
                        {t("request.buttonAceppt")}
                    </button>
                    <button
                        onClick={handleClick}
                        id="reject"
                        className='p-2 phone:text-sm font-bold rounded-md text-primary bg-red-error hover:bg-hover-red transition-all'
                    >
                        {t("request.buttonReject")}
                    </button>
                </div>
        </div>

    )
}