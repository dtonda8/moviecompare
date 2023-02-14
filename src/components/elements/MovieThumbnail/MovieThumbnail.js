import React from 'react';
import { Link } from "react-router-dom";
import './MovieThumbnail.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

const MovieThumbnail = ({ poster_path, title, id, release_date, watchlist, onClickAddMovie }) => {
    const getAddWatchlistMsg = (id) => {
            return watchlist.includes(id)
            ? 'Remove from Watchlist' 
            : 'Add to Watchlist'
    }

    if (!(poster_path && title && release_date)) return
    return (
        <div className='thumbnail'>
            <img 
                className='movie-img'
                src={BASE_POSTER_URL + poster_path}    
                alt={'Movie poster'}>
            </img>
                <button 
                    className='add-to-watchlist'
                    id = {'add-' + id}
                    onClick={() => onClickAddMovie(id)}>
                    {getAddWatchlistMsg(id)}
                </button>
                
                <Link to={'/' + id}>
                    <button className='details'>
                        Details
                    </button>
                </Link>
        </div>
    );
}

export default MovieThumbnail;