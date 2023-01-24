import React, { Component } from 'react'


class SearchBar extends Component {
    render() {
        return (
            <input 
                placeholder='Movie/TV Show...' 
                onInput={() => this.props.onInput()}>
            </input>
        );
    }
}


export default SearchBar;