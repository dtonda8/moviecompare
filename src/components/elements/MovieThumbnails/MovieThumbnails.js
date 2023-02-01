import React from 'react';
import { Link } from "react-router-dom";
import './MovieThumbnails.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

const MovieThumbnails = (props) => {
    return (props.results.map((result, index) => {
        const { poster_path, title, id, release_date } = result;
        if (poster_path && title && release_date) {
            return (
                <div
                    key={index}
                    className='thumbnail'>
                    <img 
                        className='movie-img'
                        src={BASE_POSTER_URL + poster_path}    
                        alt={'Movie poster'}>
                    </img>
                        <button 
                            className='add-to-compare'
                            onClick={() => this.props.onClickAddMovie(id)}>
                                Add to Compare
                        </button>
                        <Link to={'/' + id}>
                            <button className='details'>
                                Details
                            </button>
                        </Link>
                </div>
            );
        }
    }))
}


export default MovieThumbnails;