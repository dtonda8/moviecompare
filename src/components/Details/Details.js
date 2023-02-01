import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css'

const API_KEY = 'redacted';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

const Details = () => {
    const { movieID } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => setData(data));
    })

    if (data && !('success' in data)) {
        const { vote_average, overview, poster_path } = data;
        return (
            <div className='full-details'>
                <img
                    className='details-image'
                    src={BASE_POSTER_URL + poster_path}
                    alt='Movie Poster'>
                </img>
                <div className='content'>
                    {overview}
                    <div>
                        Rating:{vote_average}
                        <div><progress max='10' value={vote_average}></progress></div>
                    </div>
                </div>;
            </div> 
        );
    }
    return (
        <div className='full-details'>
            Loading...
        </div>
    );
}

export default Details

