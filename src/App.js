import './App.css';
import Header from './components/Header';
import {useState, useEffect} from 'react';
import axios from 'axios';
import MovieScreen from './components/MovieScreen';
import Watchlist from './components/Watchlist';
import "bootstrap/dist/css/bootstrap.min.css";

const baseURL = 'https://api.themoviedb.org/3/movie/popular'

function App() {
  const [movieList, setMovieList] = useState([])
  const [watchList, setWatchList] = useState([])
  const [page, setPage] = useState(1)

  const getData = () => {
  axios.get(`${baseURL}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
  // axios.get('https://api.themoviedb.org/3/movie/297802?api_key=5309d85556db18147a940de7ee7105be&append_to_response=images,credits')
    .then((res)=>{
      console.log(res.data.results)
      setMovieList(res.data.results)
  })
  }

  useEffect(()=> {
    getData()
  }, [page])

  const addMovie = (movie) => {
    setWatchList([...watchList, movie])
  }

  const removeMovie = (movie) => {
    let newState = watchList.filter((item)=>item.id!==movie.id)
    setWatchList(newState)
  }
  return (
    <div className="App dark">
      <Header />
      <main>
        <MovieScreen watchList={watchList} page={page} setPage={setPage} movieList={movieList} addMovie={addMovie} removeMovie={removeMovie} />
        <Watchlist watchList={watchList} removeMovie={removeMovie} />
      </main>
    </div>
  );
}

export default App;
