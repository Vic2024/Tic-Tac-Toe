/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import Return from '../Icons/Return'
export default function LinkReturn({ path, position }) {
    return (
        <Link
            to={path}
            className={`${position ? position : ''} border-2 p-2 phone:size-10 flex justify-center items-center text-center rounded-full border-secondary dark:border-primary text-secondary dark:text-primary transition-all`}
        >
            <Return />
        </Link>)
}