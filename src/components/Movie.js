import PropType from 'prop-types';
import { Link } from 'react-router-dom'
import MovieGenres from './MovieGenres'
import styled from './Movie.module.css'

function Movie({id, coverImg, title, summary, genres}) {
  return <div className={styled.card}>
    <div className={styled.imgBox}>
      <Link to={`/movie/${id}`}><img src={coverImg} alt={title} /></Link>
    </div>
    <div className={styled.textBox}>
      <h2>
        <Link to={`/movie/${id}`}>{ title }</Link>
      </h2>
      <p className={styled.summary}>
        { summary.length > 235 ? `${summary.slice(0,235)}...` : summary }
      </p>
      <MovieGenres genres={genres} />
    </div>
  </div>
}

Movie.PropType = {
  id: PropType.number.isRequired,
  coverImg: PropType.string.isRequired,
  title: PropType.string.isRequired,
  summary: PropType.string.isRequired,
  genres: PropType.array.isRequired
}

export default Movie;