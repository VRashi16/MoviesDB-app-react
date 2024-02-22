import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import './moviedetails.css'
import useFetch from "../../hooks/useFetch";
import Img from "../LazyLoad/Img";
import PosterFallback from "../../assets/no-poster.png";
import Genres from "../Genres/Genres";
import MovieRate from "../MovieRate/MovieRate";
import { PlayIcon } from "../PlayIcon/PlayIcon";
import VideoPopup from "../VideoPopup/VideoPopup";

const MovieDetails = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter(
        (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    );

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

  return (
    <section className="details section">
        {!loading ? (
            <>
                {!!data && (
                    <React.Fragment>
                        <div className="details-container container">
                            <div className="details-left details-banner img-holder">
                                {data.poster_path ? (
                                    <Img className="details-img" src={ url.backdrop + data.poster_path} />
                                    ) : (
                                    <Img className="details-img" src={PosterFallback} />
                                )}
                            </div>
                            <div className="details-right">
                                <h1 className="movie-title">
                                    {`${
                                        data.name || data.title
                                        } (${dayjs(
                                        data?.release_date
                                    ).format("YYYY")})`}
                                </h1>
                                <h3 className="movie-subtitle">
                                    {data.tagline}
                                </h3>
                                <Genres data={_genres} />
                                <div className="movie-trailer roww">
                                    <MovieRate rating={data.vote_average.toFixed(1)} />
                                    <div
                                        className="playbtn"
                                        onClick={() => {
                                            setShow(true)
                                            // eslint-disable-next-line react/prop-types
                                            setVideoId(video.key)
                                        }}
                                    >
                                    <PlayIcon />
                                        <span className="text">
                                            Watch Trailer
                                        </span>
                                    </div>
                                </div>
                                <div className="movie-overview">
                                    <p className="overview-desc">
                                        {data.overview}
                                    </p>
                                </div>
                                <div className="movie-info">
                                    {data.status && (
                                        <div className="info-item">
                                            <span className="info-text info-bold">
                                                Status:{" "}
                                            </span>
                                            <span className="info-desc">
                                                {data.status}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="movie-info">
                                    {data.release_date && (
                                        <div className="info-item">
                                            <span className="info-text info-bold">
                                                Release Date:{" "}
                                            </span>
                                            <span className="info-desc">
                                                {dayjs(
                                                    data.release_date
                                                ).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="movie-info">
                                    {data.runtime && (
                                        <div className="info-item">
                                            <span className="info-text info-bold">
                                                Runtime:{" "}
                                            </span>
                                            <span className="info-desc">
                                                {toHoursAndMinutes(
                                                    data.runtime
                                                )}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {director?.length > 0 && (
                                    <div className="movie-info">
                                        <span className="info-text info-bold">
                                            Director:{" "}
                                        </span>
                                        <span className="info-desc">
                                            {director?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length -
                                                        1 !==
                                                        i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                {writer?.length > 0 && (
                                    <div className="movie-info">
                                        <span className="info-text info-bold">
                                            Writer:{" "}
                                        </span>
                                        <span className="info-desc">
                                            {writer?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {writer.length -
                                                        1 !==
                                                        i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                                {data?.created_by?.length > 0 && (
                                    <div className="movie-info">
                                        <span className="info-text info-bold">
                                            Creator:{" "}
                                        </span>
                                        <span className="info-desc">
                                            {data?.created_by?.map(
                                                (d, i) => (
                                                    <span key={i}>
                                                        {d.name}
                                                        {data
                                                            ?.created_by
                                                            .length -
                                                            1 !==
                                                            i && ", "}
                                                    </span>
                                                )
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup
                            show={show}
                            setShow={setShow}
                            videoId={videoId}
                            setVideoId={setVideoId}
                        />
                    </React.Fragment>
                )}
            </>
        ) : (
            <div className="details-skeleton">
                <div className="details-skeleton-container container">
                    <div className="skeleton-left skeleton"></div>
                    <div className="skeleton-right">
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                        <div className="skeleton-row skeleton"></div>
                    </div>
                </div>
            </div>
        )}
       
    </section>
  )
}

export default MovieDetails