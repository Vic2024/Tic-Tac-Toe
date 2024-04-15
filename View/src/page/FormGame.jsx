/* eslint-disable no-unused-vars */
import { createPortal } from 'react-dom'
import Form from '../Layout/Form/Form'
import Button from '../Components/Button'
import Close from '../Icons/Close'
import Send from '../Icons/Send'
import RadioButton from '../Components/RadioButton'
import { getControl } from '../Helper/getContol'
import { useState } from 'react'
import { sendNotification } from '../Hooks/socket'
const errorMessage = { es: 'Tienes que escoger un personaje', en: 'You have to choose a character' }
export default function FormGame({ modal, data, closeModal }) {
    const [error, setError] = useState({ en: '', es: '' })
    const handleClick = () => closeModal()
    const handleSubmit = (e) => {
        e.preventDefault()
        const { elements } = e.currentTarget
        const X = getControl(elements.namedItem('character')[0])
        const O = getControl(elements.namedItem('character')[1])
        if (X.checked === false && O.checked === false) {
            setError({ ...errorMessage })
        } else {
            setError({ en: '', es: '' })
            sendNotification({
                characters: {
                    X: {
                        isChecked: X.checked,
                        value: X.value
                    },
                    O: {
                        isChecked: O.checked,
                        value: O.value
                    }
                }, to: { ...data }
            })
            handleClick()
        }
    }

    return modal && createPortal(
        (
            (
                <div className='absolute flex justify-center items-center top-0 w-screen h-screen place-items-center bg-modal'>
                    <Form handleSubmit={handleSubmit} width='w-auto' bg='bg-secondary dark:bg-primary'>
                        <div className='flex justify-end p-2 w-full'>
                            <Button type='button' onClick={handleClick}><Close /></Button>
                        </div>
                        <h2 className='text-primary dark:text-secondary text-2xl font-bold'>Invitando a {`${data.username}`}</h2>
                        <div className='flex flex-col justify-center gap-2 border-primary dark:border-secondary rounded-md p-2 w-full'>
                            <h3 className='text-xl font-bold text-primary dark:text-secondary'>Selecciona tu personaje</h3>
                            {error && (
                                <span className='ml-2 text-sm text-red-error font-bold'>{error['en']}</span>
                            )}
                            <div className='flex gap-4 justify-center items-center'>
                                <RadioButton value={1} name='character'>❌</RadioButton>
                                <RadioButton value={2} name='character'>⚪</RadioButton>
                            </div>
                        </div>
                        <Button type='submit'>
                            Enviar Invitacion <Send />
                        </Button>
                    </Form>
                </div>
            )
        ), document.body
    )
}