import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel/Carousel"

const Recommendation = ({ mediaType, id }) => {
  const { data, loading, error } = useFetch(
    `/${mediaType}/${id}/recommendations`
  );

  return (
    <section className="recommended">
      <div className="cast-container container">
        <Carousel
          title="Recommended"
          data={data?.results}
          loading={loading}
          endpoint={mediaType}
        />
      </div>
    </section>
  )
}

export default Recommendation