import { useState } from 'react';
import Tabs from '../Tabs/Tabs'
import useFetch from '../../hooks/useFetch';
import Carousel from '../Carousel/Carousel';

const Popular = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <section className="popular">
      <div className="sectiontitle-container container">
        <h2 className="section-title">Popular</h2>
        <Tabs
          data={["Movies", "TV Shows"]}
          onTabChange={onTabChange}
        />
      </div>
      <div className="section-content container">
        <Carousel
          data={data?.results}
          loading={loading}
          endpoint={endpoint}
        />
      </div>
    </section>
  )
}

export default Popular