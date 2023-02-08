import React from 'react';
import { signOut, getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { ReactComponent as Tmdb } from '../elements/RatingSymbols/tmdb.svg';
import  { useNavigate } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ userId }) => {
    const navigate = useNavigate();
    const logout = () => {
        const auth = getAuth();
        if (userId){
            signOut(auth).then(() => {
                navigate(0)
            }).catch((error) => {
                console.log(error)
            });
        }
    }
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
            <Link to='/login'>
                <button onClick={logout} className='login-btn'>{userId ? 'Logout' : 'Login'}</button>
            </Link>
            <Tmdb width="200" height="50" />
        </nav>
    )
}

export default NavBar