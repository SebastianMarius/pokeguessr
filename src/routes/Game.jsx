import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MdCatchingPokemon } from 'react-icons/md';

const Game = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                width: '100%',
                alignItems: 'center',
            }}>
            <Container component='main' maxWidth='lg'>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <MdCatchingPokemon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Pokemon silhouette goes here
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Game;
