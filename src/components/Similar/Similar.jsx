import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel/Carousel"

const Similar = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <section className="similar">
      {/* <h3 className="movie-section-title container">Similar TV Shows</h3> */}
      <div className="cast-container container">
        <Carousel
          title={title}
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      </div>
    </section>
  )
}

export default Similar
// import { useFetcher } from "react-router-dom";
// import Carousel from "../Carousel/Carousel";

// const Similar = ({ mediaType, id }) => {
//   const { data, loading, error } = useFetcher(`/${mediaType}/${id}/similar`);

//   const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";
  
//   return (
//     <section className="section">
//       <Carousel
//         title={title}
//         data={data?.results}
//         loading={loading}
//         endpoint={mediaType}
//       />
//     </section>
//   )
// }

// export default Similar