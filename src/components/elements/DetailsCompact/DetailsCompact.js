import React, { useState, useEffect } from 'react';
import './DetailsCompact.css'

const TMDB_API_KEY = 'redacted';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

const DetailsCompact = ({ movieID }) => {
    const [results, setResults] = useState(null)
    const [ageRating, setAgeRating] = useState('Not Rated')

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=release_dates`)
            .then(response => response.json())
            .then(data => handleResults(data));
    })

    const handleResults = data => {
        if (data) {
            setResults(data)
            getAgeRating(data.release_dates)
        }
    }

    const getAgeRating = release_dates => {
        const results = release_dates.results;
        if (results) {
            const AU = results.filter(country => country.iso_3166_1 === 'AU');
            if (AU) setAgeRating(AU[0].release_dates[0].certification)
            else setAgeRating(results[0].release_dates[0].certification)
        }
    }

    const split = n => {
        return n.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g).join(",");
    }

    let detailsDiv;
    if (!results) {
        return (
            <div className='movie-details'>
                {detailsDiv}
            </div>
        );
    }
    
    const { title, vote_average, overview, poster_path, release_date, revenue, budget, runtime } = results;
    const year = release_date.split('-')[0];
    return (
        <div className='movie-details'>
            <div id={movieID} className='compare-content'>
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
                            <p className='age-runtime'>
                                <strong>Age Rating: </strong> {ageRating}  
                                <strong> Runtime: </strong> {runtime} min
                            </p>
                            <p className='overview'>{overview}</p>
                            <div className='budget-revenue'>
                                <p className='budget' id={`${movieID}-${budget}`}>
                                    <strong>Budget: </strong>${split(budget)}
                                </p>
                                <p className='revenue' id={`${movieID}-${revenue}`}>
                                    <strong>Revenue: </strong>${split(revenue)}
                                </p>
                            </div>
                            <div className='vote_average' id={`${movieID}-${vote_average}`} >TMDB:{vote_average}</div>
                        </div>
                </div>
        </div>
    );
}


export default DetailsCompact;

