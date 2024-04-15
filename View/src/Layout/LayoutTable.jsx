/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function LayoutTable({ children }) {
    return (
        <div className='h-3/6 p-2 flex flex-col overflow-hidden'>
            {children}
        </div>
    )
}