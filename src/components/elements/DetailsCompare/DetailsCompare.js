import React, { Component, useState, useEffect } from 'react';
import './DetailsCompare.css'

const TMDB_API_KEY = 'redacted';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

class DetailsCompare extends Component {
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
            
            const filmHeader = ` ${title} (${release_date.split('-')[0]})`;
            detailsDiv= <div className='content'>
                                <div className='image-container'>
                                    <img
                                        src={BASE_POSTER_URL + poster_path}
                                        alt='Movie Poster'>
                                    </img>
                                </div>
                                <div className='main-details'>
                                    <p className='title'><strong>{filmHeader}</strong></p>
                                    <p className='age-runtime'>Age rating and runtime</p>
                                    <p className='overview'>{overview}</p>
                                    <p className='director'>Director</p>
                                    <p className='stars'>starred:</p>
                                    <p className='budget-revenue'>Budget and Revenue bar</p>
                                </div>
                                <div className='ratings'>TMDB:{vote_average}</div>
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


export default DetailsCompare

