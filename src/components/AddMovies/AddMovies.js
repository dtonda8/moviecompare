import React, { Component } from "react";
import SearchResults from "../elements/SearchResults/SearchResults";

class AddMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formattedInput: ''
        };
    };

    handleInput = event => {
        const input = event.target.value;
        const formattedInput = input.replace(/ /g, '+');
        if (input.length > 2 || input.length == 0) {
            this.setState({formattedInput: formattedInput});
        }
    };

    render() {
        return (
            <div>
                <div>
                    <input 
                        className = 'SearchBar'
                        placeholder='Movie name...' 
                        onInput={this.handleInput}>
                    </input>
                </div>
                <SearchResults key={this.state.formattedInput} input={this.state.formattedInput}/>
            </div>

        );
    };
};

export default AddMovies