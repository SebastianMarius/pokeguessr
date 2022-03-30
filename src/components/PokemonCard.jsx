import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip, CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {getPokemonTypeColors, typeToColor} from "../utils/pokemonUtils";
import {getLinearGradientFromColors} from "../utils/utils";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { motion } from "framer-motion"

const ariaLabel = {'aria-label': 'description'};

// functie dau ca param boolean daca i corect sau nu
const PokemonCard = ({pokemon, onGuessPokemon}) => {
    const pokemonColors = useMemo(() => getPokemonTypeColors(pokemon.types), [pokemon.types]);
    const pokemonGradient = useMemo(() => {
        return getLinearGradientFromColors(pokemonColors.join(','));
    }, [pokemonColors]);

    const [pokemonName, setPokemonName] = useState("");
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [image, setImage] = useState({});

    useEffect(() => {
        setIsLoaded(false);
        const img = new Image();
        img.src = pokemon.image;
        img.onload = handleImageLoaded;
        setImage(img);
    }, [pokemon.image]);

    const handleGuess = () => {
        if (pokemonName) {
            onGuessPokemon(pokemonName.toLowerCase() === pokemon.name.toLowerCase());
            setPokemonName("");
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleImageLoaded = () => {
        // make this happen after 2 seconds
        setIsLoaded(true);
    };

    // ToDo: de adaugat un field pentru a ghici numele pokemonului
    return (
        <Card sx={{width: "28vw", minWidth: "300px", height: "auto",}}>
            <CardActionArea
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: pokemonGradient,
                }}
            >
                {isLoaded ?
                    <CardMedia
                        component="img"
                        height="auto"
                        image={image.src}
                        alt={pokemon.name}
                        sx={{maxHeight: "60%", maxWidth: "50%", filter: "brightness(0%)"}}
                        animate={{filter: "brightness(100%)"}}
                    />
                    :
                    <Box display="flex" alignItems={"center"} justifyContent="center" minHeight={"200px"}>
                        <CircularProgress style={{color: "black"}}/>
                    </Box>
                }
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
                                margin: "0.5rem",
                            }}
                        />
                    ))}
                </Box>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                    width={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Typography
                        component="h1"
                        variant="h3"
                        sx={{fontWeight: "bold", margin: "0.5rem"}}
                        textAlign="center"
                    >
                        Who's that Pokemon?
                    </Typography>
                    <Box
                        width={"100%"}
                        display={"flex"}
                        justifyContent={"center"}
                        margin={"15px 0"}
                    >
                        <Input
                            className="pokemon_input"
                            inputProps={ariaLabel}
                            placeholder={"Enter the name of the Pokemon"}
                            error={error}
                            sx={{
                                ...(error && {
                                    ':before': {
                                        borderBottom: '1 solid',
                                        borderColor: 'red',
                                        color: 'red',
                                    },
                                }),
                                ':after': {
                                    borderBottom: '1 solid',
                                    borderColor: pokemonColors[0],
                                },
                                width: 250,
                                borderColor: pokemonColors[0],
                            }}
                            value={pokemonName}
                            onKeyDown={(e) => {
                                if (e.code === "Enter") {
                                    handleGuess();
                                }
                            }}
                            onChange={(e) => {
                                setPokemonName(e.target.value);
                            }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            '&:hover': {
                                backgroundColor: pokemonColors[1],
                            },
                            backgroundColor: pokemonColors[0],
                            borderRadius: "25px",
                            padding: "8px 30px 6px 30px",
                        }}
                        onClick={handleGuess}
                    >
                        Guess
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

PokemonCard.propTypes = {
    pokemon: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(PropTypes.string),
    }),
};


export default PokemonCard;

