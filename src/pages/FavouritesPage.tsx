import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Weather from "../models/Weather";

import { RootState } from "../store/index";
import { weatherActions } from "../store/weather";

import { ConfirmModal } from "../components/UI/Modals";
import EmptySearch from "../components/FavouritesAndRecents/EmptySearch";
import WeatherCard from "../components/FavouritesAndRecents/WeatherCard";

import classes from "./RecentsAndFavourites.module.css";

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const favouritesWeather = useSelector(
    (state: RootState) => state.weather.favouritesWeather
  );
  const searchFilter = useSelector(
    (state: RootState) => state.weather.searchFilter
  );

  let filteredFavouritesWeather: Weather[];

  if (searchFilter === "") {
    filteredFavouritesWeather = favouritesWeather;
  } else {
    filteredFavouritesWeather = favouritesWeather.filter((favourite) =>
      favourite.locationName
        .toLowerCase()
        .startsWith(searchFilter.toLowerCase())
    );
  }

  const onClear = () => {
    setShowModal(true);
  };

  const confirmClearHandler = (confirm: boolean) => {
    if (confirm) {
      dispatch(weatherActions.clearFavourites());
    }
    setShowModal(false);
  };

  return (
    <>
      {filteredFavouritesWeather.length > 0 ? (
        <>
          {showModal && (
            <ConfirmModal
              title="Are you sure you want to remove all the favourites?"
              confirmHandler={confirmClearHandler}
            />
          )}
          <div className={classes["remove-all-bar"]}>
            <div>
              {favouritesWeather.length}{" "}
              {favouritesWeather.length === 1 ? "city" : "cities"} added as
              favourite
            </div>
            <div className={classes["remove-all"]} onClick={onClear}>
              Remove All
            </div>
          </div>
          <ul>
            {filteredFavouritesWeather.map((favourite) => (
              <WeatherCard
                key={favourite.locationName}
                weatherData={favourite}
              />
            ))}
          </ul>
        </>
      ) : (
        <EmptySearch message="No favourites added" />
      )}
    </>
  );
};

export default FavouritesPage;
