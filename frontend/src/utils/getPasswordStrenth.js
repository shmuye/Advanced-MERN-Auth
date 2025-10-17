export const getPasswordStrength = (password) => {
    let strength = 0
    if(password.length >= 6) strength++
    if(password.match(/[A-Z]/) && password.match(/[a-z]/)) strength++
    if(password.match(/\d/)) strength++
    if(password.match(/[^A-Za-z0-9]/)) strength++
    return strength
}