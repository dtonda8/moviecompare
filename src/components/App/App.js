import AddMovies from '../AddMovies/AddMovies';
import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar'
import Watchlist from '../Watchlist/Watchlist';
import Details from '../Details/Details';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {watchlist:[]}
  }

  compareMovie(movieID) {
    const watchlist = this.state.watchlist.slice();
    const index = watchlist.indexOf(movieID)

    if (index > -1) {
      watchlist.splice(index, 1);
      this.setState({ watchlist:watchlist });
      let notyf = new Notyf({
        duration: 2000,
        position: {y: 'top'},
        types: [
          {
            type: 'success',
            background: 'orange',
            duration: 2000,
          }
        ]});
      notyf.success('Movie removed');

    } else if (watchlist.length >= 100) {
      let notyf = new Notyf({
        duration: 4500,
        position: {y: 'top'}
      });
      notyf.error('Maximum of 100 movies for Watchlist. Remove some from the Watchlist tab.');

    } else {
      watchlist.push(movieID)
      this.setState({ watchlist:watchlist })
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
        <NavBar />
        <Routes>
          <Route path='/' 
            element={<AddMovies 
                      compareMovie={(movieID)=> this.compareMovie(movieID)}  
                      watchlist={this.state.watchlist}/>} />
          <Route path='/watchlist' element={<Watchlist movieIDs={this.state.watchlist}/>} />
          <Route path='/:movieID' element={<Details />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
