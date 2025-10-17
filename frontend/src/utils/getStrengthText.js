export const getStrengthText = (strength) => {
    switch (strength) {
        case 0:
            return "Very Weak"
        case 1:
            return "Weak"
        case 2:
            return "Fair"
        case 3:
            return "Good"
        default: return "Strong"
    }
}