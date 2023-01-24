import React, { Component } from "react";

const API_KEY = 'redacted';

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
        return (
            <div>
                Data
                {/* {data} */}
            </div>
        );
    }
}


export default SearchResults