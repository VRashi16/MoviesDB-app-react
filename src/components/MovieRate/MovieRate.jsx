import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import './movierate.css'

const MovieRate = ({ rating }) => {
  return (
    <div className="circleRating">
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor:
          rating < 5 ? "red" : rating < 7 ? "orange" : "green",
        })}
      />
    </div>
  )
}

export default MovieRate