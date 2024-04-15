/* eslint-disable react/prop-types */
import ListOfPlayers from "./ListOfPlayers"
import Messages from "../page/Messages"
import { useTranslation } from "react-i18next"
const title = {
    en: [
        "NAME",
        "LASTNAME",
        "USERNAME",
        "ACTIVITY",
        "ACTION"
    ],
    es: [
        "NOMBRE",
        "APELLIDO",
        "NOMBRE DE USUARIO",
        "ACTIVIDAD",
        "ACCION"
    ]
}
export default function FindPlayer({ players }) {
    const { t, i18n } = useTranslation(["data"])
    return players && players.length !== 0 ?
        (
            <div className='h-5/6 overflow-x-auto overflow-y-auto'>
                <ListOfPlayers
                    titles={title[i18n.language]}
                    data={players}
                />
            </div>
        ) : (
            <Messages message={t("userNotFoundOnline")} />
        )
}