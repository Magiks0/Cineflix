import React from 'react';
import { useState, useEffect } from 'react';
import './SearchBar.css'

export default function SearchBar() {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjFlOTQ2Nzc0MGFkNzY0YmY2NThlMGJhZDNjZDgyYyIsIm5iZiI6MTczODc2ODI4Mi44MjksInN1YiI6IjY3YTM3ZjlhYWVlZTVjMGUyNTlmZTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaONPy4VbSbfXD2cnV2EklsJ7Ye0FawbRnk2lviJOI8'
        }
      };

       useEffect(() => {
            const fetchSearchedMovies = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`, options);
                    const data = await response.json();
                    setSearchedMovies(data.results)
                    console.log(data.results);
                } catch (err) {
                    console.error('Erreur lors du chargement des films :', err);
                };
            }

        fetchSearchedMovies();

        }, [searchTerm]);
    
    const toggleSearch = () => {
        setSearchVisible(!searchVisible);
        if (searchVisible) {
          setSearchTerm('');
        }
      };
  
    const handleSearch = (e) => {
        e.preventDefault();
        // Implémentez la recherche ici
        console.log('Recherche pour:', searchTerm);
        setSearchVisible(false);
        setSearchTerm('');
      };

    return (
        <>
            <form className={`search-form ${searchVisible ? 'active' : ''}`} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Rechercher un film..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-submit">
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <button className="icon-button search-toggle" onClick={toggleSearch}>
                <i className={`fas ${searchVisible ? 'fa-times' : 'fa-search'}`}></i>
            </button>

            <div className='results' style={{position: 'absolute', top:'50px', backgroundColor: '#1B1B29', width: '250px', padding: '10px', borderRadius: '25px'}}>
                {searchedMovies.slice(0, 5).map((movie) => (
                    <div key={movie.id} className="search-item" style={{display: 'flex', color: 'white', gap: '5px', alignItems: 'center', paddingLeft: '10px', borderRadius: '25px'}}>
                        <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt={movie.title} style={{width: '20%', height: '10%'}} />
                        <div className="search-info">
                            <h3 style={{fontSize: '15px'}}>{movie.title}</h3>
                            <p>{movie.release_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}