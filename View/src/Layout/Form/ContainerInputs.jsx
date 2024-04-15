/* eslint-disable react/prop-types */
export default function ContainerInputs({ children, width, margin }) {
    return (
        <div className={`${width ? width : ''} ${margin ? margin : ''} flex flex-row layout:flex-col gap-2 phone:gap-6`}>
            {children}
        </div>
    )
}