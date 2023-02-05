import React, { useState } from "react";
import SearchResults from "../elements/SearchResults/SearchResults";
import './AddMovies.css'

const AddMovies = ({ compareMovie, watchlist }) => {
    const [formattedInput, setFormattedInput] = useState('')

    const handleInput = event => {
        let input = event.target.value;
        if (input.length > 2 || input.length === 0) {
            input = input.replace(/ /g, '+');
            setFormattedInput(formattedInput);
        }
    };

    return (
        <div className="add-movies">
            <div>
                <input 
                    className = 'search-bar'
                    placeholder='Movie name...' 
                    onInput={handleInput}>
                </input>
            </div>
            <SearchResults 
                key={formattedInput} 
                input={formattedInput} 
                onClickAddMovie={(movieID) => compareMovie(movieID)}
                watchlist={watchlist}/>
        </div>
    );
};

export default AddMovies