import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from './Suggestions.module.css';

function Suggestions({ id }) {


  const [ suggestions, setSuggestions ] = useState({});
  const [ loading, setLoading ] = useState(false);

  const getSuggestions = async () => {
    const res = await fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`);
    const json = await res.json();
    console.log(json)
    setLoading(true)
  }

  useEffect(() => {
    getSuggestions();
  }, [])

  return <div>
    <h3>Suggestions ()</h3>
    <div>
      { !loading ? 
        null :
        <div className={styled.suggestionsList}>
        {suggestions.movies.map(movie => (
          <div className={styled.movie} key={movie.id}>
            <div className={styled.poster}>
              
              <img src={movie.medium_cover_image} />
            </div>
            <div className={styled.contents}>
              <div className={styled.title}>{movie.title}</div>
              <p className={styled.summary}>
                { movie.summary.length > 130 ?
                  `${movie.summary.slice(0, 130)}...` :
                  movie.summary
                }
              </p>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  </div>
}
export default Suggestions;