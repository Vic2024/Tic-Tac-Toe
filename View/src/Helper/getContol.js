export const getControl = control => {
    // eslint-disable-next-line no-undef
    const isControl = control instanceof HTMLInputElement
    if (!isControl || control == null) return null
    return control
}