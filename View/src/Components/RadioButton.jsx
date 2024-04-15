/* eslint-disable react/prop-types */
export default function RadioButton({ children, name, value }) {
    return (
        <label className='cursor-pointer'>
            <input type="radio" value={value} className='peer sr-only' name={name} />
            <div className='border-2 p-2 flex justify-center items-center text-5xl w-[100px] h-[100px] rounded-[5px] border-primary dark:border-secondary transitin-all hover:shadow-md peer-checked:bg-primary dark:peer-checked:bg-secondary'>
                {children}
            </div>
        </label>
    )
}