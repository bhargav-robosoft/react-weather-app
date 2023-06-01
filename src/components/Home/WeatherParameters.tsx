import { useSelector } from "react-redux";

import { RootState } from "../../store/index";

import classes from "./WeatherParameters.module.css";
import WeatherParameter from "./WeatherParameter";

import temperature from "../../assets/weather_parameter/temperature.png";
import precipitation from "../../assets/weather_parameter/precipitation.png";
import humidity from "../../assets/weather_parameter/humidity.png";
import wind from "../../assets/weather_parameter/wind.png";
import visibility from "../../assets/weather_parameter/visibility.png";

const WeatherParameters = () => {
  const homeWeatherData = useSelector(
    (state: RootState) => state.weather.homeWeather
  );

  return (
    <div className={classes.parameters}>
      <WeatherParameter
        title="Min - Max"
        value={
          homeWeatherData!.minTemperature.toFixed(0) +
          "° - " +
          homeWeatherData!.maxTemperature.toFixed(0) +
          "°"
        }
        imagePath={temperature}
      />
      <WeatherParameter
        title="Cloud"
        value={homeWeatherData!.clouds + "%"}
        imagePath={precipitation}
      />
      <WeatherParameter
        title="Humidity"
        value={homeWeatherData!.humidity + "%"}
        imagePath={humidity}
      />
      <WeatherParameter
        title="Wind Speed"
        value={homeWeatherData!.windSpeed + " mph"}
        imagePath={wind}
      />
      <WeatherParameter
        title="Visibility"
        value={homeWeatherData!.visibility + " mph"}
        imagePath={visibility}
      />
    </div>
  );
};

export default WeatherParameters;
