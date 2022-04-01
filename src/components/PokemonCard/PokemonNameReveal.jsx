import Typography from "@mui/material/Typography";
import React, {useMemo} from "react";

const createSpans = (word, guess, color) => {
    // create spans for each letter and underline every letter that is correct from the guess
    const spans = [];
    guess = guess.toLowerCase();
    for (let i = 0; i < word.length; i++) {
        const letter = word[i].toLowerCase();
        const isCorrect = guess.includes(letter);
        const span = (
            <span key={i} style={{color: isCorrect ? color : "inherit"}}>
        {word[i]}
      </span>
        );
        spans.push(span);
    }
    return spans;
};

const PokemonNameReveal = ({name, color, guess}) => {
    const spans = useMemo(() => createSpans(name, guess, color), [name]);

    return (
        <Typography
            component="h1"
            variant="h3"
            sx={{fontWeight: "bold", margin: "0.5rem"}}
            textAlign="center"
        >
            It's {spans}!
        </Typography>
    );
};

export default PokemonNameReveal;
