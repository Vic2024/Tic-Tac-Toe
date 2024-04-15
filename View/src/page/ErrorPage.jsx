import { useRouteError } from "react-router-dom"
import Emoji from "../Icons/Emoji.jsx";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-10'>
            <h1 className='text-7xl'><Emoji/></h1>
            <p className='text-5xl font-bold'>Sorry, an unexpected error has occurred.</p>
            <p className='text-3xl'>
                <i>{error.statusText || error.message}</i>
            </p>
        </div >
    )
}