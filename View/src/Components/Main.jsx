/* eslint-disable react/prop-types */
export default function Main({ children }) {
    return (
        <main className='[grid-area:main] flex justify-center p-2 '>
            { children }
        </main>
    )
}