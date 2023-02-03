import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Actors from '../elements/Actors/Actors';
import Trailer from '../elements/Trailer/Trailer';
import './Details.css'
import DetailsCompact from '../elements/DetailsCompact/DetailsCompact';

const Details = ({ watchlist, onClickAddMovie }) => {
    const { movieID } = useParams();
    const [actors, setActors] = useState(null);

    return (
        <div className='full-details'>
            <DetailsCompact 
                movieID={Number(movieID)} 
                handleActors={(actors) => setActors(actors)}
                watchlist={watchlist}
                onClickAddMovie={onClickAddMovie}/>
            <h2>Trailer</h2>
            <div className='video-container' id={movieID + '-video'} >
                <Trailer movieID={Number(movieID)} />
            </div>
            <h2>Cast</h2>
            <div className='actors'>
                <Actors actors={actors} />
            </div>
        </div> 
    );
}

export default Details

