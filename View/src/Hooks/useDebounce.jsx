import { useEffect, useState } from "react";

const useDebounce = (value, route, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        const id = setTimeout(() => {
            if(value.length === 0){
                setDebouncedValue(route.split('?')[0])
            }else{
                setDebouncedValue(`${route + value}`)
            }
        }, delay)

        return () => {
            clearTimeout(id)
        }
    }, [value, delay, route])

    return debouncedValue
}

export default useDebounce