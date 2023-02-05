import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMovies from '../AddMovies/AddMovies';
import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar'
import Watchlist from '../Watchlist/Watchlist';
import Details from '../Details/Details';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import './App.css';


const App = () => {
  const [watchlist, setWatchlist] = useState([])

  const compareMovie = (movieID) => {
    const copy = watchlist.slice();
    const index = copy.indexOf(movieID)

    if (index > -1) {
      copy.splice(index, 1);
      setWatchlist(copy)

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

    } else if (copy.length >= 100) {
      let notyf = new Notyf({
        duration: 4500,
        position: {y: 'top'}
      });
      notyf.error('Maximum of 100 movies for Watchlist. Remove some from the Watchlist tab.');

    } else {
      copy.push(movieID)
      setWatchlist(copy)
      let notyf = new Notyf({
        duration: 2000,
        position: {y: 'top'}
      });
      notyf.success('Added Movie');
    }
  }

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' 
          element={<AddMovies 
                    compareMovie={(movieID)=> compareMovie(movieID)}  
                    watchlist={watchlist}/>} />
        <Route path='/watchlist' element={<Watchlist 
                                            watchlist={watchlist}
                                            onClickAddMovie={(movieID)=> compareMovie(movieID)}/>} />
        <Route path='/:movieID' element={<Details 
                                            onClickAddMovie={(movieID)=> compareMovie(movieID)}
                                            watchlist={watchlist}/>} />
      </Routes>
    </Router>
  );
}

export default App;
