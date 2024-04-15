import { useNavigate } from "react-router-dom"
import H1 from "../Components/h1"
import Form from "../Layout/Form/Form"
import ContainerInputs from "../Layout/Form/ContainerInputs"
import Create from "../Icons/Create"
import Input from "../Components/Form/Input"
import Button from "../Components/Button"
import LinkReturn from "../Components/LinkReturn"
import useForm from "../Hooks/useForm"
import Loader from "../Components/Loader"
import Message from "../Components/Message/Message"
import { options } from "../Hooks/CreateAccount/Options"
import { useTranslation } from "react-i18next"
export default function CreateAccount() {
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
            <H1>{t("record.h1")}</H1>
            <ContainerInputs>
                <Input type='text' name='name' isRequired={res.error.name[lang]} label={t("record.input.labelName")} helpMessage={t("record.input.helpMessage")} />
                <Input type='text' name='lastname' isRequired={res.error.lastname[lang]} label={t("record.input.labelLastName")} helpMessage={t("record.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs margin='mt-5'>
                <Input type='text' name='username' isRequired={res.error.username[lang]} label={t("record.input.labelUsername")} helpMessage={t("record.input.helpMessage")} />
                <Input type='password' name='password' isRequired={res.error.password[lang]} label={t("record.input.labelPassword")} helpMessage={t("record.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs  margin='mt-5'>
                <Input type='text' name='email' isRequired={res.error.email[lang]} label={t("record.input.labelEmail")} helpMessage={t("record.input.helpMessage")} />
            </ContainerInputs>
            <ContainerInputs margin='mt-10'>
                {res.isLoading !== true ? (
                    <Button type='submit'>
                        {t("record.buttonCreateAccount")}
                        <Create />
                    </Button>
                ) : <Loader />}
            </ContainerInputs>
            <Message type='warning' message={res.error.message[lang]} />
            <Message type='success' message={res.success.message[lang]} />
        </Form>
    )
}