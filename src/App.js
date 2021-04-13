import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1a91217f35145383593e28047b9be31c&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=1a91217f35145383593e28047b9be31c&query=";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(()=> {
   getMovies(FEATURED_API)
  }, [])

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data)=> {
        setMovies(data.results);
      });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm) {
  getMovies(SEARCH_API + searchTerm);
    fetch(SEARCH_API + searchTerm)
    setsearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setsearchTerm(e.target.value);
  }

  return (
  <>
    <header>
      <form onSubmit={handleOnSubmit}>
      <input 
       className="search" 
       type="search"
       placeholder="Search ... " 
       value={searchTerm}
       onChange={handleOnChange}
      />
      </form>
    </header>
    <div className="movie-container">
      {movies.length > 0 && movies.map((movie) => 
      <Movie key={movie.id} {...movie} />
      )}
    </div>
  </>
  );
}

export default App;



