import React from 'react';
import DetailsCompact from '../elements/DetailsCompact/DetailsCompact';
import './Watchlist.css';

const Watchlist = ({ watchlist, onClickAddMovie }) => {
    const sortMovies = () => {
        if (!document.getElementById("sort-method")) {
            return
        }
        const sortMethod = document.getElementById("sort-method").value;
        console.log(sortMethod)
        // source: https://stackoverflow.com/questions/5066925/javascript-only-sort-a-bunch-of-divs
        let parent = document.getElementById('movies');
        let toSort = Array.prototype.slice.call(parent.children, 0);

        toSort.sort(function(a, b) {
            let aID = a.getElementsByClassName(sortMethod)[0].id;
            let bID = b.getElementsByClassName(sortMethod)[0].id;
            return bID.split('-')[1] - aID.split('-')[1];
        });

        parent.innerHTML = "";
        for(var i = 0, l = toSort.length; i < l; i++) {
            parent.appendChild(toSort[i]);
    }
    }
    if (watchlist.length === 0) {
        return (
            <div>No movies added to compare :)</div>
        )}

    const toggleDetails = () => {
        const movies = document.getElementById('movies');
        movies.querySelectorAll('.content').forEach(content => content.classList.toggle('hide'))
        movies.classList.toggle('results-div')
    }

    return (
    <div className='watchlist'>
        <div className='movie-list'>
            <div className='header'>
                <div className='sorting-method'>
                    Sort by:
                    <select id='sort-method' name='method' onChange={() => sortMovies()}>
                        <option value='vote_average'>Rating</option>
                        <option value='revenue'>Revenue</option>
                        <option value='budget'>Budget</option>
                        <option defaultValue value='release-date'>Release Date</option>
                    </select>
                </div>
                <div className='hide-details-checkbox'>
                    Hide Details:
                    <input type='checkbox' onChange={() => toggleDetails()}></input>
                </div>
            </div>
            <div id='movies'>
                {watchlist.map((movieID, index) => {
                    return  <div key={index} className='movie'>
                                <DetailsCompact 
                                    movieID={movieID} 
                                    watchlist={watchlist}
                                    onClickAddMovie={onClickAddMovie}/>
                            </div>
                })}
            </div>
        </div>
    </div>
    )
}


export default Watchlist;