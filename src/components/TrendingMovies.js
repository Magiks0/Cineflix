import { useEffect, useState } from 'react';
import './TrendingMovies.css';

export default function TrendingMovies(){
    const [films, setFilms] = useState([]);
    const [time, setTime] = useState('day');

    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjFlOTQ2Nzc0MGFkNzY0YmY2NThlMGJhZDNjZDgyYyIsIm5iZiI6MTczODc2ODI4Mi44MjksInN1YiI6IjY3YTM3ZjlhYWVlZTVjMGUyNTlmZTQ3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EaONPy4VbSbfXD2cnV2EklsJ7Ye0FawbRnk2lviJOI8'
        }
    };
  
    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/trending/movie/${time}?language=en-US`, options);
                const data = await response.json();
                setFilms(data.results);
            } catch (error) {
                console.error('Erreur lors du chargement des films :', error);
            }
        };

        fetchFilms();
    }, [time]);

    return (
        <>
        <h1 style={{marginLeft: '45%', textTransform: 'uppercase'}}>A découvrir</h1>
        <div style={{display: 'flex', justifyContent: 'space-around', gap: '10px'}}>
            <div className="time_switch">
                <button className={time === 'day' ? 'selected' : ''} onClick={() => {setTime('day')}}>Aujourd'hui</button>
                <button className={time === 'week' ? 'selected' : ''} onClick={() => {setTime('week')} }>Cette semaine</button>
            </div>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            {films.map((film) => (
                <div className='card' key={film.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} alt={film.title} />
                    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center'}}>
                        <h2 style={{fontSize: '1.2rem', margin: '0'}}>{film.title}</h2>
                        <p style={{fontSize: '1rem', margin: '0'}}>{film.release_date}</p>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}