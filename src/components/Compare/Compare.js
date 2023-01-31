import React, { Component } from 'react';
import DetailsCompare from '../elements/DetailsCompare/DetailsCompare';
import './Compare.css';

class Compare extends Component {
    sortMovies() {
        if (!document.getElementById("sort-method")) {
            return
        }
        const sortMethod = document.getElementById("sort-method").value;
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
    render() {
        const movieIDs = this.props.movieIDs;
        if (movieIDs.length === 0) {
            return (
                <div>No movies added to compare :)</div>
            )}

        return (
        <div className='nav'>
            <div className='movie-list'>
                <div className='header'>
                    <strong className='film-header'>Film</strong>
                    <div className='sorting-method'>
                        Sort by:
                        <select id='sort-method' name='method' onChange={() => this.sortMovies()}>
                            <option value='vote_average'>Rating</option>
                            <option value='revenue'>Revenue</option>
                            <option value='budget'>Budget</option>
                            <option selected="selected" value='release-date'>Release Date</option>
                        </select>
                    </div>
                    <div className='rating-symbols'>Rating symbols</div>
                </div>
                <div id='movies'>
                    {movieIDs.map((movieID, index) => {
                        return  <div key={index} className='movie'>
                                    <DetailsCompare movieID={movieID} />
                                </div>
                    })}
                </div>
            </div>
        </div>

        )
    }
}


export default Compare