import logo from "./logo.jpg";
import "./App.css";
import { Button, Typography } from "@mui/material";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

function App() {

  return (
    <Box
      className="App"
      display={"flex"}
      minHeight={"100vh"}
      minWidth={"100vw"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h3" color={"secondary.dark"}>
          PokeGuessr
        </Typography>
        <Button
          variant="contained"
          endIcon={<FaPlay />}
          component={Link}
          to="/game"
          style={{
            backgroundColor: "rgb(189,55,54)",
            textTransform: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginTop: "1rem",
            width: "20vw",
            minWidth: "200px",
          }}
        >
          Start Quiz
        </Button>
        <Box sx={{ p: 4, m: 4 }}>
          <Typography variant="h5" color={"secondary"}>
            <span style={{ fontWeight: "bold" }}> About </span>
          </Typography>
          <Typography variant="body1" color={"secondary"}>
            This is a simple quiz game that will test your knowledge of the
            <span style={{ fontWeight: "bold" }}> Pokemon </span>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
