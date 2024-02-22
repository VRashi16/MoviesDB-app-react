import { useParams } from 'react-router-dom';
import './details.css'
import useFetch from '../../hooks/useFetch';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import Cast from '../../components/Cast/Cast';
import Videos from '../../components/Videos/Videos';
import Similar from '../../components/Similar/Similar';
import Recommendation from '../../components/Recommendation/Recommendation';

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <MovieDetails video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <div className="l-divider container"></div>
      <Videos data={data} loading={loading} />
      <div className="l-divider container"></div>
      <Similar mediaType={mediaType} id={id} />
      <div className="l-divider container"></div>
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details