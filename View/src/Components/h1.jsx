/* eslint-disable react/prop-types */
export default function H1({ children, className }) {
    return <h1 className={` break-all text-center p-2 font-bold phone:text-2xl text-4xl text-secondary dark:text-primary transition-all ${className}`}>{children}</h1>
}