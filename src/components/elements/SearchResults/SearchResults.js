import React, { Component } from "react";
import MovieThumbnails from "../MovieThumbnails/MovieThumbnails";
import './SearchResults.css'

const API_KEY = 'aeeb8aeb2b7826a4b59ceeec928a37ec';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            query: this.props.input
        };
    }

    async componentDidMount() {
        if (this.state.query.length < 3) {
            fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(resJSON => this.setState({ data: resJSON}))
        } else {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${this.state.query}`)
                .then(res => res.json())
                .then(resJSON => this.setState({ data: resJSON}))
        }
    }

    render() {
        let data = this.state.data;
        let resultsDiv;
        
        if (data) {
            let results = this.state.data['results'];
            resultsDiv =  <MovieThumbnails 
                            results={results} 
                            onClickAddMovie={(movieID) => this.props.onClickAddMovie(movieID)}/>
        } else {
            resultsDiv = <p>Loading...</p>
        }
        
        return (
            <div
                className="results-div">
                {resultsDiv}
            </div>
        );
    }
}


export default SearchResults