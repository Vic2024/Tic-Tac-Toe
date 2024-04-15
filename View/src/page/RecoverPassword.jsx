import H1 from "../Components/h1"
import Form from "../Layout/Form/Form"
import ContainerInputs from "../Layout/Form/ContainerInputs"
import Input from "../Components/Form/Input"
import Button from "../Components/Button"
import RecoverPass from "../Icons/RecoverPass"
import LinkReturn from "../Components/LinkReturn"
import { options } from "../Hooks/RecoverPassword/Options"
import useForm from "../Hooks/useForm"
import { useNavigate } from "react-router-dom"
import Message from "../Components/Message/Message"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next"
export default function RecoverPassword() {
    const { handleMethod, res } = useForm(options)
    const { t, i18n } = useTranslation(["data"])
    const lang = i18n.language
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        const result = await handleMethod(event)
        if (result) setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    return (
        <Form handleSubmit={handleSubmit}>
            <LinkReturn path='/login' position='self-end' />
            <div className="p-2 mt-2 h-full flex flex-col justify-center items-center layout:justify-start phone:justify-center">
                <H1>{t("resetPassword.h1")}</H1>
                <ContainerInputs width='w-full'>
                    <Input width='w-full' label={t("resetPassword.input.labelEmail")} isRequired={res.error.email[lang]} name='email' type='text' helpMessage={t("resetPassword.input.helpMessage")} />
                </ContainerInputs>
                <ContainerInputs margin='mt-10'>
                    {res.isLoading !== true ? (
                        <Button type='submit'>
                            {t("resetPassword.buttonResetPassword")} 
                            <RecoverPass />
                        </Button>
                    ) : <Loader />}
                </ContainerInputs>
            </div>
            <Message type='warning' message={res.error.message[lang]} />
            <Message type='success' message={res.success.message[lang]} />
        </Form>
    )
}