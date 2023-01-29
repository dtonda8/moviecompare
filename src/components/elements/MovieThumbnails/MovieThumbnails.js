import React, { Component } from 'react';
import './MovieThumbnails.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Details from '../Details/Details';

const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/original'

class MovieThumbnails extends Component {
    render() {
        let results = this.props.results
        const resultsDiv = results.map((result, index) => {
            if (result['poster_path']){
                const poster = BASE_POSTER_URL + result['poster_path'];
                const altMsg = 'Movie poster';
                const movieID = result['id'];
                return (
                    <div
                        key={index}
                        className='thumbnail'>
                        <img 
                            className='movie-img'
                            src={poster}    
                            alt={altMsg}>
                        </img>
                            <button 
                                className='add-to-compare'
                                onClick={() => this.props.onClickAddMovie(movieID)}>
                                    Add to Compare
                            </button>
                            <Popup
                            trigger={<button className='details'>
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
                                <div className="header"> {result['title'] ? result['title'] : result['name']} </div>
                                    <div className="content">
                                        <Details movieID={movieID} poster={poster}/>
                                    </div>
                                <div className="actions">
                                    <button
                                        className="button"
                                        onClick={() => {
                                        close();
                                        }}>
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