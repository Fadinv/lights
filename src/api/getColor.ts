type GetColorResponse = {
    color: string
    count: number
}

export const getColor = (color: string, prevColor: string): GetColorResponse => {
    switch (color) {
        case 'red':
            return {
                color: 'yellow',
                count: 3,
            }
            break
        case 'green':
            return {
                color: 'yellow',
                count: 3,
            }
            break
        case 'yellow':
            return {
                color: prevColor === 'red' ? 'green' : 'red',
                count: prevColor === 'red' ? 15 : 10,
            }
            break
        default:
            return {
                color: 'green',
                count: 15,
            }
    }
}