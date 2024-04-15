const in18 = {
    es: '',
    en: ''
}
export const options = {
    route: '/api/user/',
    inputs: ['name','lastname','username', 'password','email'],
    state: {
        error: {
            name: { ...in18 },
            lastname: { ...in18 },
            username: { ...in18 },
            password: { ...in18 },
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