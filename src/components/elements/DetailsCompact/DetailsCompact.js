import React, { Component, useState, useEffect } from 'react';
import './DetailsCompact.css'

const TMDB_API_KEY = 'redacted';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

class DetailsCompact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: null}
    }

    async componentDidMount() {
        fetch(`https://api.themoviedb.org/3/movie/${this.props.movieID}?api_key=${TMDB_API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => this.setState({results: data}));
    }

    render() {
        const results = this.state.results;
        let detailsDiv;
        if (results) {
            const { title, vote_average, overview, poster_path, release_date, revenue, budget } = results;
            const movieID = this.props.movieID;
            const year = release_date.split('-')[0];
            detailsDiv= <div id={movieID} className='content'>
                                <div className='image-container'>
                                    <img
                                        className='image-compare'
                                        src={BASE_POSTER_URL + poster_path}
                                        alt='Movie Poster'>
                                    </img>
                                </div>
                                <div className='main-details'>
                                    <p className='title'>
                                        <strong>
                                            {title} <span className='release-date' id={`${movieID}-${year}`}></span>({year})
                                        </strong>
                                    </p>
                                    <p className='age-runtime'>Age rating and runtime</p>
                                    <p className='overview'>{overview}</p>
                                    <p className='director-stars'>Director: Starred:</p>
                                    <p className='budget' id={`${movieID}-${budget}`}>
                                        Budget:${budget}
                                    </p>
                                    <p className='revenue' id={`${movieID}-${revenue}`}>
                                        Revenue:${revenue}
                                    </p>

                                </div>
                                <div className='vote_average' id={`${movieID}-${vote_average}`} >TMDB:{vote_average}</div>
                        </div>;
        } else {
            detailsDiv = <div>Loading...</div>;
        }

        return (
            <div className='full-details'>
                {detailsDiv}
            </div>
        );
    }
}


export default DetailsCompact;

