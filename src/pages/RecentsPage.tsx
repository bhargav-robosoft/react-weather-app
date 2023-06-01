import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Weather from "../models/Weather";

import { RootState } from "../store/index";
import { weatherActions } from "../store/weather";

import { ConfirmModal } from "../components/UI/Modals";
import EmptySearch from "../components/FavouritesAndRecents/EmptySearch";
import WeatherCard from "../components/FavouritesAndRecents/WeatherCard";

import classes from "./RecentsAndFavourites.module.css";

const RecentsPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const recentsWeather = useSelector(
    (state: RootState) => state.weather.recentsWeather
  );
  const searchFilter = useSelector(
    (state: RootState) => state.weather.searchFilter
  );

  let filteredRecentsWeather: Weather[];

  if (searchFilter === "") {
    filteredRecentsWeather = recentsWeather;
  } else {
    filteredRecentsWeather = recentsWeather.filter((recent) =>
      recent.locationName.toLowerCase().startsWith(searchFilter.toLowerCase())
    );
  }

  const onClear = () => {
    setShowModal(true);
  };

  const confirmClearHandler = (confirm: boolean) => {
    if (confirm) {
      dispatch(weatherActions.clearRecents());
    }
    setShowModal(false);
  };

  return (
    <>
      {filteredRecentsWeather.length > 0 ? (
        <>
          {showModal && (
            <ConfirmModal
              title="Are you sure you want to remove all the recents?"
              confirmHandler={confirmClearHandler}
            />
          )}
          <div className={classes["remove-all-bar"]}>
            <div>You recently searched for</div>
            <div className={classes["remove-all"]} onClick={onClear}>
              Remove All
            </div>
          </div>
          <ul>
            {filteredRecentsWeather.map((recent) => (
              <WeatherCard key={recent.locationName} weatherData={recent} />
            ))}
          </ul>
        </>
      ) : (
        <EmptySearch message="No recent search" />
      )}
    </>
  );
};

export default RecentsPage;
