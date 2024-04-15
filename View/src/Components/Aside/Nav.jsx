/* eslint-disable react/prop-types */
import { useState } from "react"
import { useTranslation } from "react-i18next"
import LinkAside from "../LinkAside"
import Search from "../../Icons/Search"
import Profile from "../../Icons/Profile"
import Register from "../../Icons/Register"
import Request from "../../Icons/Request"
import { useAuth } from "../../Context/AuthContext"
import { useNotification } from "../../Context/ConnectionContext"
export default function Nav({ hidden }) {
    const { auth } = useAuth()
    const { notifi } = useNotification()
    const { t } = useTranslation(["data"])
    const [isPath, setIsPath] = useState(window.location.pathname.split('/')[4])
    const handleIsPath = (path) => setIsPath(path.split('/')[4])
    return (
        <div className={`mt-5 flex-1 flex flex-col gap-1 p-2 ${hidden ? hidden : ''}`}>
            <LinkAside
                isPath={isPath === 'searchgame' ? true : false}
                handleIsPath={handleIsPath} path={`/online/dashboard/${auth.id}/searchgame/usersOnline`}
            >
                <Search /> {t("dashBoard.aside.searchGame")}
            </LinkAside>
            <LinkAside
                isPath={isPath === 'edit_profile' ? true : false}
                handleIsPath={handleIsPath} path={`/online/dashboard/${auth.id}/edit_profile`}
            >
                <Profile /> {t("dashBoard.aside.profile")}
            </LinkAside>
            <LinkAside
                isPath={isPath === 'game_log' ? true : false}
                handleIsPath={handleIsPath} path={`/online/dashboard/${auth.id}/game_log`}
            >
                <Register /> {t("dashBoard.aside.register")}
            </LinkAside>
            <LinkAside
                isPath={isPath === 'requests' ? true : false}
                handleIsPath={handleIsPath} path={`/online/dashboard/${auth.id}/requests`}
            >
                <Request /> {t("dashBoard.aside.request")}
                {notifi && notifi.length > 0 && (
                    <span className='absolute p-1 left-1.5 top-1 h-5 w-5 flex justify-center items-center text-xs text-primary bg-red-back rounded-full'>
                        {notifi.length}
                    </span>
                )}
            </LinkAside>
        </div>
    )
}