import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        background: {
            default: "#f5f5f5",
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