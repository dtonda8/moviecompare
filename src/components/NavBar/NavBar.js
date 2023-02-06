import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Tmdb } from '../elements/RatingSymbols/tmdb.svg';
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='navbar'>
            <Link to='/'>
                <button className='movie-compare'><strong>MovieCompare</strong></button>
            </Link>
            <Link to='/'>
                <button className='search-btn'>Search</button>
            </Link>
            <Link to='/watchlist'>
                <button className='watchlist-btn' >Watchlist</button>
            </Link>
            <Tmdb width="200" height="50" />
        </nav>
    )
}

export default NavBar