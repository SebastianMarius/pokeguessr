// function that capitalizes first letter of string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


export const getLinearGradientFromColors = (colors) => {
    return `linear-gradient(to right, ${colors})`;
};