import React, { useState, useEffect } from 'react';
import './DetailsCompact.css'
import MovieThumbnail from "../MovieThumbnail/MovieThumbnail";
import Ratings from '../Ratings/Ratings';
import { Stack } from '@chakra-ui/react'
import { getMovieDetails } from '../../../utils/api';

const DetailsCompact = ({movieID, handleActors, watchlist, onClickAddMovie}) => {
    const [movieDetails, setMovieDetails] = useState(null);

    useEffect(() => {
        getMovieDetails(movieID)
            .then(data => handleMovieDetails(data))
            .catch(error => {
                console.error('Error fetching movie details:', error);
            });
    }, [movieID])

    const handleMovieDetails = data => {
        if (data && !('success' in data)) { 
            setMovieDetails(data)
            getAgeRating(data.release_dates)
            if (typeof handleActors !== "undefined" && data) { 
                handleActors(data.credits.cast)            
            }
        }
    }

    const getStars = () => {
        const actors = movieDetails.credits.cast;
        if (actors.length === 0) return "Not Found"
        let actorsCopy = actors.slice();
        if (actorsCopy.length > 3) {
            actorsCopy = actorsCopy.slice(0, 3);
        }
        actorsCopy = actorsCopy.map(actor => actor.name)
        return actorsCopy.join(', ')
    }

    const getDirector = () => {
        const director = movieDetails.credits.crew.filter((person)=> person.job ==='Director')
        if (director.length !== 0) return director[0].name
        return "Not Found"
    }

    const getAgeRating = () => {
        if (movieDetails) {
            const results = movieDetails.release_dates.results;
            const AU = results.filter(country => country.iso_3166_1 === 'AU');
            if (AU.length !== 0) return AU[0].release_dates[0].certification
            else {
                const US = results.filter(country => country.iso_3166_1 === 'US');
                if (US.length !== 0)  return US[0].release_dates[0].certification
            }
        }
        return "Not Found"
    }

    const split = n => {
        return n.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g).join(",");
    }

    if (movieDetails && !('success' in movieDetails)) {
        const { title, 
                genres, 
                vote_average, 
                overview, 
                poster_path, 
                budget, 
                revenue,
                release_date,
                runtime, 
                imdb_id} = movieDetails;

        const genresList = [];
        genres.forEach(genre => genresList.push(genre.name))
        const year = release_date.split('-')[0];
        return (
                <div className='key-details'>
                    <MovieThumbnail 
                        poster_path={poster_path}
                        title={title}
                        id={movieID}
                        release_date={release_date}
                        watchlist={watchlist}
                        onClickAddMovie={onClickAddMovie}/>
                    <div className='content'>
                    <Stack>
                        <p className='title'>
                            <strong>
                                {title} <span className='release-date' id={`${movieID}-${year}`}></span>({year})
                            </strong>
                        </p>
                        <div className='age-runtime-container'>
                            <p className='age-rating' fontSize={'6xl'}>
                                <strong>Age Rating: </strong> {getAgeRating()}  
                            </p>
                            <p className='runtime'>
                                <strong> Runtime: </strong> {runtime} min
                            </p>
                        </div>
                        <div className='overview'>{overview}</div>
                        <div className='genres'>
                            <strong>Genres:</strong>
                            {genresList.join(', ')}
                        </div>
                        <Ratings vote_average={vote_average} movieID={movieID} imdbID={imdb_id}/>
                        <div className='director-starring'><strong>Director:</strong> {getDirector()}, <strong>Starring:</strong> {getStars()}</div>
                        <div className='budget-revenue'>
                            <p className='budget' id={`${movieID}-${budget}`}>
                                <strong>Budget: </strong>${split(budget)}
                            </p>
                            <p className='revenue' id={`${movieID}-${revenue}`}>
                                <strong>Revenue: </strong>${split(revenue)}
                            </p>
                        </div>
                    </Stack>
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

export default DetailsCompact
