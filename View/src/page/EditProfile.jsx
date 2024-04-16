import Form from "../Layout/Form/Form"
import useForm from "../Hooks/useForm"
import H1 from "../Components/h1"
import ContainerInputs from "../Layout/Form/ContainerInputs"
import Input from "../Components/Form/Input"
import Button from "../Components/Button"
import Message from "../Components/Message/Message"
import Loader from "../Components/Loader"
import { options } from "../Hooks/EditProfile/Options"
import { useAuth } from "../Context/AuthContext"
import Edit from "../Icons/Edit"
/* import Delete from "../Icons/Delete" */
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
const initialData = { name: '', lastname: '', email: '' }
export default function EditProfile() {
    const { t, i18n } = useTranslation(["data"])
    const lang = i18n.language
    const { auth } = useAuth()
    const { res, handleMethod } = useForm({ ...options, token: auth.token })
    const [dataToEdit, setDataToEdit] = useState(initialData)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        const result = await handleMethod(event)
        if (result.isSucces !== false) {
            if (result.method !== 'PATCH') {
                window.localStorage.removeItem('LoggedUser')
                navigate(`/`)
            } else {
                setDataToEdit({ ...dataToEdit, ...result.data })
            }
        }
    }
    useEffect(() => {
        async function getUser() {
            const result = await fetch(`/api/user/${auth.id}`, {
                headers: {
                    authorization: `Bearer ${auth.token}`
                }
            })
            if (result.status === 401) {
                window.localStorage.removeItem('LoggedUser')
                navigate(`/`)
            } else if (result.status === 200) {
                const res = await result.json()
                setDataToEdit({ ...res.data[0] })
                setIsLoading(false)
            }
        }
        getUser()
    }, [auth, navigate])
    return isLoading || res.isLoading ? (<Loader />) : (
        <Form dashboard handleSubmit={handleSubmit}>
            <H1>{t("editProfile.h1")}</H1 >
            <ContainerInputs width='w-full'>
                <Input name='id' id={auth.id} />
                <Input width='w-full' currentData={dataToEdit.name} isRequired={res.error.name[lang]} label={t("editProfile.input.labelName")} name='name' type='text' helpMessage={t("editProfile.input.helpMessage")} />
                <Input width='w-full' currentData={dataToEdit.lastname} isRequired={res.error.lastname[lang]} label={t("editProfile.input.labelLastName")} name='lastname' type='text' helpMessage={t("editProfile.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs width='w-full' margin='mt-4 phone:mt-8'>
                <Input width='w-full' currentData={dataToEdit.email} isRequired={res.error.email[lang]} label={t("editProfile.input.labelEmail")} name='email' type='text' helpMessage={t("editProfile.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs margin='mt-8 phone:mt-8'>
                <Input width='full' isRequired={res.error.confirmPassword[lang]} label={t("editProfile.input.labelConfirmPassword")} name='confirmPassword' type='password' helpMessage={t("editProfile.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs margin='mt-8 phone:mt-8'>
                <div className='flex justify-center items-center gap-2 p-2'>
                    <Button id='edit' dashboard type='submit'>
                        <span className="phone:hidden">
                            {t("editProfile.buttonEditProfile")}
                        </span> <Edit />
                    </Button>
                    {/* <Button id='delete' dashboard type='submit'>
                        <span className="phone:hidden">
                            {t("editProfile.buttonDeleteProfile")}
                        </span>
                        <Delete />
                    </Button> */}
                </div>
            </ContainerInputs>
            <Message type='warning' message={res.error.message[lang]} />
            <Message type='success' message={res.success.message[lang]} />
        </Form >
    )
}