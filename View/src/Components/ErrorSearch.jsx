/* eslint-disable react/prop-types */
import Emoji from "../Icons/Emoji"
export default function ErrorSearch({ data }) {
    return data?.error && data?.error?.username === undefined && (
        <div className=' flex flex-col p-2 justify-center items-center flex-1'>
            <h1 className='text-7xl'><Emoji /></h1>
            <p className='text-3xl'>
                <i> {data.error['es']}</i>
            </p>
        </div>
    )
}