import { useEffect, useState } from "react"
export default function useResponsive() {
    const [isResponsive, setIsResponsive] = useState(() => {
        return document.body.clientWidth < 930 ? true : false
    })
    useEffect(() => {
        const widthResponsive = () => {
            if (document.body.clientWidth < 930) {
                setIsResponsive(true)
            } else {
                setIsResponsive(false)
            }
        }
        window.addEventListener('resize', widthResponsive)
        return () => window.removeEventListener('resize', widthResponsive)
    }, [isResponsive])

    return { isResponsive }
}