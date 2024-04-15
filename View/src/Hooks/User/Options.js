const in18 = {
    es: '',
    en: ''
}
export const options = {
    route: 'https://tic-tac-toe-rpl1.onrender.com/api/login',
    inputs: ['username', 'password'],
    state: {
        error: {
            username: { ...in18 },
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