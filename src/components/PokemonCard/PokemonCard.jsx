import {Card, CardActionArea, CardContent, CardMedia, Chip, CircularProgress} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import {getPokemonTypeColors, typeToColor} from "../../utils/pokemonUtils";
import {getLinearGradientFromColors, pokemonImageVariants} from "../../utils/utils";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {motion} from "framer-motion";
import PokemonCardTitle from "./PokemonCardTitle";
import PokemonNameReveal from "./PokemonNameReveal";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import useSound from "use-sound";
import correctSound from "../../assets/correct_ping.mp3";
// import wrongSound from "../../assets/error_tone.mp3";

const PokemonCard = ({pokemon, onGuessPokemon}) => {
    const pokemonColors = useMemo(() => getPokemonTypeColors(pokemon.types), [pokemon.types]);
    const pokemonGradient = useMemo(() => getLinearGradientFromColors(pokemonColors.join(",")), [pokemonColors]);

    const [pokemonName, setPokemonName] = useState("");
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [image, setImage] = useState({});
    const [isGuessed, setIsGuessed] = useState(false);
    const [cardTitle, setCardTitle] = useState(<PokemonCardTitle/>);
    const [playCorrect] = useSound(correctSound, {volume: 0.1});
    // const [playWrong] = useSound(wrongSound);

    useEffect(() => {
        setIsLoaded(false);
        const img = new Image();
        img.src = pokemon.image;
        img.onload = handleImageLoaded;
        setImage(img);
    }, [pokemon.image]);

    const handleGuess = () => {
        if (pokemonName && !isGuessed) {
            const isCorrect = pokemon.name.toLowerCase() === pokemonName.toLowerCase();
            if (isCorrect)
                playCorrect();
            // else
            //     playWrong();
            setIsGuessed(true);
            setCardTitle(<PokemonNameReveal name={pokemon.name} color={pokemonColors[0]} guess={pokemonName}/>);
            setTimeout(() => {
                onGuessPokemon(isCorrect, pokemonName);
                setPokemonName("");
                setCardTitle(<PokemonCardTitle/>);
                setIsGuessed(false);
                setError(false);
            }, 1000);
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleImageLoaded = () => {
        setIsLoaded(true);
    };

    const motionImage = useCallback(() =>
            <motion.img
                src={image.src}
                alt={pokemon.name}
                style={{maxHeight: "60%", maxWidth: "50%"}}
                initial={"hidden"}
                animate={isGuessed && "visible"}
                variants={pokemonImageVariants}
                transition={{duration: ".4"}}
            />
        , [image.src, isGuessed, pokemon.name]);

    return (
        <Card sx={{width: "28vw", minWidth: "300px", height: "auto"}}>
            <CardActionArea
                sx={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: pokemonGradient,
                }}
            >
                {isGuessed && (
                    <Box
                        position={"absolute"}
                        height={"40px"}
                        width={"40px"}
                        style={{[pokemonName.toLowerCase() === pokemon.name.toLowerCase() ? "right" : "left"]: "15px"}}
                        top={"15px"}
                        backgroundColor={"white"}
                        zIndex={"9999"}
                        borderRadius={"100%"}
                        fontSize={40}
                    >
                        {pokemonName.toLowerCase() === pokemon.name.toLowerCase() ? (
                            <FaCheckCircle color={"rgb(72,168,104)"}/>
                        ) : (
                            <FaTimesCircle color={"rgb(189,55,54)"}/>
                        )}
                    </Box>
                )}
                {isLoaded ? (
                    <CardMedia component={motionImage} height="auto" alt={pokemon.name}/>
                ) : (
                    <Box display="flex" alignItems={"center"} justifyContent="center" minHeight={"200px"}>
                        <CircularProgress style={{color: "black"}}/>
                    </Box>
                )}
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
                <Box display={"flex"} flexDirection={"column"} width={"100%"} justifyContent={"center"}
                     alignItems={"center"}>
                    {cardTitle}
                    <Box width={"100%"} display={"flex"} justifyContent={"center"} margin={"15px 0"}>
                        <Input
                            className="pokemon_input"
                            placeholder={"Enter Pokemon Name..."}
                            error={error}
                            sx={{
                                ...(error && {
                                    ":before": {
                                        borderBottom: "1 solid",
                                        borderColor: "red",
                                        color: "red",
                                    },
                                }),
                                ":after": {
                                    borderBottom: "1 solid",
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
                            "&:hover": {
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
