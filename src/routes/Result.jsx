import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {FaUndo} from "react-icons/fa";
import logo from "../logo.jpg";
import {Link} from "react-router-dom";
import PokemonGuessList from "../components/PokemonGuessList/PokemonGuessList";
import {LinearProgress} from "@mui/material";

const Result = () => {
    const [showCorrect, setShowCorrect] = useState(false);
    const {score, guessList} = useLocation().state;
    const onlyIncorrectGuesses = guessList.filter((guess) => !guess.isCorrect);
    const navigate = useNavigate();

    const resetScore = () => {
        navigate("/game");
    };

    const toggleShowCorrect = () => {
        setShowCorrect(!showCorrect);
    };

    return (
        <Box sx={styles.container}>
            <Container component="main" maxWidth="lg" margin="auto">
                <Box sx={styles.containerBox}>
                    <Link to="/">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </Link>

                    <Typography variant="h3" style={styles.scoreText}>
                        Your score is: {score}/10
                    </Typography>

                    <Box sx={{width: "50%"}}>
                        <LinearProgress variant="determinate" value={(score / 10) * 100}/>
                    </Box>

                    <Box paddingBottom={"3vh"}>
                        <Button
                            variant="contained"
                            endIcon={<FaUndo/>}
                            component={Link}
                            to="/game"
                            style={styles.restartButton}
                            onClick={resetScore}
                        >
                            Restart Quiz
                        </Button>
                    </Box>

                    {/*<Typography*/}
                    {/*    variant={"h4"}*/}
                    {/*    textAlign={"center"}*/}
                    {/*    marginTop={4}*/}
                    {/*    fontWeight="300"*/}
                    {/*>*/}
                    {/*    Here are your guesses...*/}
                    {/*</Typography>*/}

                    <Button
                        sx={{marginTop: "10px", color: showCorrect ? "green" : "red"}}
                        onClick={toggleShowCorrect}
                    >
                        {showCorrect ? "Show All" : "Show Only Incorrect"}
                    </Button>

                    <PokemonGuessList
                        guessList={showCorrect ? guessList : onlyIncorrectGuesses}
                    />
                </Box>
            </Container>
        </Box>
    );
};

const styles = {
    container: {
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        alignItems: "center",
    },
    containerBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    restartButton: {
        backgroundColor: "rgb(189,55,54)",
        textTransform: "none",
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "1rem",
        width: "20vw",
        minWidth: "200px",
    },
    scoreText: {
        fontWeight: "bold",
        margin: "0.5rem",
        textAlign: "center",
        color: "rgb(55,55,55)",
    },
};

export default Result;
