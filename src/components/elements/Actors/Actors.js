import React from 'react';
import './Actors.css'

const PROFILE_PATH_BASE = 'https://image.tmdb.org/t/p/w500/'

const Actors = ({ actors }) => {
    if (actors) {
        let cast = actors;
        if (cast.length > 12) cast = actors.slice(0, 12)
        return (
            <div className='actor-container'>
                {cast.map((actor, index) => {
                    return (
                        <div key={index} className='actor'>
                            <img
                                className='actor-image'
                                src={PROFILE_PATH_BASE + actor.profile_path}
                                alt='Unavailable'>
                            </img>
                            <p className='actor-name'>{actor.name}</p>
                        </div>
                    )})
                }
            </div>
        )}
}

export default Actors