type GetColorFromRouterResponse = {
    color: string
    count: number
}

export const getColorFromRouter = (color: string): GetColorFromRouterResponse => {
    switch (color) {
        case 'red':
            return {
                color: 'red',
                count: 10,
            }
            break
        case 'green':
            return {
                color: 'green',
                count: 15,
            }
            break
        case 'yellow':
            return {
                color: 'yellow',
                count: 3,
            }
            break
        default:
            return {
                color: 'green',
                count: 15,
            }
    }
}