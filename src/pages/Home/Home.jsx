import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'
import { useSelector } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import Img from '../../components/LazyLoad/Img';
import Trending from '../../components/Trending/Trending';
import Popular from '../../components/Popular/Popular';
import TopRated from '../../components/TopRated/TopRated';

const Home = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);


  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <section className="section home">
        {!loading && (
          <div className="backdrop-img">
            <Img src={background} />
          </div>
        )}

        <div className="opacity-layer"></div>
        <div className="home-container container">
          <div className="home-content">
            <h3 className="home-title">
              Welcome
            </h3>
            <p className="home-desc">
              Discover and browse through masterpieces 
              as well as classic movies, TV shows and much more.
            </p>
          </div>

          <div className="home-search">
            <input
              type="text"
              placeholder="Search for movies or tv shows.."
              className="home-search-input"
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button className="home-btn">
              Search
            </button>
          </div>
        </div>
      </section>
      <Trending />
      <Popular />
      <TopRated />
    </>
  )
}

export default Home