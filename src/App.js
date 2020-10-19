import React, { useEffect, useState } from 'react';
import Movie from './components/Movie';
import InfiniteScroll from 'react-infinite-scroll-component';

const api_key = 'd4b80c6aaf1234caa0b98179bc92eae7'

function App() {
	const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage]= useState(1);

  const handleSearch = async(e) => {
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`;

    e.preventDefault();
    if(!search) return
    const response = await fetch(SEARCH_URL)
    const {results} = await response.json();
    setMovies(results)
    }
  const fetchNext = async() => {
    setPage(page => page + 1)
    const FEATURED_MOVIES =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${page}`;
  
      setLoading(true);
      const getMovies = async () => {
        const response = await fetch(FEATURED_MOVIES);
        const { results } = await response.json();
        setLoading(false);
        setMovies(movies.concat(results));
      };
      getMovies();
  }
  
	useEffect(() => {
    const FEATURED_MOVIES =
	`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${page}`;

		setLoading(true);
		const getMovies = async () => {
			const response = await fetch(FEATURED_MOVIES);
			const { results } = await response.json();
			setLoading(false);
			setMovies(results);
		};
		getMovies();
	}, [page]);
	return (
    <div className="container">
			<header>
        <h1>MovieMania</h1>
        <form onSubmit={handleSearch}>
				<input type='search' placeholder="search movies" className='search' onChange={(e) => setSearch(e.target.value) } />
        </form>
			</header>
		<div className='movies-container'>
      <InfiniteScroll className="movies-container"
      dataLength={movies.length}
      next={fetchNext}
      hasMore={true}
      loader={<p>Loading...</p>}
      
      >
			{movies.length ? movies.map((movie) => {
				const { id, title, poster_path, vote_average, overview } = movie;
				return (
					<Movie
						key={id}
						title={title}
						posterPath={poster_path}
						average={vote_average}
						overview={overview}
					/>
				);
			}): <h3>No result found for your query</h3>}

    </InfiniteScroll>
		</div>
    </div>
	);
}

export default App;
