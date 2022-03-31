import React from "react";
import List from "@mui/material/List";
import PokemonGuessListItem from "./PokemonGuessListItem";

const PokemonGuessList = ({guessList}) => {
    return (
        <List sx={{width: "100%", minWidth: "300px", maxWidth: "40%"}}>
            {
                guessList.map((guess, index) => <PokemonGuessListItem key={index} pokemon={guess.pokemon}
                                                                  userGuess={guess.userGuess}
                                                                  isCorrect={guess.isCorrect}/>)
            }
        </List>
    )
}

export default PokemonGuessList;