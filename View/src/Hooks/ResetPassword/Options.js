const in18 = {
    es: '',
    en: ''
}
export const options = {
    route: '/api/reset_password/',
    inputs: ['password', 'confirmPassword'],
    authorization: true,
    state: {
        error: {
            password: { ...in18 },
            message: { ...in18 }
        },
        success: {
            data: {},
            message: { ...in18 }
        },
        isLoading: false
    }
}