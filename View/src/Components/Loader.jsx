import { useTranslation } from "react-i18next"
export default function Loader() {
    const { t } = useTranslation(["data"])
    return (
        <div className=' p-2 h-full flex gap-2 items-center font-bold text-secondary dark:text-primary justify-center'>
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-8 border-t-secondary" />
            {t("loader")}
        </div>
    )
}