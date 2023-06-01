import { useSelector } from "react-redux";

import { RootState } from "../store";

import WeatherInfo from "../components/Home/WeatherInfo";
import WeatherParameters from "../components/Home/WeatherParameters";

const HomePage = () => {
  const homeWeather = useSelector(
    (state: RootState) => state.weather.homeWeather
  );

  if (homeWeather === null) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <WeatherInfo />
        <WeatherParameters />
      </>
    );
  }
};

export default HomePage;
