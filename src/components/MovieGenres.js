import styled from './MovieGenres.module.css';


function Genres({genres}) {
  return <div>
    <ul className={styled.genres}>
      {genres.map(genre => (
        <li key={genre} data-genre={genre}>{genre}</li>
      ))}
    </ul>
  </div>
}
export default Genres;