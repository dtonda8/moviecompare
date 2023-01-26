import React, { Component } from 'react';
import './MovieThumbnails.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original'

class MovieThumbnails extends Component {
    render() {
        let results = this.props.results
        const resultsDiv = results.map((result, index) => {
            if (result['poster_path']){
                const poster = BASE_POSTER_URL + result['poster_path'];
                const id = result['id'];
                const altMsg = 'Movie poster';
                return (
                    <div
                        key={index}
                        className='thumbnail'>
                        <img 
                            id={id + '-img'}
                            className='movie-img'
                            src={poster}    
                            alt={altMsg}>
                        </img>
                            <button 
                                className='add-to-compare'
                                id={id + 'add-to-compare-btn'}>
                                    Add to Compare
                            </button>
                            <Popup
                            trigger={<button 
                                        className='details'
                                        id={id + 'details-btn'}>
                                        Details
                                    </button>}
                            modal
                            nested
                            >
                            {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                &times;
                                </button>
                                <div className="header"> Modal Title </div>
                                <div className="content">
                                {' '}
                                content
                                </div>
                                <div className="actions">
                                <button
                                    className="button"
                                    onClick={() => {
                                    close();
                                    }}
                                >
                                    Exit
                                </button>
                                </div>
                            </div>
                            )}
                            </Popup>
                    </div>
                )
            }
        });
        return resultsDiv;
    }
};


export default MovieThumbnails;