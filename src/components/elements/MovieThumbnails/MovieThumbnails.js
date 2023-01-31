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
            const { poster_path, title, id, release_date } = result;
            if (poster_path && title && release_date){
                const poster = BASE_POSTER_URL + poster_path;
                const altMsg = 'Movie poster';
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
                                onClick={() => this.props.onClickAddMovie(id)}>
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
                                <div className="header"> {title} </div>
                                    <div className="content">
                                        <Details movieID={id} poster={poster}/>
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