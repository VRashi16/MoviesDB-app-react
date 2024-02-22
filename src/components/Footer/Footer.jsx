import { Link, useNavigate } from 'react-router-dom'
import './footer.css'
import { BsFacebook, BsTwitter } from 'react-icons/bs'
import { AiFillInstagram } from 'react-icons/ai'

const Footer = () => {
  const navigate = useNavigate();

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          
          <div className="footer-brand-wrapper">
            <Link to="/" className="nav-logo footer-logo">
            MoviesHub<img src="/images/logo.png" className="nav-logo-img" />
            </Link>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li onClick={() => navigationHandler("movie")}><p className="footer-link">Movie</p></li>
              <li onClick={() => navigationHandler("tv")}><p className="footer-link">TV Show</p></li>
            </ul>
          </div>

          <div className="divider"></div>

          <div className="quicklink-wrapper">
            <ul className="quicklink-list">
              <li><p className="quicklink-link">Privacy</p></li>
              <li><p className="quicklink-link">Help center</p></li>
              <li><p className="quicklink-link">Terms of use</p></li>
            </ul>
            <ul className="social-list">
              <li>
                <BsFacebook className="social-link" />
              </li>
              <li>
                <BsTwitter className="social-link" />
              </li>
              <li>
                <AiFillInstagram className="social-link" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2023 <span className="copyright-link">movieshub</span>. All Rights Reserved
          </p>
          <p className="faq">FAQs</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer