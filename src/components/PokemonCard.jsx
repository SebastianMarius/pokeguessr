import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { getPokemonTypeColors, typeToColor } from "../utils/pokemonUtils";
import { getLinearGradientFromColors } from "../utils/utils";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const ariaLabel = { 'aria-label': 'description' };

// functie dau ca param boolean daca i corect sau nu
const PokemonCard = ({ pokemon, onGuessPokemon }) => {
  const [combinedColor, setCombinedColor] = useState(
    getLinearGradientFromColors(getPokemonTypeColors(pokemon.types))
  );
  const [pokemonName, setPokemonName] = useState();
  const onSubmit = () => {
    onGuessPokemon(pokemonName.toLowerCase() === pokemon.name.toLowerCase());
    setPokemonName("");
  };
  useEffect(() => {
    setCombinedColor(
      getLinearGradientFromColors(getPokemonTypeColors(pokemon.types))
    );
  }, [pokemon]);

  // ToDo: de adaugat un field pentru a ghici numele pokemonului
  return (
    <Card sx={{ width: "33vw", minWidth: "300px", height: "auto", }}>
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: combinedColor,
        }}
      >
        <CardMedia
          component="img"
          height="auto"
          image={pokemon.image}
          alt={pokemon.name}
          sx={{ maxHeight: "60%", maxWidth: "50%", filter: "brightness(0%)" }}
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
            sx={{ fontWeight: "bold", margin: "0.5rem" }}
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
              placeholder="Pokemon name"
              inputProps={ariaLabel}
              sx={{
           
                width: "90%",
                borderColor: typeToColor(pokemon.types[0]),
              }}
              value={pokemonName}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  onSubmit();
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
              bgcolor: typeToColor(pokemon.types[0]),
              borderRadius: "25px",
              padding: "8px 30px 6px 30px",
            }}
            onClick={() => {
              onSubmit();
            }}
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
