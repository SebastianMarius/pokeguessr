// function that capitalizes first letter of string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


export const getLinearGradientFromColors = (colors) => {
    return `linear-gradient(to right, ${colors})`;
};

export const pokemonImageVariants = {
    visible: {filter: "brightness(100%)"},
    hidden: {filter: "brightness(0%)"},
}

export const blurVariants = {
    clear: {filter: "blur(0px)"},
    blurred: {filter: "blur(10px)"},
}
