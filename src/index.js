import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Game from "./routes/Game";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./config/theme";
import Result from './routes/Result';

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="game" element={<Game/>}/>
                    <Route path="result" element={<Result/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
