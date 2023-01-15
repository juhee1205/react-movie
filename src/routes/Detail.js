import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import MovieGenres from '../components/MovieGenres'
import Suggestions from '../components/Suggestions';
import styled from './Detail.module.css';

function Detail() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [suggestions, setSuggestions] = useState({})

  const getDetail = async () => {
    const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    const { data } = await response.json();
    setDetail(data.movie);  
  }
  const getReview = async () => {
    const res = await fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`);
    const { data } = await res.json();
    setSuggestions(data);
    setLoading(false);
  }
  useEffect(() => {
    getDetail();
    getReview();
  }, []);

  return <div>
    { loading ? (
        <Loading />
      ) : (
        <div className={styled.wrap}>
          <div className={styled.detail}>
            <div className={styled.bg}>
              <img src={ detail.background_image_original } />
            </div>

            <div className={styled.contents}>
              <div className={styled.poster}>
                <img src={ detail.large_cover_image } />
              </div>

              <div className={styled.infoBox}>
                <h1>{ detail.title }</h1>
                <p className={styled.desc}>{ detail.description_full }</p>
                <MovieGenres genres={detail.genres} />
                <div className={styled.otherInfo}>
                  <dl>
                    <dt>Year</dt>
                    <dd>{ detail.year }</dd>
                  </dl>
                  <dl>
                    <dt>Rating</dt>
                    <dd> { detail.rating }</dd>
                  </dl>
                  <dl>
                    <dt>Like</dt>
                    <dd> { detail.like_count } </dd>
                  </dl>
                  { detail.runtime !== 0 ? 
                    (
                      <dl>
                        <dt>Runtime</dt>
                        <dd> {detail.runtime } minutes</dd>
                      </dl>

                    ) : null
                  }

                </div>
              </div>
            </div>
          </div>

          <Suggestions id={id} />

          <div className={styled.suggestions}>
            <h2>Suggestions ({suggestions.movie_count})</h2>
            
          </div>
        </div>
      )}
  </div>
}

export default Detail;