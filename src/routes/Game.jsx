import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { capitalizeFirstLetter } from "../utils/utils";
import { Typography } from "@mui/material";

const Game = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [score, setScore] = useState(0);

  // function that fetches a given number of pokemon from the given offset
  const fetchPokemonList = async (count, offset) => {
    const a = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=${offset}`
    );
    return await a.json();
  };

  // log pokemonList on change
  useEffect(() => {
    console.log("pokemonList: ", pokemonList);
    setCurrentPokemon(pokemonList[0]);
  }, [pokemonList]);

  // function that gets a number of random unique elements from a given array
  const getRandomPokemon = (array, count) => {
    let randomPokemon = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * array.length);
      if (randomPokemon.includes(array[randomIndex])) {
        i--;
      } else {
        randomPokemon.push(array[randomIndex]);
      }
    }
    return randomPokemon;
  };

  useEffect(() => {
    // fetch 151 pokemon from offset 0 on mount
    fetchPokemonList(151, 0)
      .then((r) => {
        // get 10 random pokemon
        const pokemonList = getRandomPokemon(r.results, 10);

        // add a promise fetch for each pokemon to an array of promises then do promise.all to get all pokemon
        const pokemonPromises = pokemonList.map((pokemon) => {
          return fetch(pokemon.url)
            .then((r) => r.json())
            .then((r) => {
              return {
                name: capitalizeFirstLetter(r.name),
                image: r.sprites.other["official-artwork"].front_default,
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
      })
      .catch((e) => console.error(e));
  }, []);

  const onGuessPokemon = (isCorect) => {
   if (isCorect){
       setScore(score+1);
   }
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
          onClick={() => {
            // for debugging purposes: clicking anywhere on the screen will change the current pokemon
            const randomIndex = Math.floor(Math.random() * pokemonList.length);
            setCurrentPokemon(pokemonList[randomIndex]);
          }}
        >
          <Typography variant="h5" align={"center"}>
            Left Click on this Box to change the Pokemon
          </Typography>
          {currentPokemon && <PokemonCard pokemon={currentPokemon} onGuessPokemon={onGuessPokemon}/>}
        </Box>
      </Container>
    </Box>
  );
};

export default Game;
