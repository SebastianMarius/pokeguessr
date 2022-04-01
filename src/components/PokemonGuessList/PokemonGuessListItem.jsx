import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {motion} from "framer-motion";

export default function PokemonGuessListItem({
                                                 pokemon,
                                                 userGuess,
                                                 isCorrect,
                                             }) {
    return (
        <ListItem
            component={motion.div}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 1.05}}
            sx={{
                marginY: 2,
                borderRadius: "10px",
                background: "linear-gradient(0deg, white 50%, rgb(189,55,54) 50%)",
                "&:first-of-type": {
                    marginTop: 0,
                },
            }}
        >
            <ListItemAvatar>
                <Avatar
                    sx={{
                        height: "100px",
                        width: "60px",
                    }}
                    src={pokemon.sprite}
                >
                    <ImageIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                sx={{
                    textAlign: "left",
                    margin: "0 5px 0 10px",
                    height: "100%",
                }}
                primary={
                    <Typography variant="h5" margin={"0 0 20px 0"} fontWeight={"bold"}>
                        {pokemon.name}
                    </Typography>
                }
                secondary={
                    <Typography
                        fontSize={"normal"}
                        margin={" 15px 0 0 0"}
                        fontWeight={"thin"}
                        color={"darkgray"}
                    >
                        You guessed: <i style={{color: "black"}}>{userGuess}</i>
                    </Typography>
                }
            />

            <Box
                sx={{
                    background: "white",
                    border: "none",
                    borderRadius: "100%",
                    display: "flex",
                    marginRight: "15px",
                }}
            >
                {isCorrect ? (
                    <FaCheckCircle size={35} color={"rgb(72,168,104)"}/>
                ) : (
                    <FaTimesCircle size={35} color={"rgb(189,55,54)"}/>
                )}
            </Box>
        </ListItem>
    );
}
