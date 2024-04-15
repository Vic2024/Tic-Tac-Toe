const in18 = {
    es: '',
    en: ''
}
export const options = {
    route: '/api/recover_email',
    inputs: ['email'],
    state: {
        error: {
            email: { ...in18 },
            message: { ...in18 }
        },
        success: {
            data: {},
            message: { ...in18 }
        },
        isLoading: false
    }
}