import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import './search.css';

import { fetchDataFromApi } from "../../utils/api";
import MovieCard from "../../components/MovieCard/MovieCard";
import Spinner from "../../components/Spinner/Spinner";

const Search = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...res.results],
        });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <section className="search-results section">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <div className="search-results-container container">
          {data?.results?.length > 0 ? (
            <>
              <div className="search-title">
                {`Search ${
                    data?.total_results > 1
                    ? "results"
                    : "result"
                  } of '${query}'`
                }
              </div>
              <InfiniteScroll
                className="search-content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                    return (
                      <MovieCard
                        key={index}
                        data={item}
                        fromSearch={true}
                     />
                    );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <div className="no-result">
              <div>
                <p>
                  Sorry, no results found!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Search