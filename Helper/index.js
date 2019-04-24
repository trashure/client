
export const ConvertCoordinate = (object) => {
    console.log(object, "====");
    try {
        
        let data = object.split(':')
        let result = {}
        result.latitude = Number(data[0])
        result.longitude = Number(data[1])
        console.log(result);
        
        return result
    } catch (error) {
        console.log(error, "===INI ERROR");
        
    }


}

// export const ConvertToImage = (input) => {
//     console.log(input);

//     switch (input) {
//         case 'metal':
//             return 'blue'
//         case 'plastic':
//             return 'red'
//         case 'paper':
//             return 'black'
//         case 'cardboard':
//             return 'yellow'
//         case 'glass' :
//             return 'green'
//         default:
//             break;
//     }
// } 