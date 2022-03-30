import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import { FaCheck } from "react-icons/fa";
import Box from "@mui/material/Box";

export default function PokemonList() {
  return (
    <List sx={{ width: "100%", minWidth: "300px", maxWidth: "40%" }}>
      <ListItem
        sx={{
          background: "linear-gradient(0deg, white 50%, rgb(189,55,54) 50%)",
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <ImageIcon img={"Pikachu"} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Pikachu"} secondary={"pica"} />

        <Box
          sx={{
            backgroundColor: "rgb(55,55,55)",
            color: "white",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
          }}
        >
          <FaCheck />
        </Box>
      </ListItem>
    </List>
  );
}
