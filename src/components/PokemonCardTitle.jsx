import Typography from "@mui/material/Typography";
import React from "react";

const PokemonCardTitle = () => {
    return (
        <Typography
            component="h1"
            variant="h3"
            sx={{fontWeight: "bold", margin: "0.5rem"}}
            textAlign="center"
        >
            Who's that Pokemon?
        </Typography>
    )
}

export default PokemonCardTitle;
