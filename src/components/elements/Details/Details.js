import React, { Component, useState, useEffect } from 'react';
import './Details.css'

const API_KEY = 'redacted';

class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: null}
    }

    async componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => this.setState({results: data}));
    }

    render() {
        let results = this.state.results;
        let detailsDiv;
        if (results) {
            const { vote_average, overview } = results;
            detailsDiv =<div className='content'>
                            {overview}
                            <div>
                                Rating:{vote_average}
                                <div><progress max='10' value={vote_average}></progress></div>
                            </div>
                        </div>;
        } else {
            detailsDiv = <div>Loading...</div>;
        }

        return (
            <div className='full-details'>
                <img 
                    src={this.props.poster}
                    alt='Movie Poster'>

                </img>
                {detailsDiv}
            </div>
        );
    }
}


// function Details({movieID, poster_path}) {
//     const [results, setResults] = useState([])

//     const getResults = async () => {
//         const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`);
//         setResults(await response.json());
//     }

//     useEffect(() => {
//         getResults()
//     }, [])

//     return (
//         <div>{results['vote_average']}</div>
//     )
// }


export default Details

