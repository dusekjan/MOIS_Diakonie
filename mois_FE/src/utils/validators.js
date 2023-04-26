
export function isEmailValid(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function isPasswordValid(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
}
