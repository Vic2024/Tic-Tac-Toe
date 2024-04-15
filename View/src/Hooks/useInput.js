import { useRef } from "react"
export default function useInput() {
    const ref = useRef()
    const showPassword = () => {
        const input = ref.current.childNodes[1].firstChild
        const icon = ref.current.childNodes[0].childNodes[1]
        if (input.type === 'password') {
            input.type = 'text'
            icon.childNodes[0].classList.add('hidden')
            icon.childNodes[1].classList.remove('hidden')
        } else {
            input.type = 'password'
            icon.childNodes[0].classList.remove('hidden')
            icon.childNodes[1].classList.add('hidden')
        }
    }


    return { ref, showPassword }
}