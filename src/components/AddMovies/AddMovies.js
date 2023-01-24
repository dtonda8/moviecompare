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
        let input = event.target.value;
        let formattedInput = input.replace(/ /g, '+');
        console.log(event.target.value)
        this.setState({formattedInput: formattedInput});
    };

    render() {
        return (
            <div>
                <input 
                    className = 'SearchBar'
                    placeholder='Movie/TV Show...' 
                    onInput={this.handleInput}>
                </input>
                <SearchResults key={this.state.formattedInput} input={this.state.formattedInput}/>
            </div>

        );
    };
};

export default AddMovies