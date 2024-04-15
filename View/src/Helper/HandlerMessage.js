export default function HandlerMessage({ prevData, message }) {
    if (prevData.length < 3) {
        return [...prevData, { ...message }]
    } else {
        return [{ ...message }, ...prevData.filter((_, index) => index !== 2)]
    }
}