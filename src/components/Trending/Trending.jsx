import { useState } from 'react';
import Tabs from '../Tabs/Tabs'
import './trending.css'
import useFetch from '../../hooks/useFetch';
import Carousel from '../Carousel/Carousel';

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };

  return (
    <section className="section trending">
      <div className="sectiontitle-container container">
        <h2 className="section-title">Trending</h2>
        <Tabs
          data={["Day", "Week"]}
          onTabChange={onTabChange}
        />
      </div>
      <div className="section-content container">
        <Carousel
          data={data?.results}
          loading={loading}
        />
      </div>
    </section>
  )
}

export default Trending