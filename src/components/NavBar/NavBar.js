import React, { Component } from 'react';
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <nav>
            <h2>MovieCompare</h2>
            <h2>Search</h2>
            <button className="notification">
                <span>Compare</span>
                <span className="badge">{this.props.moviesToCompare.length}</span>
            </button>
            <h2>Links to APIs</h2>
            </nav>
        )
    }
}

export default NavBar