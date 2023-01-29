import React, { Component } from 'react';
import Details from '../elements/Details/Details';

class Compare extends Component {
    render() {
        const movieIDs = this.props.movieIDs;
        if (movieIDs.length === 0) {
            return (
                <div>No movies to compare</div>
            )}

        return (
        <div>
            {movieIDs.map((movieID, index) => {
                return  <div key={index}>
                            {/* {movieID} */}
                            <Details movieID={movieID} />
                        </div>
            })}
        </div>
        )
    }
}


export default Compare