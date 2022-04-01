import * as React from "react";
import {useNavigate} from "react-router-dom"
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import {capitalizeFirstLetter, getRandomUniqueElements} from "../utils/utils";
import {Typography} from "@mui/material";

const Game = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonIndex, setPokemonIndex] = useState(null);
    const [guessList, setGuessList] = useState([]);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    /**
     * @description Function that fetches a given number of pokemon from the given offset
     * @param count - number of pokemon to fetch
     * @param offset - offset to start fetching from
     * @returns {Promise<any>} - promise that resolves to the pokemon list
     */
    const fetchPokemonList = async (count, offset) => {
        const a = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${offset}`
        );

        return await a.json();
    };


    useEffect(() => {
        // fetch 151 pokemon from offset 0 on mount
        fetchPokemonList(151, 0)
            .then((r) => {
                // get 10 random pokemon
                const pokemonList = getRandomUniqueElements(r.results, 10);

                // add a promise fetch for each pokemon to an array of promises then do promise.all to get all pokemon
                const pokemonPromises = pokemonList.map((pokemon) => {
                    return fetch(pokemon.url)
                        .then((r) => r.json())
                        .then((r) => {
                            return {
                                name: capitalizeFirstLetter(r.name),
                                image: r.sprites.other["official-artwork"].front_default,
                                sprite: r.sprites.front_default,
                                id: r.id,
                                description: r.description,
                                types: r.types.map((t) => t.type.name),
                            };
                        });
                });

                // set pokemonList to the array of pokemon objects
                Promise.all(pokemonPromises).then((r) => {
                    setPokemonList(r);
                });

                setPokemonIndex(0);
            })
            .catch((e) => console.error(e));
    }, []);

    /**
     * Function that handles the guess of a pokemon by the user and updates the state
     * @param isCorrect - boolean, true if the guess was correct, false otherwise
     * @param userGuess - string, the guess made by the user
     */
    const onGuessPokemon = (isCorrect, userGuess) => {
        const newGuessList = [...guessList, {
            isCorrect: isCorrect,
            userGuess: userGuess,
            pokemon: pokemonList[pokemonIndex]
        }];

        // handle finished game
        if (pokemonIndex === pokemonList.length - 1) {
            navigate("/result", {
                state: {
                    score: isCorrect ? score + 1 : score,
                    guessList: newGuessList,
                },
            });
        }

        // update game state with new guess
        setGuessList(newGuessList);
        setPokemonIndex(pokemonIndex + 1);
        if (isCorrect)
            setScore(score + 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                width: "100%",
                alignItems: "center",
            }}
        >
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5" align={"center"}>

                    </Typography>
                    {pokemonList[pokemonIndex] &&
                    <PokemonCard pokemon={pokemonList[pokemonIndex]} onGuessPokemon={onGuessPokemon}/>}
                </Box>
            </Container>
        </Box>
    );
};

export default Game;
