/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import Button from "./Button"
import Indication from "./Indication"
import FormGame from "../page/FormGame"
import Invite from "../Icons/Invite"
import useResponsive from "../Hooks/useResponsive"

export default function ListOfPlayers({ titles, data }) {
    const [action, setAction] = React.useState({ showModal: false, data: {} })
    const { isResponsive } = useResponsive()
    const handleClick = (player) => {
        setAction({ showModal: true, data: { ...player } })
    }

    const closeModal = () => {
        setAction({ showModal: false, data: {} })
    }

    return data.length !== 0 && (
        <table className="w-full border-collapse relative phone:text-sm text-left rtl:text-right font-bold text-secondary dark:text-primary">
            <thead className="phone:text-xs text-primary uppercase bg-secondary dark:bg-gray-back dark:text-primary">
                <tr>
                    {titles.map((title, index) => (
                        <th key={index} scope="col" className="px-6 py-3">
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map(player => (
                    <tr key={player.id} className="bg-primary border-b dark:bg-secondary dark:border-gray-back">
                        <td data-label={titles[0]} scope="row" className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                            {player.name}
                        </td>
                        <td data-label={titles[1]} className="px-6 py-4">
                            {player.lastname}
                        </td>
                        <td data-label={titles[2]} className="px-6 py-4">
                            {player.username}
                        </td>
                        <td data-label={titles[3]} className="px-6 py-4">
                            <Indication color={player.isLogged && player.isLogged !== false ? 'bg-green-back' : 'bg-red-error'} />
                        </td>
                        <td data-label={titles[4]} className="px-6 py-4">
                            <Button onClick={() => handleClick(player)}>
                                {/* {isResponsive === true ? '' : 'Invitar a Jugar'} */}
                                <span className="phone:hidden">Invitar a Jugar</span>
                                <Invite />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <FormGame
                modal={action.showModal}
                data={action.data}
                closeModal={closeModal}
            />
        </table>
    )
}