import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/index";
import { handleFavourites } from "../../store/weather-actions";

import classes from "./WeatherInfo.module.css";

import favActive from "../../assets/favourite_active-icon.png";
import favInactive from "../../assets/favourite_inactive-icon.png";
import { useState } from "react";

const WeatherInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const homeWeatherData = useSelector(
    (state: RootState) => state.weather.homeWeather
  );

  const [inCelcius, setInCelcius] = useState(true);

  const favouriteHandler = () => {
    dispatch(handleFavourites(homeWeatherData!.locationName, true));
  };

  return (
    <>
      <div>
        <div className={classes["location-name"]}>
          {homeWeatherData?.locationName},{" "}
          {homeWeatherData?.locationCountryName}
        </div>
        <div
          className={classes["favourite-control"]}
          onClick={favouriteHandler}
        >
          <img
            src={homeWeatherData?.isFavourite ? favActive : favInactive}
            alt="favourite"
          />
          <div className={classes["favourite-control-text"]}>
            {homeWeatherData?.isFavourite
              ? "Remove from favourites"
              : "Add to favourite"}
          </div>
        </div>
      </div>
      <div className={classes["weather-info"]}>
        <img src={homeWeatherData?.weatherIconLink} alt="weather_icon" />
        <div className={classes["weather-temperature"]}>
          <div className={classes["temperature-number"]}>
            {inCelcius
              ? homeWeatherData!.temperature
              : ((homeWeatherData!.temperature * 9) / 5 + 32).toFixed(2)}
          </div>
          <div className={classes["temperature-units"]}>
            <div
              className={`${classes["temperature-unit"]} ${
                inCelcius ? classes["temperature-unit-active"] : undefined
              }`}
              onClick={() => setInCelcius(true)}
            >
              °C
            </div>
            <div
              className={`${classes["temperature-unit"]} ${
                inCelcius ? undefined : classes["temperature-unit-active"]
              }`}
              onClick={() => setInCelcius(false)}
            >
              °F
            </div>
          </div>
        </div>
        <div className={classes["weather-description"]}>
          {homeWeatherData?.description}
        </div>
      </div>
    </>
  );
};

export default WeatherInfo;
