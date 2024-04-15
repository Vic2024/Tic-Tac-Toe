/* eslint-disable react/prop-types */
export default function Messages({ message }) {
    return (
        <div className="p-2 flex self-center flex-col justify-center items-center h-full">
            <h1 className='text-4xl phone:text-2xl text-center font-bold dark:text-primary'>{message}</h1>
        </div>
    )
}