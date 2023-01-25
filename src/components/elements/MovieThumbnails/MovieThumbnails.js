import React, { Component } from 'react';
import './MovieThumbnails.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original'

class MovieThumbnails extends Component {
    render() {
        let results = this.props.results
        const resultsDiv = results.map((result, index) => {
            if (result['poster_path']){
                const poster = BASE_POSTER_URL + result['poster_path'];
                let movieTitle = result['title'] 
                if (!movieTitle) movieTitle = result['name'];
                const altMsg = movieTitle + ' poster';
                return (
                    <div
                        key={index}
                        className='thumbnail'>
                        <img 
                            className='movie-img'
                            src={poster}    
                            alt={altMsg}>
                        </img>
                        {movieTitle}
                    </div>
                )
            }
        });
        return resultsDiv;
    }
};


export default MovieThumbnails