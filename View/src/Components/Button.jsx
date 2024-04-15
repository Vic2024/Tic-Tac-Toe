// eslint-disable-next-line react/prop-types
export default function Button({ id, onClick, responsive, children, type, hidden }) {
    return (
        <button
            id={id}
            type={type}
            className={`border-2 ${responsive ? responsive : ''} mb-2 p-2 flex gap-2 phone:text-sm text-base justify-center items-center font-bold text-center rounded-md bg-secondary dark:bg-primary text-primary dark:text-secondary hover:bg-primary hover:text-secondary dark:hover:bg-secondary dark:hover:text-primary ${hidden ? hidden : ''}  transition-[0.2s] `}
            onClick={onClick}
        >
            {children}
        </button>
    )
}