import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function PokemonList(props) {
  /* const { pokemon, userGuess, isCorrect } = props; */

  return (
    <List sx={{ width: "100%", minWidth: "300px", maxWidth: "40%" }}>
      <ListItem
        sx={{
          borderRadius: "10px",

          background: "linear-gradient(0deg, white 50%, rgb(189,55,54) 50%)",
        }}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              height: "100px",
              width: "60px",
            }}
            src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png"}
          >
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{
            textAlign: "center",
            margin: "0 5px 0 0 ",
            height: "100%",
          }}
          primary={
            <Typography variant="h5" margin={"0 0 20px 0"}>
              {"Pokemon"}
            </Typography>
          }
          secondary={
            <Typography variant="h5" margin={" 20px 0 0 0"}>
              {"Pokemon"}
            </Typography>
          }
        />

        <Box
          color={"black"}
          sx={{
            background: "white",
            borderRadius: "50%",
            border: "1px solid white",
            display: "flex",
            marginRight: "15px",
          }}
        >
          {true ? (
            <FaCheckCircle size={35} color={"rgb(72,168,104)"} />
          ) : (
            <FaTimesCircle size={35} color={"rgb(189,55,54)"} />
          )}
        </Box>
      </ListItem>
    </List>
  );
}
