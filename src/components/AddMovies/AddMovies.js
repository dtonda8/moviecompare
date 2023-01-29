import React, { Component } from "react";
import SearchResults from "../elements/SearchResults/SearchResults";
import './AddMovies.css'

class AddMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {formattedInput: ''};
    };

    handleInput = event => {
        const input = event.target.value;
        const formattedInput = input.replace(/ /g, '+');
        if (input.length > 2 || input.length === 0) {
            this.setState({formattedInput: formattedInput});
        }
    };

    render() {
        return (
            <div className="add-movies">
                <div>
                    <input 
                        className = 'SearchBar'
                        placeholder='Movie name...' 
                        onInput={this.handleInput}>
                    </input>
                </div>
                <SearchResults 
                    key={this.state.formattedInput} 
                    input={this.state.formattedInput} 
                    onClickAddMovie={(movieID) => this.props.compareMovie(movieID)}/>
            </div>
        );
    };
};

export default AddMovies