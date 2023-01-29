import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './NavBar.css'


class NavBar extends Component {
    render() {
        return (
            <nav>
            <h2>MovieCompare</h2>
            <Link to='/'>
                <button>Search</button>
            </Link>
            <Link to='/compare'>
                <button className="notification">
                    <span>Compare</span>
                    <span className="badge">{this.props.moviesToCompare.length}</span>
                </button>
            </Link>
            <h2>Links to APIs</h2>
            </nav>
        )
    }
}

export default NavBar