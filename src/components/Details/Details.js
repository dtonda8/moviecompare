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
            <p><strong>Trailer</strong></p>
            <div className='video-container' id={movieID + '-video'} >
                <Trailer movieID={Number(movieID)} />
            </div>
            <p><strong>Cast</strong></p>
            <div className='actors'>
                <Actors actors={actors} />
            </div>
        </div> 
    );
}

export default Details

