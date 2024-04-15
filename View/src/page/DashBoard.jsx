/* eslint-disable react/prop-types */

import Footer from "../Components/Footer"
import Aside from "../Components/Aside/Aside"
import { Outlet } from "react-router-dom"
export default function DashBoard() {
    return (
        <div className='dashboard bg-primary dark:bg-secondary'>
            <Aside />
            <main className='[grid-area:main] p-1 rounded-md border-2 layout:border-none bg-primary dark:bg-secondary text-secondary dark:text-primary'>
                <Outlet />
            </main>
            <Footer dashBoard />
        </div>
    )
}