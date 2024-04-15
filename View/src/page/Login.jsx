import { Link, useNavigate } from "react-router-dom"
import Button from "../Components/Button"
import Input from "../Components/Form/Input"
import LoginIcon from "../Icons/Login"
import Form from "../Layout/Form/Form"
import H1 from "../Components/h1"
import ContainerInputs from "../Layout/Form/ContainerInputs"
import useForm from "../Hooks/useForm"
import { options } from "../Hooks/User/Options"
import Message from "../Components/Message/Message"
import Loader from "../Components/Loader"
import { useTranslation } from "react-i18next"
export default function Login() {
    const { t, i18n } = useTranslation(["data"])
    const lang = i18n.language
    const { handleMethod, res } = useForm(options)
    const navigate = useNavigate()
    async function handleSubmit(event) {
        event.preventDefault()
        const result = await handleMethod(event)
        if (result.isSucces === true) {
            window.localStorage.setItem('LoggedUser', JSON.stringify(result.data))
            setTimeout(() => {
                navigate(`/online/dashboard/${result.data.id}/searchgame/usersOnline`)
            }, 2000)
        }
    }
    return (
        <section className='flex p-2 items-center justify-center'>
            <Form bg='bg-primary dark:bg-secondary transition-all' width='w-full' handleSubmit={handleSubmit}>
                <H1>{t('login.h1')}</H1>
                <ContainerInputs>
                    <Input label={t("login.input.labelUsername")} width='w-full' name='username' isRequired={res.error.username[lang]} type='text' helpMessage={t("login.input.helpMessage")} />
                    <Input label={t("login.input.labelPassword")} width='w-full' name='password' isRequired={res.error.password[lang]} type='password' helpMessage={t("login.input.helpMessage")} />
                </ContainerInputs>
                <div className='p-2 mt-8 gap-5 flex flex-col items-center justify-between layout:gap-2'>
                    {res.isLoading !== true ? (
                        <>
                            <Link className="font-bold phone:text-sm text-secondary  dark:text-primary hover:text-gray-back dark:hover:text-[#d1d5db] transition-all" to={'/create_account'}>{t("login.createAccount")}</Link>
                            <Button type='submit'>
                                {t("login.buttonLogin")}
                                <LoginIcon />
                            </Button>
                            <Link className="font-bold phone:text-sm text-secondary dark:text-primary hover:text-gray-back dark:hover:text-[#d1d5db] transition-all" to={'/recover_password'}>{t("login.recoverPassword")}</Link>
                        </>
                    ) : <Loader />}
                </div>
                <Message type='warning' message={res.error.message[lang]} />
                <Message type='success' message={res.success.message[lang]} />
                {/* <Message type='success' message={'res.success.message[lang]'} /> */}
            </Form>
        </section>
    )
}