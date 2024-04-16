import Form from "../Layout/Form/Form"
import useForm from "../Hooks/useForm"
import { options } from "../Hooks/ResetPassword/Options"
import H1 from "../Components/h1"
import ContainerInputs from "../Layout/Form/ContainerInputs"
import Input from "../Components/Form/Input"
import Message from "../Components/Message/Message"
import Button from "../Components/Button"
import { useNavigate } from "react-router-dom"
import Loader from "../Components/Loader"
import Change from '../Icons/Change'
import { useTranslation } from "react-i18next"
export default function ResetPassword() {
    const { t, i18n } = useTranslation(["data"])
    const lang = i18n.language
    const { handleMethod, res } = useForm({
        ...options,
        token: window.location.pathname.split('/')[3]
    })
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        const result = await handleMethod(event)
        if (result.isSucces === true) setTimeout(() => {
            navigate('/login')
        }, 1000)
    }
    return (
        <Form handleSubmit={handleSubmit}>
            <H1>{t("changePassword.h1")}</H1>
            <ContainerInputs>
                <Input name='id' id={window.location.pathname.split('/')[2]} />
                <Input type='password' name='password' isRequired={res.error.password[lang]} label={t("changePassword.input.labelPassword")} helpMessage={t("changePassword.input.helpMessage")} />
                <Input type='password' name='confirmPassword' label={t("changePassword.input.labelConfirmPassword")} helpMessage={t("changePassword.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs margin='mt-10'>
                {res.isLoading !== true ? (
                    <Button id='edit' type='submit'>
                        {t("changePassword.buttonResetPassword")}
                        <Change />
                    </Button>
                ) : <Loader />}
            </ContainerInputs>
            <Message type='warning' message={res.error.message[lang]} />
            <Message type='success' message={res.success.message[lang]} />
        </Form>
    )
}