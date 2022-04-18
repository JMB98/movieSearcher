import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home";

export const IMDB_URL_WITH_API_KEY = "http://www.omdbapi.com/?apikey=8ea39b15";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </div>
    );
}

export default App;
