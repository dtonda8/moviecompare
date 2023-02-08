import React, { useEffect, useState } from 'react';
import { ReactComponent as Imdb } from '../RatingSymbols/imdb.svg';
import { ReactComponent as Metacritic } from '../RatingSymbols/metacritic.svg';
import { ReactComponent as RottenTomatoes } from '../RatingSymbols/rotten_tomatoes.svg';
import { ReactComponent as Tmdb } from '../RatingSymbols/tmdb.svg';
import './Ratings.css'

const OMDB_KEY = 'redacted';

const Ratings = ({ movieID, imdbID, vote_average }) => {
    const [ratings, setRating] = useState(null)
    const [average, setAverage] = useState(vote_average)
    
    useEffect(() => {
        if (!imdbID) return
        fetch(`https://www.omdbapi.com?i=${imdbID}&apikey=${OMDB_KEY}`)
            .then(res => res.json())
            .then(data => handleData(data))
    }, [])

    const handleData = data => {
        if (data.Response === 'False') return
        const { Ratings } = data;
        const ratingsTemp = {};
        let total = vote_average * 10;
        let n = 1
        for (let i = 0; i < Ratings.length; i ++) {
            const value = Ratings[i]["Value"];
            ratingsTemp[Ratings[i]["Source"]] = value;
            const arr = value.split('/')

            if (arr.length > 1 && arr[1] === '10') total = total + arr[0] * 10
            else if (arr.length > 1 && arr[1] === '100') total = total + Number(arr[0])
            else total = total + Number(value.slice(0, -1))
            n = n + 1
        }
        
        setAverage(total / n)
        setRating(ratingsTemp)
    }

    let moreRatings = <div className='more-ratings'></div>
    if (ratings) {
        moreRatings = <div className='more-ratings'>
                                <Imdb width='70' height='50' />: {ratings["Internet Movie Database"] ? ratings["Internet Movie Database"] : 'N/A'}
                                <RottenTomatoes width='50' height='50' />: {ratings["Rotten Tomatoes"] ? ratings["Rotten Tomatoes"] : 'N/A'}
                                <Metacritic width='50' height='50' />: {ratings["Metacritic"] ? ratings["Metacritic"] : 'N/A'}
                            </div>
    } 
    return (
        <div className='vote_average' id={`${movieID}-${average}`}>
        <strong>Ratings:</strong>
            {moreRatings}
            <Tmdb width='70' height='50' />: {vote_average}/10
        </div>
    );
};

export default Ratings;