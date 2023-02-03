import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Actors from '../elements/Actors/Actors';
import Trailer from '../elements/Trailer/Trailer';
import './Details.css'
import DetailsCompact from '../elements/DetailsCompact/DetailsCompact';

const Details = () => {
    const { movieID } = useParams();
    const [actors, setActors] = useState(null);

    return (
        <div className='full-details'>
            <DetailsCompact movieID={movieID} handleActors={(actors) => setActors(actors)}/>
            <h2>Trailer</h2>
            <div className='video-container' id={movieID + '-video'} >
                <Trailer movieID={movieID} />
            </div>
            <h2>Cast</h2>
            <div className='actors'>
                <Actors actors={actors} />
            </div>
        </div> 
    );
}

export default Details

