import { useRef } from "react";
import './carousel.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Img from "../LazyLoad/Img";
import PosterFallback from "../../assets/no-poster.png"; 
import MovieRate from "../MovieRate/MovieRate";
import Genres from "../Genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

  return (
    <div className="carousel">
        <div className="carousel-container">
            {title && <div className="section-title p-title">{title}</div>}
            <BsFillArrowLeftCircleFill
                className="carouselLeftNav arrow"
                onClick={() => navigation("left")}
            />
            <BsFillArrowRightCircleFill
                className="carouselRighttNav arrow"
                onClick={() => navigation("right")}
            />
            {!loading ? (
                <div className="carouselItems" ref={carouselContainer}>
                    {data?.map((item) => {
                        const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                        return (
                            <div key={item.id} className="carouselItem" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}>
                                <div className="posterBlock">
                                    <Img src={posterUrl} className="poster-img" />
                                    <MovieRate rating={item.vote_average.toFixed(1)} /> 
                                    <Genres data={item.genre_ids.slice(0, 2)} />
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                        {dayjs(item.release_date || item.first_air_date).format(
                                            "MMM D, YYYY"
                                        )}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="loadingSkeleton container">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            )}
        </div>
    </div>
  )
}

export default Carousel