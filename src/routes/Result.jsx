import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { FaUndo } from "react-icons/fa";
import logo from "../logo.jpg";
import { Link } from "react-router-dom";
import PokemonList from "../components/PokemonList";

const Result = () => {
  const [searchParams] = useSearchParams({});
  const score = searchParams.get("score");
  const navigate = useNavigate();
  const resetScore = () => {
    navigate({
      pathname: "/game",
    });
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
      <Container component="main" maxWidth="lg" margin="auto">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>

          <Typography
            component="h1"
            variant="h3"
            sx={{ fontWeight: "bold", margin: "0.5rem" }}
            textAlign="center"
            color="rgb(55,55,55)"
          >
            Your score is: {score}
          </Typography>

          <PokemonList />

          <Button
            variant="contained"
            endIcon={<FaUndo />}
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
            onClick={() => {
              resetScore();
            }}
          >
            Restart Quiz
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Result;
