
export const ConvertCoordinate = (object) => {
    // console.log(object, "====");

    let data = JSON.parse(object)
    let result = {}
    result.latitude = Number(data.latitude)
    result.longitude = Number(data.longitude)
    // console.log(result, "======DATA")
    return result

}

export const ConvertToImage = (input) => {
    console.log(input);

    switch (input) {
        case 'metal':
            return 'blue'
        case 'plastic':
            return 'red'
        case 'paper':
            return 'black'
        case 'cardboard':
            return 'yellow'
        case 'glass' :
            return 'green'
        default:
            break;
    }
} 