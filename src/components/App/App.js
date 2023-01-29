import AddMovies from '../AddMovies/AddMovies';
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {moviesToCompare:[]}
  }

  compareMovie(movieID) {
    const moviesToCompare = this.state.moviesToCompare.slice();

    if (moviesToCompare.includes(movieID)) {
      let notyf = new Notyf({
        duration: 2000,
        position: {y: 'top'}
      });
      notyf.error('Movie already added');

    } else if (this.state.moviesToCompare.length >= 10) {
      let notyf = new Notyf({
        duration: 4500,
        position: {y: 'top'}
      });
      notyf.error('Maximum of 10 movies to compare. Remove some from the compare tab.');

    } else {
      moviesToCompare.push(movieID)
      this.setState({ moviesToCompare:moviesToCompare })
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar moviesToCompare={this.state.moviesToCompare}/>
        <AddMovies compareMovie={(movieID)=> this.compareMovie(movieID)}/>
      </div>
    );
  }
}

export default App;
