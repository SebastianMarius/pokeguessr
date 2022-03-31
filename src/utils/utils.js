/**
 * Function that capitalizes first letter of string
 * @param string - string to capitalize (lowercasing rest)
 * @returns {string} - capitalized string (lowercased rest)
 */
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * @description Function that returns a css value for linear-gradient to right given the colors
 * @param colors - array of colors
 * @returns {`linear-gradient(to right, ${string})`} - css value for linear-gradient
 */
export const getLinearGradientFromColors = (colors) => {
    return `linear-gradient(to right, ${colors})`;
};

/**
 * @description Function that gets a number of random unique elements from a given array
 * @param array - array to get random elements from
 * @param count - number of random elements to get
 * @returns {*[]} - array of random elements
 */
export const getRandomUniqueElements = (array, count) => {
    let randomElements = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        if (randomElements.includes(array[randomIndex])) {
            i--;
        } else {
            randomElements.push(array[randomIndex]);
        }
    }
    return randomElements;
};

export const pokemonImageVariants = {
    visible: {filter: "brightness(100%)"},
    hidden: {filter: "brightness(0%)"},
}

export const blurVariants = {
    clear: {filter: "blur(0px)"},
    blurred: {filter: "blur(10px)"},
}
