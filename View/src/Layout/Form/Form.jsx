
/* eslint-disable react/prop-types */
export default function Form({ children, width, handleSubmit, dashboard, bg }) {
    return (
        <form onSubmit={handleSubmit} className={`${width ? width : ''} flex flex-col items-center ${dashboard ? 'h-full' : 'border-2 border-secondary dark:border-primary transition-all'} rounded-md p-2 ${bg ? bg : ''}`}>
            {children}
        </form>
    )
}