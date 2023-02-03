import React, { useState, useEffect } from 'react';
import './Trailer.css'

const API_KEY = 'aeeb8aeb2b7826a4b59ceeec928a37ec';

const Trailer = (props) => {
    const [videoKey, setVideoKey] = useState(null);
    const getTrailer = (data) => {
        const trailers = data.results;
        if (trailers.length === 0) {
            const videoContainer = document.getElementById(props.movieID + '-video')
            videoContainer.style.display = 'none'
        } else {
            for (let i = trailers.length - 1; i >= 0 ; i --) {
                if (trailers[i]['type'] === 'Trailer') {
                    setVideoKey(trailers[i]['key'])
                    return 
                }
            }
            setVideoKey(trailers[0]['key'])
        }
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${props.movieID}/videos?api_key=${API_KEY}&language=en-US`)
            .then(response => response.json())
            .then(data => getTrailer(data));
    })

    return (
        <iframe
            title='myFrame'
            className='video'
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
            allow="autoplay">
        </iframe>
    )
}

export default Trailer