export const getColor = (strength) => {
    switch (strength) {
        case 0:
            return "bg-red-500"
        case 1:
            return "bg-red-400"
        case 2:
            return "bg-yellow-500"
        case 3:
            return "bg-yellow-500"
        default: return "bg-green-500"
    }
}