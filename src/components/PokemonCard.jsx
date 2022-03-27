import {Badge, Card, CardActionArea, CardContent, CardMedia, Chip} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {getPokemonTypeColors, typeToColor} from "../utils/pokemonUtils";
import {getLinearGradientFromColors} from "../utils/utils";

const PokemonCard = ({pokemon}) => {
    const [combinedColor, setCombinedColor] = useState(getLinearGradientFromColors(getPokemonTypeColors(pokemon.types)));

    useEffect(() => {
        setCombinedColor(getLinearGradientFromColors(getPokemonTypeColors(pokemon.types)));
    }, [pokemon]);


    return (
        <Card sx={{width: "33vw", minWidth: "300px", height: "auto"}}>
            <CardActionArea
                sx={{display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: combinedColor}}>
                <CardMedia
                    component="img"
                    height="auto"
                    image={pokemon.image}
                    alt={pokemon.name}
                    sx={{maxHeight: "60%", maxWidth: "50%", filter: "brightness(0%)"}}
                />
            </CardActionArea>
            <CardContent>
                <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
                    {pokemon.types.map((type, index) => (
                        <Chip
                            key={index}
                            label={type}
                            sx={{
                                backgroundColor: typeToColor(type),
                                color: "white",
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                                margin: "0.5rem"
                            }}
                        />
                    ))}
                </Box>
                <Box display={"flex"} flexDirection={"column"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Typography component="h1" variant="h3" sx={{fontWeight: "bold",
                        margin: "0.5rem"}}>
                        Who's that Pokemon?
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {pokemon.name}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default PokemonCard;