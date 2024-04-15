import Light from "../Icons/Light"
import Moon from "../Icons/Moon"
import { useTheme } from "../Context/SettingsContext"
export default function ThemeSelector() {
    const { theme, setTheme } = useTheme()
    const handleChangeTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light'
            window.localStorage.setItem('savedTheme', newTheme)
            return newTheme
        })
    }
    return (
        <div onClick={handleChangeTheme} className='phone:w-10 phone:h-10 flex justify-center items-center rounded-md p-2 bg-secondary text-primary dark:bg-primary dark:text-secondary cursor-pointer transition-all'>
            {theme === 'dark' ? <Light /> : <Moon />}
        </div>
    )
}