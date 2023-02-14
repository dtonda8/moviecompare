import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getDatabase, ref, get, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import AddMovies from '../AddMovies/AddMovies';
import React, { useState } from 'react';
import Watchlist from '../Watchlist/Watchlist';
import NavBar from "../NavBar/NavBar.tsx"
import Details from '../Details/Details';
import Login from "../Login/Login";
import { generalNotfy, warningNotyf } from "../elements/Notifications/Notifications";
import 'notyf/notyf.min.css';
import './App.css';
import { auth } from "../../firebase_setup/firebase";
import { ChakraProvider } from "@chakra-ui/react";


const App = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        setUserId(userId)
        const dbRef = ref(getDatabase());
        get(dbRef, `users/${userId}`)
          .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val().users[userId]
                data ? updateWatchlist(data.watchlist) : updateWatchlist([])
              } else updateWatchlist([]);
          })
          .catch((error) => {
              console.log(error);
          });
          generalNotfy.success('Welcome!');
      } 
    });
  }, [])

  const compareMovie = (movieID) => {
    const copy = watchlist.slice();
    const index = copy.indexOf(movieID);

    if (index > -1) {
      copy.splice(index, 1);
      warningNotyf.success('Movie removed');

    } else if (copy.length >= 30) {
      warningNotyf.error('Maximum of 30 movies for Watchlist. Remove some from the Watchlist tab.');

    } else {
      copy.push(movieID);
      generalNotfy.success('Added Movie');
    }

    setWatchlist(copy);
    if (userId) set(ref(getDatabase(), 'users/' + userId), { watchlist : copy });
  }

  const  updateWatchlist = newWatchlist => setWatchlist(newWatchlist);

  return (
    <ChakraProvider>
    <Router>
      <NavBar userId={userId}/>
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
        <Route path='/login' element={<Login watchlist={watchlist} updateWatchlist={updateWatchlist} userId={userId} />} />                     
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App;
