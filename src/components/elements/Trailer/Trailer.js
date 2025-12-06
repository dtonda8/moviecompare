import React, { useState, useEffect, useCallback } from 'react';
import './Trailer.css'
import { getMovieVideos } from '../../../utils/api';

const Trailer = (props) => {
    const [videoKey, setVideoKey] = useState(null);
    const getTrailer = useCallback((data) => {
        const trailers = data.results;
        if (trailers.length === 0) {
            const videoContainer = document.getElementById(props.movieID + '-video')
            if (videoContainer) {
                videoContainer.style.display = 'none'
            }
        } else {
            for (let i = trailers.length - 1; i >= 0 ; i --) {
                if (trailers[i]['type'] === 'Trailer') {
                    setVideoKey(trailers[i]['key'])
                    return 
                }
            }
            setVideoKey(trailers[0]['key'])
        }
    }, [props.movieID])

    useEffect(() => {
        getMovieVideos(props.movieID)
            .then(data => getTrailer(data))
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    }, [props.movieID, getTrailer])

    return (
        <div className='trailer-container'>
            <iframe
                title='myFrame'
                className='video'
                src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
                allow="autoplay">
            </iframe>
        </div>
    )
}

export default Trailer