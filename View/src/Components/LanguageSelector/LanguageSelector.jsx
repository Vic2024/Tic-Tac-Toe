
import { LANGUAGES } from "./ui"
import { useTranslation } from "react-i18next"
export default function LanguageSelector() {

    const { i18n } = useTranslation()
    const lang = i18n.language
    const currentLocaleData = LANGUAGES[lang]
    const otherLocales = Object.values(LANGUAGES).filter(
        (locale) => locale.code.toLowerCase() !== lang
    )
    const handleLanguage = lng => {
        window.localStorage.setItem('lang', lng)
        i18n.changeLanguage(lng)
    }

    return (
        <div className='relative inline-block text-left'>
            <div className='group text-primary dark:text-secondary rounded-md text-xs font-semibold bg-secondary dark:bg-primary transition-all'>
                <button
                    type="button"
                    className='inline-flex layout:w-10 layout:h-10 justify-start items-center gap-x-2 px-3 py-2'
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    <currentLocaleData.flag />
                    <span className="phone:hidden">{currentLocaleData.code}</span>
                </button>
                <ul className='group-hover:block group-hover:animate-fade-down group-hover:animate-duration-200 hidden pt-0.5 absolute w-full'>
                    {
                        otherLocales.map((locale, index) => (

                            <li key={index} className="py-[2px]">
                                <button
                                    onClick={() => handleLanguage(locale.code.toLowerCase())}
                                    className="phone:w-10 phone:h-10 rounded-md bg-secondary dark:bg-primary whitespace-no-wrap inline-flex justify-start items-center w-full gap-x-2 px-3 py-2"
                                >
                                    <locale.flag />
                                    <span className="phone:hidden">{locale.code}</span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}