import { ReactNode } from "react";
import { useDispatch } from "react-redux";

import Weather from "../../models/Weather";

import { AppDispatch } from "../../store/index";
import { handleFavourites } from "../../store/weather-actions";

import classes from "./WeatherCard.module.css";

import favActive from "../../assets/favourite_active-icon.png";
import favInactive from "../../assets/favourite_inactive-icon.png";

type PropType = {
  weatherData: Weather;
  children?: ReactNode;
};

const WeatherCard = ({ weatherData }: PropType) => {
  const dispatch = useDispatch<AppDispatch>();

  const clickHandler = () => {
    dispatch(handleFavourites(weatherData.locationName, false));
  };

  return (
    <li className={classes["weather-card"]}>
      <div className={`${classes.left} ${classes.location}`}>
        {weatherData.locationName}
      </div>
      <div className={classes.middle}>
        <img
          className={classes.logo}
          src={weatherData.weatherIconLink}
          alt="weather icon"
        />
        <div className={classes.temperature}>
          <div className={classes["temperature-number"]}>
            {weatherData.temperature.toFixed(0)}
          </div>
          <div className={classes["temperature-unit"]}>°C</div>
        </div>
      </div>
      <div className={classes.right}>
        <div className={classes.description}>{weatherData.description}</div>
        <img
          onClick={clickHandler}
          src={weatherData.isFavourite ? favActive : favInactive}
          className={classes["favourite-icon"]}
          alt="favourite"
        />
      </div>
    </li>
  );
};

export default WeatherCard;
