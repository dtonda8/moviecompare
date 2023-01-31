import AddMovies from '../AddMovies/AddMovies';
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import Compare from '../Compare/Compare';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      let notyf = new Notyf({
        duration: 2000,
        position: {y: 'top'}
      });
      notyf.success('Added Movie');
    }
  }

  render() {
    return (
      <Router>
        <NavBar moviesToCompare={this.state.moviesToCompare}/>
        <Routes>
          <Route path='/' element={<AddMovies compareMovie={(movieID)=> this.compareMovie(movieID)}/>} />
          <Route path='/compare' element={<Compare movieIDs={this.state.moviesToCompare}/>} />
        </Routes>
      </Router>
    );
  }
}

export default App;
