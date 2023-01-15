import { useEffect, useState } from 'react'
import Movie from '../components/Movie';
import Loading from '../components/Loading';
import { Range, getTrackBackground } from 'react-range';
import styled from './Home.module.css';

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [values, setValues] = useState([0,10]);
  const getMovies = async () => {
    const response = await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9')
    const { data } = await response.json();
    setMovies(data.movies);
    setLoading(false);
  }
  const search = () => {

  }
  useEffect(() => {
    getMovies()
  }, []);
  return <div className={styled.wrap}>
    <div>
      { loading ? (
        <Loading />
      ) : (
        <div className={styled.container}>
            
            <h1>Movie Search</h1>
            <div className={styled.searchBox}>

            <div>
              <Range 
                step={0.1}
                min={0}
                max={10}
                values={values}
                onChange={(values) => {
                  setValues(values);
                }}

                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '5px',
                        width: '100%',
                        borderRadius: '4px',
                        background: getTrackBackground({
                          values,
                          colors: ['#ccc', '#548BF4', '#ccc'],
                          min: 1,
                          max: 10,
                        }),
                        alignSelf: 'center'
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '42px',
                      width: '42px',
                      borderRadius: '4px',
                      backgroundColor: '#FFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0px 2px 6px #AAA'
                    }}
                  >
                    <div
                      style={{
                        height: '16px',
                        width: '5px',
                        backgroundColor: isDragged ? '#548BF4' : '#CCC'
                      }}
                    />
                  </div>
                )}
              />
            </div>
            <div>
              검색
              <button onClick={search}>검색</button>
            </div>

            </div>
            <p className={styled.count}>total ({movies.length})</p>
            <div className={styled.movies}>
            {movies.map(movie =>  (
            <Movie
                key={movie.id}
                id={movie.id}
                coverImg={movie.medium_cover_image} 
                title={movie.title} 
                summary={movie.summary} 
                genres={movie.genres}
            />
            ))}
        </div>
      </div>
      )}
    </div>
  </div>
}
export default Home;