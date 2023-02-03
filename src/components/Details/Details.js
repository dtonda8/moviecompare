import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Actors from '../elements/Actors/Actors';
import Trailer from '../elements/Trailer/Trailer';
import './Details.css'

const API_KEY = 'redacted';
const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original';

const Details = () => {
    const { movieID } = useParams();
    const [movieDetails, setMovieDetails] = useState();
    const [actors, setActors] = useState(null);
    const [director, setDirector] = useState('Not Found')
    const [ageRating, setAgeRating] = useState('Not Rated')

    const handleMovieDetails = data => {
        if (data && !('success' in data)) {
            setMovieDetails(data)
            getPeople(data.credits)
            getAgeRating(data.release_dates)
        }
    }

    const getPeople = data => {
        const cast = data.cast;
        const crew = data.crew;
        if (cast.length !== 0) setActors(cast)
        if (crew.length !== 0) {
            const director = crew.filter((person)=> person.job ==='Director')
            if (director.length !== 0) setDirector(director[0].name)
        } 
    }

    const getAgeRating = release_dates => {
        const results = release_dates.results;
        if (results) {
            const AU = results.filter(country => country.iso_3166_1 === 'AU');
            if (AU.length !== 0) setAgeRating(AU[0].release_dates[0].certification)
            else {
                const US = results.filter(country => country.iso_3166_1 === 'US');
                if (US.length !== 0) setAgeRating(US[0].release_dates[0].certification)
            }
        }
    }

    const split = n => {
        return n.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g).join(",");
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US&append_to_response=credits,release_dates`)
            .then(response => response.json())
            .then(data => handleMovieDetails(data));
    })

    if (movieDetails && !('success' in movieDetails)) {
        const { title, 
                genres, 
                vote_average, 
                overview, 
                poster_path, 
                budget, 
                revenue,
                release_date,
                runtime } = movieDetails;

        const genresList = [];
        genres.forEach(genre => genresList.push(genre.name))
        return (
            <div className='full-details'>
                <div className='key-details'>
                    <img
                        className='details-image'
                        src={BASE_POSTER_URL + poster_path}
                        alt='Movie Poster'>
                    </img>
                    <div className='content'>
                        <h3 className='title'>{title} ({release_date.split('-')[0]})</h3>
                        <div className='overview'><h4>Plot:</h4>{overview}</div>
                        <div className='genres'>
                            <h4>Genres:</h4>
                            {genresList.join(', ')}
                        </div>
                        <div className='rating'>
                            <h4>Rating:</h4>{vote_average}
                            <div><progress max='10' value={vote_average}></progress></div>
                        </div>
                        <div className='director'><h4>Director:</h4> {director}</div>
                    </div>
                </div>
                <div className='budget-revenue-bar'>
                    Revenue: ${split(revenue)} Budget: ${split(budget)} Runtime: {runtime} min, Age Rating: {ageRating}
                </div>
                <h2>Trailer</h2>
                <div className='video-container' id={movieID + '-video'} >
                    <Trailer movieID={movieID} />
                </div>
                <h2>Cast</h2>
                <div className='actors'>
                    <Actors actors={actors}/>
                </div>
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

