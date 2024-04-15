/* eslint-disable react/prop-types */

export default function Header({ children }) {
    return (
        <header className='[grid-area:header]'>
            <nav className='flex px-2 justify-between items-center relative'>
                {children}
            </nav>
        </header>
    )
}