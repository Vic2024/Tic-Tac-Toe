import Help from "../../Icons/Help"
import ShowPass from "../../Icons/ShowPass"
import HiddenPass from "../../Icons/HiddenPass"
import useInput from "../../Hooks/useInput"
import { useState } from "react"
/* eslint-disable react/prop-types */
export default function Input(
    { label, name, isRequired, helpMessage, type, width, id, onChange, currentData }) {
    const { ref, showPassword } = useInput()
    const [showHelp, setShowHelp] = useState('hidden')
    const handleShowHelp = () => {
        setShowHelp((prev) => {
            return prev === 'hidden' ? 'block' : 'hidden'
        })
    }
    return (
        <div ref={ref} className={`${width ? width : ''} p-2 flex flex-col ${id ? 'hidden' : ''}`}>
            <label htmlFor={name} className="pl-5 flex flex-row gap-1 phone:text-base text-lg text-center font-bold text-secondary dark:text-primary transition-all">
                {label ?
                    currentData ? `${label}: ${currentData}` : label
                    : null}
                {type === 'password' && (
                    <button className='text-secondary  dark:text-primary transition-all' type="button" onClick={showPassword}>
                        <ShowPass />
                        <HiddenPass className='hidden' />
                    </button>
                )}
                <button onClick={handleShowHelp} className={id ? 'hidden' : ''} type="button"><Help /></button>
            </label>
            <div className={`flex flex-col justify-center p-2 items-center gap-2 relative ${id ? 'hidden' : ''}`}>
                <input
                    id={name}
                    name={name}
                    className={`${width ? width : ''} phone:text-sm border-2 p-2 text-primary font-bold rounded-xl border-secondary dark:border-primary bg-secondary`}
                    type={type}
                    value={id ? id : undefined}
                    readOnly={id ? true : false}
                    onChange={onChange}
                />
                {isRequired ?
                    (
                        <label className='flex items-center gap-2 text-base  phone:text-sm px-2 text-red-error break-all' htmlFor={name}>
                            <strong className="text-base phone:text-sm">{isRequired}</strong>
                        </label>
                    ) : (
                        <ul className={`${showHelp} animate-fade-down animate-duration-200 px-2 absolute left-3 top-14 w-full`}>
                            <p className=' text-base phone:text-sm  text-secondary dark:text-primary'>
                                <strong>{helpMessage}</strong>
                            </p>
                        </ul>
                    )
                }

            </div>
        </div>
    )
}
