import React from 'react';
import './Actors.css'

const PROFILE_PATH_BASE = 'https://image.tmdb.org/t/p/w500/'

const Actors = (props) => {
    let actors = props.actors;
    
    const handleImage = (actor) => {
        if (actor.profile_path) return PROFILE_PATH_BASE + actor.profile_path;
        return './no-image-icon-6.png'
    }

    if (actors) {
        if (actors.length > 12) actors = actors.slice(0, 12);
        return (
            <div className='actor-container'>
                {actors.map((actor, index) => {
                    return (
                        <div key={index} className='actor'>
                            <img
                                className='actor-image'
                                src={handleImage(actor)}
                                alt='Unavailable'>
                            </img>
                            <p className='actor-name'>{actor.name}</p>
                        </div>
                    )
                    })
                }
            </div>
        )
    }
}

export default Actors