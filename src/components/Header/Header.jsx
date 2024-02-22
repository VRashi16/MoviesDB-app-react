import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import Overlay from '../Overlay/Overlay'
import { BiX, BiMenu } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import DarkMode from '../DarkMode/DarkMode';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [scrollHeader, setScrollHeader] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const menuRef = useRef(null);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setShowMenu(true);
    setShowOverlay(true);
    setShowSearch(false);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShowMenu(false);
    setShowOverlay(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowOverlay(false);
        document.body.style.overflow = 'auto';
      }
    };
    if (showMenu && showOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu, showOverlay]);

  const scrollBg = () => {
    if(window.scrollY >= 10){
      setScrollHeader(true)
    }else{
      setScrollHeader(false)
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollBg);
    return () => {
      window.removeEventListener("scroll", scrollBg);
    };
  }, []);

  const openSearch = () => {
    setShowSearch(true);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  return (
    <>
      {showOverlay && <Overlay />}
      <header className={`header ${scrollHeader ? 'scroll-header' : ''}`}>
        <nav className="nav container">
          <Link to="/" className="nav-logo">
            MoviesHub<img src="/images/logo.png" className="nav-logo-img" />
          </Link>
          <div className={`nav-menu ${showMenu ? 'activeMenu' : ''}`} ref={menuRef}>
            <ul className="nav-list" onClick={handleClose}>
              <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
              <li className="nav-item" onClick={() => navigationHandler("movie")}><p className="nav-link">Movies</p></li>
              <li className="nav-item" onClick={() => navigationHandler("tv")}><p className="nav-link">TV Shows</p></li>
            </ul>
            <div className="nav-close" onClick={handleClose}><BiX /></div>
          </div>
          <div className="nav-contact">
            <BsSearch className="search-input" onClick={openSearch} />
            <div className="nav-toggle" onClick={handleClick}><BiMenu /></div>
            <DarkMode />
          </div>
        </nav>
        {showSearch && (
          <div className="header-searchbar">
            <div className="searchbar-container container">
              <input
                type="text"
                placeholder="Search for movies or tv shows.."
                className="home-search-input header-search-input"
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <BiX className="search-close" onClick={() => setShowSearch(false)} />
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Header