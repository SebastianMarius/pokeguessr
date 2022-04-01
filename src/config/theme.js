import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        background: {
            default: "#e5e5e5",
            paper: "#fff",
        },
        primary: {
            main: "#F05454",
        },
        secondary: {
            main: "#121c26",
            dark: "#121212"
        },
    },
});

export default theme;