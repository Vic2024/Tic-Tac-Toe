/* eslint-disable react/prop-types */
import SocialNetworks from "../lib/RedesSociales.js"
import { useTranslation } from "react-i18next"
export default function Footer({ dashBoard }) {
    const { t } = useTranslation(["data"])
    return (
        <footer className={`[grid-area:footer] layout:flex-col-reverse layout:justify-center  pl-2 pr-2 rounded-md flex justify-between items-center ${dashBoard ? 'border-2 border-secondary dark:border-2 dark:border-primary layout:border-none' : ''}`}>
            <h4 className={`font-bold phone:text-sm text-base text-secondary dark:text-primary p-1 rounded-md transition-all`}>
                {t("footer")}
            </h4>
            <nav className='p-2 flex justify-between'>
                <ul className={`flex justify-between gap-3 rounded-md  p-1 items-center`}>
                    {SocialNetworks.map((el, index) => {
                        return (
                            <li className="phone:size-10" key={index}>
                                <a
                                    href={el.path}
                                    target='_blank'
                                    className={`flex gap-2 phone:text-sm text-secondary dark:text-primary items-center font-medium transition-all`}
                                ><el.icon /></a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </footer>
    )
}